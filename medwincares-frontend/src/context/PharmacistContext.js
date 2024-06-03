import { createContext, useEffect, useReducer } from "react";
import PharmacistReducer from "./PharmacistReducer";

const INITIAL_STATE = {
  pharmacist: JSON.parse(localStorage.getItem("pharmacist")) || null,
  isFetching: false,
  error: false,
};

export const PharmacistContext = createContext(INITIAL_STATE);

export const PharmacistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PharmacistReducer, INITIAL_STATE);

  // storing current logged in user in the local storage
  useEffect(() => {
    localStorage.setItem("pharmacist", JSON.stringify(state.pharmacist));
  }, [state.pharmacist]);

  return (
    <PharmacistContext.Provider
      value={{
        pharmacist: state.pharmacist,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </PharmacistContext.Provider>
  );
};
