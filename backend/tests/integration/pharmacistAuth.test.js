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

const pharmacistPayload = {
  firstName: "Marie",
  lastName: "Curie",
  email: "marie@example.com",
  password: "password123",
  specialization: "Clinical Pharmacy",
  phone: "0800000000",
  passcode: process.env.PASSCODE,
};

describe("POST /pharmacist/register", () => {
  it("registers a pharmacist with the correct passcode without exposing password or passcode", async () => {
    const res = await request(app)
      .post("/pharmacist/register")
      .send(pharmacistPayload);

    expect(res.status).toBe(201);
    expect(res.body.email).toBe(pharmacistPayload.email);
    expect(res.body.password).toBeUndefined();
    expect(res.body.passcode).toBeUndefined();
  });

  it("rejects registration with an incorrect passcode", async () => {
    const res = await request(app)
      .post("/pharmacist/register")
      .send({ ...pharmacistPayload, passcode: "wrong" });

    expect(res.status).toBe(401);
  });
});

describe("POST /pharmacist/login", () => {
  beforeEach(async () => {
    await request(app).post("/pharmacist/register").send(pharmacistPayload);
  });

  it("logs in with correct credentials and sets a token cookie", async () => {
    const res = await request(app).post("/pharmacist/login").send({
      email: pharmacistPayload.email,
      password: pharmacistPayload.password,
    });

    expect(res.status).toBe(200);
    expect(res.body.password).toBeUndefined();
    expect(res.body.passcode).toBeUndefined();
    expect(res.headers["set-cookie"][0]).toMatch(/^token=/);
  });

  it("rejects an incorrect password", async () => {
    const res = await request(app).post("/pharmacist/login").send({
      email: pharmacistPayload.email,
      password: "wrong-password",
    });

    expect(res.status).toBe(400);
  });

  it("rejects an unregistered email", async () => {
    const res = await request(app).post("/pharmacist/login").send({
      email: "unknown@example.com",
      password: pharmacistPayload.password,
    });

    expect(res.status).toBe(404);
  });
});

describe("POST /pharmacist/logout", () => {
  it("clears the auth cookie on logout", async () => {
    const res = await request(app).post("/pharmacist/logout");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.headers["set-cookie"][0]).toMatch(/^token=;/);
  });
});

describe("PUT /pharmacist/update/:id", () => {
  const login = async () => {
    await request(app).post("/pharmacist/register").send(pharmacistPayload);
    const loginRes = await request(app).post("/pharmacist/login").send({
      email: pharmacistPayload.email,
      password: pharmacistPayload.password,
    });
    const cookie = loginRes.headers["set-cookie"][0];
    return { cookie, pharmacistId: loginRes.body._id };
  };

  it("rejects the update when there is no auth cookie", async () => {
    const { pharmacistId } = await login();

    const res = await request(app)
      .put(`/pharmacist/update/${pharmacistId}`)
      .send({ phone: "0811111111" });

    expect(res.status).toBe(401);
  });

  it("allows a pharmacist to update their own account without leaking password", async () => {
    const { cookie, pharmacistId } = await login();

    const res = await request(app)
      .put(`/pharmacist/update/${pharmacistId}`)
      .set("Cookie", cookie)
      .send({ phone: "0811111111" });

    expect(res.status).toBe(200);
    expect(res.body.phone).toBe("0811111111");
    expect(res.body.password).toBeUndefined();
  });

  it("rejects updating a different pharmacist's account (IDOR)", async () => {
    const { cookie: pharmacistACookie } = await login();

    const pharmacistBRes = await request(app)
      .post("/pharmacist/register")
      .send({
        ...pharmacistPayload,
        email: "rosalind@example.com",
        phone: "0822222222",
      });
    const pharmacistBId = pharmacistBRes.body._id;

    const res = await request(app)
      .put(`/pharmacist/update/${pharmacistBId}`)
      .set("Cookie", pharmacistACookie) // pharmacist A's token, targeting pharmacist B's id
      .send({ phone: "0899999999" });

    expect(res.status).toBe(403);
  });
});
