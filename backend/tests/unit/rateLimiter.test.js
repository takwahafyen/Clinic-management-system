const request = require("supertest");
const express = require("express");
const rateLimit = require("express-rate-limit");

describe("Rate Limiter Middleware", () => {
  let testApp;

  beforeEach(() => {
    testApp = express();
    testApp.use(express.json());

    // Create a strict test limiter: 3 requests max per window
    const testLimiter = rateLimit({
      windowMs: 60 * 1000,
      max: 3,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        success: false,
        status: 429,
        message: "Too many attempts from this IP address.",
      },
    });

    testApp.post("/test-login", testLimiter, (req, res) => {
      res.status(200).json({ success: true, message: "Login endpoint reached" });
    });
  });

  it("allows requests under the rate limit and includes standard rate limit headers", async () => {
    const res = await request(testApp).post("/test-login").send({});

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.headers).toHaveProperty("ratelimit-limit");
    expect(res.headers).toHaveProperty("ratelimit-remaining");
  });

  it("blocks requests with HTTP 429 once the rate limit threshold is exceeded", async () => {
    // Fire 3 allowed requests
    await request(testApp).post("/test-login").send({});
    await request(testApp).post("/test-login").send({});
    await request(testApp).post("/test-login").send({});

    // 4th request must be throttled
    const blockedRes = await request(testApp).post("/test-login").send({});

    expect(blockedRes.status).toBe(429);
    expect(blockedRes.body.success).toBe(false);
    expect(blockedRes.body.status).toBe(429);
    expect(blockedRes.body.message).toContain("Too many attempts");
  });
});
