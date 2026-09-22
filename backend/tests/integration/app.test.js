const request = require("supertest");
const app = require("../../app");

describe("app", () => {
  it("responds 404 on an unknown route", async () => {
    const res = await request(app).get("/this-route-does-not-exist");

    expect(res.status).toBe(404);
  });

  it("responds 200 on /health", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
