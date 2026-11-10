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

  it("includes security headers from helmet", async () => {
    const res = await request(app).get("/health");

    expect(res.headers).toHaveProperty("x-content-type-options", "nosniff");
    expect(res.headers).toHaveProperty("x-frame-options");
  });

  it("handles CORS headers correctly for valid origins and strips trailing slashes", async () => {
    const res = await request(app)
      .get("/health")
      .set("Origin", "https://clinic-management-system-um8a-rose.vercel.app");

    expect(res.status).toBe(200);
    expect(res.headers["access-control-allow-origin"]).toBe(
      "https://clinic-management-system-um8a-rose.vercel.app"
    );
    expect(res.headers["access-control-allow-credentials"]).toBe("true");
  });
});
