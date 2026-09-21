import { createContext, useEffect, useReducer } from "react";
import NurseReducer from "./NurseReducer";

const INITIAL_STATE = {
  nurse: JSON.parse(localStorage.getItem("nurse")) || null,
  isFetching: false,
  error: false,
};

export const NurseContext = createContext(INITIAL_STATE);

export const NurseContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(NurseReducer, INITIAL_STATE);

  // storing current logged in user in the local storage
  useEffect(() => {
    localStorage.setItem("nurse", JSON.stringify(state.nurse));
  }, [state.nurse]);

  return (
    <NurseContext.Provider
      value={{
        nurse:state.nurse,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </NurseContext.Provider>
  );
};
