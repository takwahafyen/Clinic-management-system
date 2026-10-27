import { DoctorAction } from "./Reducer";

export const LoginStart = (_doctorCredentials: unknown): DoctorAction => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (doctor: unknown): DoctorAction => ({
  type: "LOGIN_SUCCESS",
  payload: doctor,
});

export const LoginFailure = (): DoctorAction => ({
  type: "LOGIN_FAILURE",
});

export const Logout = (): DoctorAction => ({
  type: "LOGOUT",
});
