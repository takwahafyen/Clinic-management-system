const request = require("supertest");
const jwt = require("jsonwebtoken");
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

describe("Protected Routes Security", () => {
  const createCookie = (role) => {
    const token = jwt.sign({ id: "user123", role }, process.env.JWT_SECRET);
    return `token=${token}`;
  };

  describe("Unauthenticated requests", () => {
    it("rejects GET /patients/allReports with 401", async () => {
      const res = await request(app).get("/patients/allReports");
      expect(res.status).toBe(401);
    });

    it("rejects GET /patientauth with 401", async () => {
      const res = await request(app).get("/patientauth");
      expect(res.status).toBe(401);
    });

    it("rejects GET /patients/allVS with 401", async () => {
      const res = await request(app).get("/patients/allVS");
      expect(res.status).toBe(401);
    });

    it("rejects GET /clientauth with 401", async () => {
      const res = await request(app).get("/clientauth");
      expect(res.status).toBe(401);
    });

    it("rejects GET /client/allFC with 401", async () => {
      const res = await request(app).get("/client/allFC");
      expect(res.status).toBe(401);
    });
  });

  describe("Role-based authorization", () => {
    it("allows doctor to access reports, rejects nurse with 403", async () => {
      const doctorCookie = createCookie("doctor");
      const nurseCookie = createCookie("nurse");

      const docRes = await request(app)
        .get("/patients/allReports")
        .set("Cookie", doctorCookie);
      expect(docRes.status).toBe(200);

      const nurseRes = await request(app)
        .get("/patients/allReports")
        .set("Cookie", nurseCookie);
      expect(nurseRes.status).toBe(403);
    });

    it("allows pharmacist to access client records, rejects doctor with 403", async () => {
      const pharmacistCookie = createCookie("pharmacist");
      const doctorCookie = createCookie("doctor");

      const pharmaRes = await request(app)
        .get("/clientauth")
        .set("Cookie", pharmacistCookie);
      expect(pharmaRes.status).toBe(200);

      const docRes = await request(app)
        .get("/clientauth")
        .set("Cookie", doctorCookie);
      expect(docRes.status).toBe(403);
    });
  });
});
