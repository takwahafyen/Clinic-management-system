import { NurseAction } from "./NurseReducer";

export const n_LoginStart = (_nurseCredentials: unknown): NurseAction => ({
  type: "n_LOGIN_START",
});

export const n_LoginSuccess = (nurse: unknown): NurseAction => ({
  type: "n_LOGIN_SUCCESS",
  payload: nurse,
});

export const n_LoginFailure = (): NurseAction => ({
  type: "n_LOGIN_FAILURE",
});

export const n_Logout = (): NurseAction => ({
  type: "LOGOUT",
});
