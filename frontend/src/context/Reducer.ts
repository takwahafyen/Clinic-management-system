export interface DoctorState {
  doctor: any;
  isFetching: boolean;
  error: boolean;
}

export type DoctorAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: any }
  | { type: "LOGIN_FAILURE" }
  | { type: "LOGOUT" };

const Reducer = (state: DoctorState, action: DoctorAction): DoctorState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        doctor: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        doctor: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        doctor: null,
        isFetching: false,
        error: true,
      };
    case "LOGOUT":
      return {
        doctor: null,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default Reducer;
