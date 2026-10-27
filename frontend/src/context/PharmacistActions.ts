import { PharmacistAction } from "./PharmacistReducer";

export const p_LoginStart = (_pharmacistCredentials: unknown): PharmacistAction => ({
  type: "p_LOGIN_START",
});

export const p_LoginSuccess = (pharmacist: unknown): PharmacistAction => ({
  type: "p_LOGIN_SUCCESS",
  payload: pharmacist,
});

export const p_LoginFailure = (): PharmacistAction => ({
  type: "p_LOGIN_FAILURE",
});

export const p_Logout = (): PharmacistAction => ({
  type: "LOGOUT",
});
