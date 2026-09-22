const jwt = require("jsonwebtoken");
const { verifyToken, verifyRole } = require("../../middlewares/verifyToken");

const JWT_SECRET = "test-secret";

beforeAll(() => {
  process.env.JWT_SECRET = JWT_SECRET;
});

const mockRes = () => ({});

describe("verifyToken", () => {
  it("calls next with a 401 error when there is no token", () => {
    const req = { cookies: {} };
    const next = jest.fn();

    verifyToken(req, mockRes(), next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ status: 401 })
    );
  });

  it("calls next with a 403 error when the token is invalid", () => {
    const req = { cookies: { token: "not-a-real-token" } };
    const next = jest.fn();

    verifyToken(req, mockRes(), next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ status: 403 })
    );
  });

  it("attaches userId/userRole and calls next() when the token is valid", () => {
    const token = jwt.sign({ id: "abc123", role: "doctor" }, JWT_SECRET);
    const req = { cookies: { token } };
    const next = jest.fn();

    verifyToken(req, mockRes(), next);

    expect(next).toHaveBeenCalledWith();
    expect(req.userId).toBe("abc123");
    expect(req.userRole).toBe("doctor");
  });
});

describe("verifyRole", () => {
  it("calls next with a 403 error when the role is not allowed", () => {
    const req = { userRole: "nurse" };
    const next = jest.fn();

    verifyRole("doctor")(req, mockRes(), next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ status: 403 })
    );
  });

  it("calls next() when the role is allowed", () => {
    const req = { userRole: "doctor" };
    const next = jest.fn();

    verifyRole("doctor", "nurse")(req, mockRes(), next);

    expect(next).toHaveBeenCalledWith();
  });
});
