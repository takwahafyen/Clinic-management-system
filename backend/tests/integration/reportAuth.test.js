const request = require("supertest");
const { connect, closeDatabase, clearDatabase } = require("./dbSetup");
const Patient = require("../../models/Patient");

process.env.JWT_SECRET = "test-secret";
process.env.PASSCODE = "test-passcode";

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

const registerAndLogin = async (role) => {
  const payload = {
    firstName: "Ada",
    lastName: "Lovelace",
    email: `${role}@example.com`,
    password: "password123",
    specialization: "General",
    phone: `060000000${role.length}`,
    passcode: process.env.PASSCODE,
  };
  await request(app).post(`/${role}/register`).send(payload);
  const loginRes = await request(app)
    .post(`/${role}/login`)
    .send({ email: payload.email, password: payload.password });
  return loginRes.headers["set-cookie"][0];
};

const reportPayload = (phoneNum) => ({
  firstName: "Bob",
  lastName: "Patient",
  age: 40,
  dob: "1985-01-01",
  sex: "Male",
  medicament: "Paracetamol",
  doctor: "Dr. Ada",
  status: "Stable",
  phoneNum,
});

describe("POST /patients/:id/create_report", () => {
  it("rejects the request when there is no auth cookie", async () => {
    const patient = await Patient.create({
      firstName: "Bob",
      phoneNo: "0700000001",
    });

    const res = await request(app)
      .post(`/patients/${patient._id}/create_report`)
      .send(reportPayload(patient.phoneNo));

    expect(res.status).toBe(401);
  });

  it("rejects a nurse token (wrong role)", async () => {
    const patient = await Patient.create({
      firstName: "Bob",
      phoneNo: "0700000002",
    });
    const nurseCookie = await registerAndLogin("nurse");

    const res = await request(app)
      .post(`/patients/${patient._id}/create_report`)
      .set("Cookie", nurseCookie)
      .send(reportPayload(patient.phoneNo));

    expect(res.status).toBe(403);
  });

  it("allows a doctor token to create the report", async () => {
    const patient = await Patient.create({
      firstName: "Bob",
      phoneNo: "0700000003",
    });
    const doctorCookie = await registerAndLogin("doctor");

    const res = await request(app)
      .post(`/patients/${patient._id}/create_report`)
      .set("Cookie", doctorCookie)
      .send(reportPayload(patient.phoneNo));

    expect(res.status).toBe(201);
    expect(res.body.phoneNum).toBe(patient.phoneNo);
  });
});
