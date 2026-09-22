const { createError } = require("../../utils/error");

describe("createError", () => {
  it("builds an Error with the given status and message", () => {
    const err = createError(404, "Not found");

    expect(err).toBeInstanceOf(Error);
    expect(err.status).toBe(404);
    expect(err.message).toBe("Not found");
  });
});
