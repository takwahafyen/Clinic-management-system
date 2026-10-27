import { createContext, useEffect, useReducer, ReactNode } from "react";
import NurseReducer, { NurseState, NurseAction } from "./NurseReducer";

interface NurseContextValue extends NurseState {
  dispatch: React.Dispatch<NurseAction>;
}

const INITIAL_STATE: NurseState = {
  nurse: JSON.parse(localStorage.getItem("nurse") ?? "null"),
  isFetching: false,
  error: false,
};

export const NurseContext = createContext<NurseContextValue>({
  ...INITIAL_STATE,
  dispatch: () => undefined,
});

interface NurseContextProviderProps {
  children: ReactNode;
}

export const NurseContextProvider = ({ children }: NurseContextProviderProps) => {
  const [state, dispatch] = useReducer(NurseReducer, INITIAL_STATE);

  // storing current logged in user in the local storage
  useEffect(() => {
    localStorage.setItem("nurse", JSON.stringify(state.nurse));
  }, [state.nurse]);

  return (
    <NurseContext.Provider
      value={{
        nurse: state.nurse,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </NurseContext.Provider>
  );
};
