const request = require("supertest");
const app = require("../../app");

describe("app", () => {
  it("responds 404 on an unknown route", async () => {
    const res = await request(app).get("/this-route-does-not-exist");

    expect(res.status).toBe(404);
  });

  // Routes that hit MongoDB (register/login/...) need a test database
  // (e.g. mongodb-memory-server) before they can be exercised here.
});
