export const p_LoginStart = (pharmacistCredentials) => ({
    type: "p_LOGIN_START",
  });
  
  export const p_LoginSuccess = (pharmacist) => ({
    type: "p_LOGIN_SUCCESS",
    payload: pharmacist,
  });
  
  export const p_LoginFailure = () => ({
    type: "p_LOGIN_FAILURE",
  });
  
  export const p_Logout = () => ({
    type: "LOGOUT",
  });
  