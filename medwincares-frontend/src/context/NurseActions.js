export const n_LoginStart = (nurseCredentials) => ({
  type: "n_LOGIN_START",
});

export const n_LoginSuccess = (nurse) => ({
  type: "n_LOGIN_SUCCESS",
  payload: nurse,
});

export const n_LoginFailure = () => ({
  type: "n_LOGIN_FAILURE",
});

export const n_Logout = () => ({
  type: "LOGOUT",
});
