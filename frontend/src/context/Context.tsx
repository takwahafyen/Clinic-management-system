import { createContext, useEffect, useReducer, ReactNode } from "react";
import Reducer, { DoctorState, DoctorAction } from "./Reducer";

interface ContextValue extends DoctorState {
  dispatch: React.Dispatch<DoctorAction>;
}

const INITIAL_STATE: DoctorState = {
  doctor: JSON.parse(localStorage.getItem("doctor") ?? "null"),
  isFetching: false,
  error: false,
};

export const Context = createContext<ContextValue>({
  ...INITIAL_STATE,
  dispatch: () => undefined,
});

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  // storing current logged in user in the local storage
  useEffect(() => {
    localStorage.setItem("doctor", JSON.stringify(state.doctor));
  }, [state.doctor]);

  return (
    <Context.Provider
      value={{
        doctor: state.doctor,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
