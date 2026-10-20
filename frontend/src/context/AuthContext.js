import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Context } from "./Context";
import { NurseContext } from "./NurseContext";
import { PharmacistContext } from "./PharmacistContext";

const getInitialUser = () => {
  try {
    return (
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(localStorage.getItem("doctor")) ||
      JSON.parse(localStorage.getItem("nurse")) ||
      JSON.parse(localStorage.getItem("pharmacist")) ||
      null
    );
  } catch (e) {
    return null;
  }
};

const INITIAL_STATE = {
  user: getInitialUser(),
  isFetching: false,
  error: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
    case "n_LOGIN_START":
    case "p_LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
    case "n_LOGIN_SUCCESS":
    case "p_LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
    case "n_LOGIN_FAILURE":
    case "p_LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  const user = state.user;
  const role = user?.role || (user?.specialization ? "doctor" : null);

  // Sync with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      // Clean up legacy keys and maintain backward compatibility
      if (role === "doctor" || !user.role) {
        localStorage.setItem("doctor", JSON.stringify(user));
        localStorage.removeItem("nurse");
        localStorage.removeItem("pharmacist");
      } else if (role === "nurse") {
        localStorage.setItem("nurse", JSON.stringify(user));
        localStorage.removeItem("doctor");
        localStorage.removeItem("pharmacist");
      } else if (role === "pharmacist") {
        localStorage.setItem("pharmacist", JSON.stringify(user));
        localStorage.removeItem("doctor");
        localStorage.removeItem("nurse");
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("doctor");
      localStorage.removeItem("nurse");
      localStorage.removeItem("pharmacist");
    }
  }, [user, role]);

  const doctor = role === "doctor" || (!user?.role && user) ? user : null;
  const nurse = role === "nurse" ? user : null;
  const pharmacist = role === "pharmacist" ? user : null;

  const authValue = {
    user,
    role,
    doctor,
    nurse,
    pharmacist,
    isFetching: state.isFetching,
    error: state.error,
    dispatch,
  };

  return (
    <AuthContext.Provider value={authValue}>
      <Context.Provider
        value={{ doctor, isFetching: state.isFetching, error: state.error, dispatch }}
      >
        <NurseContext.Provider
          value={{ nurse, isFetching: state.isFetching, error: state.error, dispatch }}
        >
          <PharmacistContext.Provider
            value={{ pharmacist, isFetching: state.isFetching, error: state.error, dispatch }}
          >
            {children}
          </PharmacistContext.Provider>
        </NurseContext.Provider>
      </Context.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
