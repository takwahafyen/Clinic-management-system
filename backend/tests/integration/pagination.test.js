const request = require("supertest");
const jwt = require("jsonwebtoken");
const { connect, closeDatabase, clearDatabase } = require("./dbSetup");
const Patient = require("../../models/Patient");
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

describe("Pagination Feature on List Endpoints", () => {
  const doctorToken = `token=${jwt.sign(
    { id: "doc1", role: "doctor" },
    process.env.JWT_SECRET
  )}`;

  let patient;

  beforeEach(async () => {
    patient = await Patient.create({
      firstName: "Test",
      lastName: "Patient",
      phoneNo: "0600112233",
    });

    // Seed 5 reports
    for (let i = 1; i <= 5; i++) {
      await Report.create({
        patient: patient._id,
        phoneNum: patient.phoneNo,
        doctor: "Dr. House",
        status: i % 2 === 0 ? "Urgent" : "Stable",
        medicament: `Medicine ${i}`,
        firstName: "Test",
        lastName: "Patient",
      });
    }
  });

  it("returns an array and sets standard pagination headers when no query parameters are passed", async () => {
    const res = await request(app)
      .get("/patients/allReports")
      .set("Cookie", doctorToken);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(5);
    expect(res.headers).toHaveProperty("x-total-count", "5");
    expect(res.headers).toHaveProperty("x-page", "1");
    expect(res.headers).toHaveProperty("x-total-pages", "1");
  });

  it("returns structured pagination metadata when ?page= and ?limit= are passed", async () => {
    const res = await request(app)
      .get("/patients/allReports?page=1&limit=2")
      .set("Cookie", doctorToken);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("pagination");
    expect(res.body.data).toHaveLength(2);
    expect(res.body.pagination).toEqual({
      total: 5,
      page: 1,
      limit: 2,
      totalPages: 3,
      hasNextPage: true,
      hasPrevPage: false,
    });
  });

  it("navigates to page 2 correctly with proper hasPrevPage and hasNextPage flags", async () => {
    const res = await request(app)
      .get("/patients/allReports?page=2&limit=2")
      .set("Cookie", doctorToken);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.pagination).toEqual({
      total: 5,
      page: 2,
      limit: 2,
      totalPages: 3,
      hasNextPage: true,
      hasPrevPage: true,
    });
  });

  it("supports pagination on patient-specific report query (/patients/:phone/all_reports)", async () => {
    const res = await request(app)
      .get(`/patients/${patient.phoneNo}/all_reports?page=1&limit=3`)
      .set("Cookie", doctorToken);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(3);
    expect(res.body.pagination.total).toBe(5);
    expect(res.body.pagination.totalPages).toBe(2);
  });
});
