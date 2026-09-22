const request = require("supertest");
const { connect, closeDatabase, clearDatabase } = require("./dbSetup");

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

const doctorPayload = {
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.com",
  password: "password123",
  specialization: "Cardiology",
  phone: "0600000000",
  passcode: process.env.PASSCODE,
};

describe("POST /doctor/register", () => {
  it("registers a doctor with the correct passcode", async () => {
    const res = await request(app).post("/doctor/register").send(doctorPayload);

    expect(res.status).toBe(201);
    expect(res.body.email).toBe(doctorPayload.email);
    expect(res.body.password).not.toBe(doctorPayload.password); // hashed
  });

  it("rejects registration with an incorrect passcode", async () => {
    const res = await request(app)
      .post("/doctor/register")
      .send({ ...doctorPayload, passcode: "wrong" });

    expect(res.status).toBe(401);
  });
});

describe("POST /doctor/login", () => {
  beforeEach(async () => {
    await request(app).post("/doctor/register").send(doctorPayload);
  });

  it("logs in with correct credentials and sets a token cookie", async () => {
    const res = await request(app).post("/doctor/login").send({
      email: doctorPayload.email,
      password: doctorPayload.password,
    });

    expect(res.status).toBe(200);
    expect(res.body.password).toBeUndefined();
    expect(res.headers["set-cookie"][0]).toMatch(/^token=/);
  });

  it("rejects an incorrect password", async () => {
    const res = await request(app).post("/doctor/login").send({
      email: doctorPayload.email,
      password: "wrong-password",
    });

    expect(res.status).toBe(400);
  });

  it("rejects an unregistered email", async () => {
    const res = await request(app).post("/doctor/login").send({
      email: "unknown@example.com",
      password: doctorPayload.password,
    });

    expect(res.status).toBe(404);
  });
});

describe("PUT /doctor/update/:id", () => {
  const login = async () => {
    await request(app).post("/doctor/register").send(doctorPayload);
    const loginRes = await request(app).post("/doctor/login").send({
      email: doctorPayload.email,
      password: doctorPayload.password,
    });
    const cookie = loginRes.headers["set-cookie"][0];
    return { cookie, doctorId: loginRes.body._id };
  };

  it("rejects the update when there is no auth cookie", async () => {
    const { doctorId } = await login();

    const res = await request(app)
      .put(`/doctor/update/${doctorId}`)
      .send({ phone: "0611111111" });

    expect(res.status).toBe(401);
  });

  it("allows a doctor to update their own account", async () => {
    const { cookie, doctorId } = await login();

    const res = await request(app)
      .put(`/doctor/update/${doctorId}`)
      .set("Cookie", cookie)
      .send({ phone: "0611111111" });

    expect(res.status).toBe(200);
    expect(res.body.phone).toBe("0611111111");
  });
});
