import { createContext, useEffect, useReducer, ReactNode } from "react";
import PharmacistReducer, { PharmacistState, PharmacistAction } from "./PharmacistReducer";

interface PharmacistContextValue extends PharmacistState {
  dispatch: React.Dispatch<PharmacistAction>;
}

const INITIAL_STATE: PharmacistState = {
  pharmacist: JSON.parse(localStorage.getItem("pharmacist") ?? "null"),
  isFetching: false,
  error: false,
};

export const PharmacistContext = createContext<PharmacistContextValue>({
  ...INITIAL_STATE,
  dispatch: () => undefined,
});

interface PharmacistContextProviderProps {
  children: ReactNode;
}

export const PharmacistContextProvider = ({ children }: PharmacistContextProviderProps) => {
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
