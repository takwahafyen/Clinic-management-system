const rateLimit = require("express-rate-limit");

/**
 * Rate limiter for sensitive authentication endpoints (login, registration).
 * Protects against credential stuffing, brute-force password guessing, and automated scrapers.
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === "test" ? 1000 : 10, // Max 10 attempts per IP per 15 mins (relaxed in tests)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skipSuccessfulRequests: false,
  message: {
    success: false,
    status: 429,
    message: "Too many login/registration attempts from this IP address. Please try again after 15 minutes.",
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json(options.message);
  },
});

/**
 * General rate limiter for standard API endpoints.
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === "test" ? 5000 : 200, // Max 200 requests per 15 mins per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    status: 429,
    message: "Too many requests from this IP address. Please slow down.",
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json(options.message);
  },
});

module.exports = {
  authLimiter,
  apiLimiter,
};
