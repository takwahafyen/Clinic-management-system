import Reducer from "./Reducer";

const initialState = { doctor: null, isFetching: false, error: false };

describe("Reducer", () => {
  it("handles LOGIN_START", () => {
    const state = Reducer(initialState, { type: "LOGIN_START" });
    expect(state).toEqual({ doctor: null, isFetching: true, error: false });
  });

  it("handles LOGIN_SUCCESS", () => {
    const doctor = { _id: "1", firstName: "Ada" };
    const state = Reducer(initialState, {
      type: "LOGIN_SUCCESS",
      payload: doctor,
    });
    expect(state).toEqual({ doctor, isFetching: false, error: false });
  });

  it("handles LOGIN_FAILURE", () => {
    const state = Reducer(
      { doctor: null, isFetching: true, error: false },
      { type: "LOGIN_FAILURE" }
    );
    expect(state).toEqual({ doctor: null, isFetching: false, error: true });
  });

  it("handles LOGOUT", () => {
    const loggedInState = {
      doctor: { _id: "1" },
      isFetching: false,
      error: false,
    };
    const state = Reducer(loggedInState, { type: "LOGOUT" });
    expect(state).toEqual({ doctor: null, isFetching: false, error: false });
  });

  it("returns the same state for an unknown action", () => {
    const state = Reducer(initialState, { type: "UNKNOWN" });
    expect(state).toBe(initialState);
  });
});
