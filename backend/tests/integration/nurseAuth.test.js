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

const nursePayload = {
  firstName: "Florence",
  lastName: "Nightingale",
  email: "florence@example.com",
  password: "password123",
  specialization: "Critical Care",
  phone: "0700000000",
  passcode: process.env.PASSCODE,
};

describe("POST /nurse/register", () => {
  it("registers a nurse with the correct passcode without exposing password or passcode", async () => {
    const res = await request(app).post("/nurse/register").send(nursePayload);

    expect(res.status).toBe(201);
    expect(res.body.email).toBe(nursePayload.email);
    expect(res.body.password).toBeUndefined();
    expect(res.body.passcode).toBeUndefined();
  });

  it("rejects registration with an incorrect passcode", async () => {
    const res = await request(app)
      .post("/nurse/register")
      .send({ ...nursePayload, passcode: "wrong" });

    expect(res.status).toBe(401);
  });
});

describe("POST /nurse/login", () => {
  beforeEach(async () => {
    await request(app).post("/nurse/register").send(nursePayload);
  });

  it("logs in with correct credentials and sets a token cookie", async () => {
    const res = await request(app).post("/nurse/login").send({
      email: nursePayload.email,
      password: nursePayload.password,
    });

    expect(res.status).toBe(200);
    expect(res.body.password).toBeUndefined();
    expect(res.body.passcode).toBeUndefined();
    expect(res.headers["set-cookie"][0]).toMatch(/^token=/);
  });

  it("rejects an incorrect password", async () => {
    const res = await request(app).post("/nurse/login").send({
      email: nursePayload.email,
      password: "wrong-password",
    });

    expect(res.status).toBe(400);
  });

  it("rejects an unregistered email", async () => {
    const res = await request(app).post("/nurse/login").send({
      email: "unknown@example.com",
      password: nursePayload.password,
    });

    expect(res.status).toBe(404);
  });
});

describe("POST /nurse/logout", () => {
  it("clears the auth cookie on logout", async () => {
    const res = await request(app).post("/nurse/logout");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.headers["set-cookie"][0]).toMatch(/^token=;/);
  });
});

describe("PUT /nurse/update/:id", () => {
  const login = async () => {
    await request(app).post("/nurse/register").send(nursePayload);
    const loginRes = await request(app).post("/nurse/login").send({
      email: nursePayload.email,
      password: nursePayload.password,
    });
    const cookie = loginRes.headers["set-cookie"][0];
    return { cookie, nurseId: loginRes.body._id };
  };

  it("rejects the update when there is no auth cookie", async () => {
    const { nurseId } = await login();

    const res = await request(app)
      .put(`/nurse/update/${nurseId}`)
      .send({ phone: "0711111111" });

    expect(res.status).toBe(401);
  });

  it("allows a nurse to update their own account without leaking password", async () => {
    const { cookie, nurseId } = await login();

    const res = await request(app)
      .put(`/nurse/update/${nurseId}`)
      .set("Cookie", cookie)
      .send({ phone: "0711111111" });

    expect(res.status).toBe(200);
    expect(res.body.phone).toBe("0711111111");
    expect(res.body.password).toBeUndefined();
  });

  it("rejects updating a different nurse's account (IDOR)", async () => {
    const { cookie: nurseACookie } = await login();

    const nurseBRes = await request(app).post("/nurse/register").send({
      ...nursePayload,
      email: "virginia@example.com",
      phone: "0722222222",
    });
    const nurseBId = nurseBRes.body._id;

    const res = await request(app)
      .put(`/nurse/update/${nurseBId}`)
      .set("Cookie", nurseACookie) // nurse A's token, targeting nurse B's id
      .send({ phone: "0799999999" });

    expect(res.status).toBe(403);
  });
});
