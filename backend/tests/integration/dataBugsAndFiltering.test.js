const request = require("supertest");
const jwt = require("jsonwebtoken");
const { connect, closeDatabase, clearDatabase } = require("./dbSetup");
const Patient = require("../../models/Patient");
const Client = require("../../models/Client");
const VS = require("../../models/VS");
const FC = require("../../models/FC");
const Report = require("../../models/Report");

process.env.JWT_SECRET = "test-secret";

const app = require("../../app");

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe("Level 2 Bug Fixes - Data Integrity, Filtering & Null Checks", () => {
  const doctorToken = `token=${jwt.sign({ id: "doc1", role: "doctor" }, process.env.JWT_SECRET)}`;
  const nurseToken = `token=${jwt.sign({ id: "nurse1", role: "nurse" }, process.env.JWT_SECRET)}`;
  const pharmacistToken = `token=${jwt.sign({ id: "pharm1", role: "pharmacist" }, process.env.JWT_SECRET)}`;

  describe("Null Dereference Fixes", () => {
    it("returns 404 when querying reports for a non-existent phone number", async () => {
      const res = await request(app)
        .get("/patients/0999999999/all_reports")
        .set("Cookie", doctorToken);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/Patient doesn't exist/i);
    });

    it("returns 404 when querying vital signs for a non-existent phone number", async () => {
      const res = await request(app)
        .get("/patients/0999999999/all_VS")
        .set("Cookie", nurseToken);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/Patient doesn't exist/i);
    });

    it("returns 404 when querying FC records for a non-existent phone number", async () => {
      const res = await request(app)
        .get("/client/0999999999/all_FC")
        .set("Cookie", pharmacistToken);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/Client doesn't exist/i);
    });
  });

  describe("Route Handler Filtering Fixes (All VS / All FC parameter bugs)", () => {
    it("filters vital signs strictly by the patient's phone number", async () => {
      const patientA = await Patient.create({
        firstName: "Alice",
        lastName: "Smith",
        phoneNo: "0611111111",
      });
      const patientB = await Patient.create({
        firstName: "Bob",
        lastName: "Jones",
        phoneNo: "0622222222",
      });

      await VS.create({
        firstName: "Alice",
        age: 30,
        dob: new Date("1993-01-01"),
        sex: "Female",
        blood_pressure: "120/80",
        doctor: "Dr. House",
        Diabetic_status: "No",
        phoneNum: patientA.phoneNo,
      });

      await VS.create({
        firstName: "Bob",
        age: 45,
        dob: new Date("1978-01-01"),
        sex: "Male",
        blood_pressure: "140/90",
        doctor: "Dr. House",
        Diabetic_status: "Yes",
        phoneNum: patientB.phoneNo,
      });

      const res = await request(app)
        .get(`/patients/${patientA.phoneNo}/all_VS`)
        .set("Cookie", nurseToken);

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].phoneNum).toBe(patientA.phoneNo);
      expect(res.body[0].firstName).toBe("Alice");
    });

    it("filters pharmacy records strictly by the client's phone number", async () => {
      const clientA = await Client.create({
        firstName: "Clara",
        lastName: "Oswald",
        phoneNo: "0633333333",
      });
      const clientB = await Client.create({
        firstName: "David",
        lastName: "Tennant",
        phoneNo: "0644444444",
      });

      await FC.create({
        firstName: "Clara",
        age: 28,
        dob: new Date("1995-01-01"),
        sex: "Female",
        quantite: 2,
        doctor: "Dr. Who",
        medicament: "Paracetamol",
        phoneNum: clientA.phoneNo,
      });

      await FC.create({
        firstName: "David",
        age: 50,
        dob: new Date("1973-01-01"),
        sex: "Male",
        quantite: 1,
        doctor: "Dr. Who",
        medicament: "Ibuprofen",
        phoneNum: clientB.phoneNo,
      });

      const res = await request(app)
        .get(`/client/${clientA.phoneNo}/all_FC`)
        .set("Cookie", pharmacistToken);

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].phoneNum).toBe(clientA.phoneNo);
      expect(res.body[0].firstName).toBe("Clara");
    });
  });

  describe("Patient & Client Update Fixes", () => {
    it("returns 409 Conflict when updating patient to an already existing phone number", async () => {
      const patientA = await Patient.create({
        firstName: "Alice",
        phoneNo: "0600000001",
      });
      await Patient.create({
        firstName: "Bob",
        phoneNo: "0600000002",
      });

      const res = await request(app)
        .put(`/patientauth/update/${patientA._id}`)
        .set("Cookie", doctorToken)
        .send({ phoneNo: "0600000002" });

      expect(res.status).toBe(409);
      expect(res.body.message).toMatch(/already registered/i);
    });

    it("prevents mass assignment during patient update", async () => {
      const patient = await Patient.create({
        firstName: "Alice",
        phoneNo: "0600000001",
      });

      const res = await request(app)
        .put(`/patientauth/update/${patient._id}`)
        .set("Cookie", doctorToken)
        .send({
          firstName: "Alicia",
          isAdmin: true,
          role: "admin",
          customField: "malicious",
        });

      expect(res.status).toBe(200);
      expect(res.body.firstName).toBe("Alicia");
      expect(res.body.isAdmin).toBeUndefined();
      expect(res.body.role).toBeUndefined();
      expect(res.body.customField).toBeUndefined();
    });

    it("cascades phone update to child VS and Report records", async () => {
      const patient = await Patient.create({
        firstName: "Alice",
        phoneNo: "0600000001",
      });

      await Report.create({
        firstName: "Alice",
        age: 30,
        dob: new Date("1993-01-01"),
        sex: "Female",
        medicament: "Aspirin",
        doctor: "Dr. House",
        status: "Stable",
        phoneNum: "0600000001",
      });

      await VS.create({
        firstName: "Alice",
        age: 30,
        dob: new Date("1993-01-01"),
        sex: "Female",
        blood_pressure: "120/80",
        doctor: "Dr. House",
        Diabetic_status: "No",
        phoneNum: "0600000001",
      });

      const res = await request(app)
        .put(`/patientauth/update/${patient._id}`)
        .set("Cookie", doctorToken)
        .send({ phoneNo: "0699999999" });

      expect(res.status).toBe(200);
      expect(res.body.phoneNo).toBe("0699999999");

      const updatedReport = await Report.findOne({ phoneNum: "0699999999" });
      const updatedVS = await VS.findOne({ phoneNum: "0699999999" });
      expect(updatedReport).not.toBeNull();
      expect(updatedVS).not.toBeNull();
    });
  });
});
