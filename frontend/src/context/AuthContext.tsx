import React, { createContext, useContext, useEffect, useReducer, ReactNode } from "react";
import { Context } from "./Context";
import { NurseContext } from "./NurseContext";
import { PharmacistContext } from "./PharmacistContext";
import { DoctorAction } from "./Reducer";
import { NurseAction } from "./NurseReducer";
import { PharmacistAction } from "./PharmacistReducer";

// Union of all possible dispatched action types
type AuthAction = DoctorAction | NurseAction | PharmacistAction;

interface AuthState {
  user: any;
  isFetching: boolean;
  error: boolean;
}

interface AuthContextValue extends AuthState {
  role: string | null;
  doctor: any;
  nurse: any;
  pharmacist: any;
  dispatch: React.Dispatch<AuthAction>;
}

const getInitialUser = (): any => {
  try {
    return (
      JSON.parse(localStorage.getItem("user") ?? "null") ||
      JSON.parse(localStorage.getItem("doctor") ?? "null") ||
      JSON.parse(localStorage.getItem("nurse") ?? "null") ||
      JSON.parse(localStorage.getItem("pharmacist") ?? "null") ||
      null
    );
  } catch (e) {
    return null;
  }
};

const INITIAL_STATE: AuthState = {
  user: getInitialUser(),
  isFetching: false,
  error: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
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
        user: (action as { type: string; payload: any }).payload,
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

export const AuthContext = createContext<AuthContextValue>({
  ...INITIAL_STATE,
  role: null,
  doctor: null,
  nurse: null,
  pharmacist: null,
  dispatch: () => undefined,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  const user = state.user;
  const role: string | null = user?.role || (user?.specialization ? "doctor" : null);

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

  const authValue: AuthContextValue = {
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
