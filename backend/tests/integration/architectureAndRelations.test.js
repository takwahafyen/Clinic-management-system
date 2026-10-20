const request = require("supertest");
const jwt = require("jsonwebtoken");
const { connect, closeDatabase, clearDatabase } = require("./dbSetup");
const User = require("../../models/User");
const Doctor = require("../../models/Doctor");
const Nurse = require("../../models/Nurse");
const Patient = require("../../models/Patient");
const Client = require("../../models/Client");
const Report = require("../../models/Report");
const VS = require("../../models/VS");

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

describe("Level 3 Architectural & Relational Integrity Tests", () => {
  describe("Unified User Model & Single-Table Inheritance", () => {
    it("stores Doctor and Nurse in the unified users collection with distinct roles", async () => {
      const doctor = await Doctor.create({
        firstName: "Gregory",
        lastName: "House",
        email: "house@example.com",
        password: "password123",
        specialization: "Diagnostics",
        phone: "0600000001",
      });

      const nurse = await Nurse.create({
        firstName: "Jackie",
        lastName: "Peyton",
        email: "jackie@example.com",
        password: "password123",
        specialization: "ER",
        phone: "0600000002",
      });

      // Both should be in the unified User collection
      const allUsers = await User.find();
      expect(allUsers).toHaveLength(2);

      // Model queries strictly respect discriminator roles
      const doctorsOnly = await Doctor.find();
      expect(doctorsOnly).toHaveLength(1);
      expect(doctorsOnly[0].email).toBe("house@example.com");
      expect(doctorsOnly[0].role).toBe("doctor");

      const nursesOnly = await Nurse.find();
      expect(nursesOnly).toHaveLength(1);
      expect(nursesOnly[0].email).toBe("jackie@example.com");
      expect(nursesOnly[0].role).toBe("nurse");
    });

    it("enforces email uniqueness globally across all staff roles", async () => {
      await Doctor.create({
        firstName: "Gregory",
        lastName: "House",
        email: "shared@example.com",
        password: "password123",
        specialization: "Diagnostics",
        phone: "0600000001",
      });

      await expect(
        Nurse.create({
          firstName: "Jackie",
          lastName: "Peyton",
          email: "shared@example.com", // duplicate email
          password: "password123",
          specialization: "ER",
          phone: "0600000002",
        })
      ).rejects.toThrow();
    });
  });

  describe("Unified Patient & Client Domain Model", () => {
    it("shares a single source of truth between Doctor/Nurse Patient and Pharmacist Client", async () => {
      const patient = await Patient.create({
        firstName: "Sarah",
        lastName: "Connor",
        phoneNo: "0612345678",
        dob: new Date("1990-05-15"),
        sex: "Female",
      });

      // Client is unified with Patient
      const clientLookup = await Client.findOne({ phoneNo: "0612345678" });
      expect(clientLookup).not.toBeNull();
      expect(clientLookup._id.toString()).toBe(patient._id.toString());
      expect(clientLookup.firstName).toBe("Sarah");
    });

    it("computes age dynamically via virtual without static database persistence", async () => {
      const birthYear = new Date().getFullYear() - 25;
      const patient = await Patient.create({
        firstName: "Kyle",
        lastName: "Reese",
        phoneNo: "0699887766",
        dob: new Date(`${birthYear}-01-01`),
      });

      expect(patient.age).toBe(25);
      const json = patient.toJSON();
      expect(json.age).toBe(25);
    });
  });

  describe("Relational Foreign Keys (ObjectId Linking)", () => {
    it("links Report to Patient and Doctor via ObjectId references and populates them", async () => {
      const doctor = await Doctor.create({
        firstName: "Leonard",
        lastName: "McCoy",
        email: "mccoy@example.com",
        password: "password123",
        specialization: "General",
        phone: "0655555555",
      });

      const patient = await Patient.create({
        firstName: "James",
        lastName: "Kirk",
        phoneNo: "0677777777",
        dob: new Date("1980-03-22"),
      });

      const doctorCookie = `token=${jwt.sign(
        { id: doctor._id, role: "doctor" },
        process.env.JWT_SECRET
      )}`;

      const res = await request(app)
        .post(`/patients/${patient._id}/create_report`)
        .set("Cookie", doctorCookie)
        .send({
          firstName: "James",
          lastName: "Kirk",
          phoneNum: "0677777777",
          doctor: "Dr. McCoy",
          medicament: "Tricorder",
          status: "Stable",
        });

      expect(res.status).toBe(201);
      expect(res.body.patient).toBe(patient._id.toString());
      expect(res.body.doctorId).toBe(doctor._id.toString());

      // Test population on GET
      const listRes = await request(app)
        .get("/patients/allReports")
        .set("Cookie", doctorCookie);

      expect(listRes.status).toBe(200);
      expect(listRes.body[0].patient._id).toBe(patient._id.toString());
      expect(listRes.body[0].doctorId._id).toBe(doctor._id.toString());
      expect(listRes.body[0].doctorId.specialization).toBe("General");
    });
  });
});
