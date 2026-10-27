export interface NurseState {
  nurse: any;
  isFetching: boolean;
  error: boolean;
}

export type NurseAction =
  | { type: "n_LOGIN_START" }
  | { type: "n_LOGIN_SUCCESS"; payload: any }
  | { type: "n_LOGIN_FAILURE" }
  | { type: "LOGOUT" };

const NurseReducer = (state: NurseState, action: NurseAction): NurseState => {
  switch (action.type) {
    case "n_LOGIN_START":
      return {
        nurse: null,
        isFetching: true,
        error: false,
      };
    case "n_LOGIN_SUCCESS":
      return {
        nurse: action.payload,
        isFetching: false,
        error: false,
      };
    case "n_LOGIN_FAILURE":
      return {
        nurse: null,
        isFetching: false,
        error: true,
      };
    case "LOGOUT":
      return {
        nurse: null,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default NurseReducer;
