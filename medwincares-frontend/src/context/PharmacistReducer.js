const PharmacistReducer = (state, action) => {
    switch (action.type) {
      case "p_LOGIN_START":
        return {
          pharmacist: null,
          isFetching: true,
          error: false,
        };
      case "p_LOGIN_SUCCESS":
        return {
          pharmacist: action.payload,
          isFetching: false,
          error: false,
        };
      case "p_LOGIN_FAILURE":
        return {
          pharmacist: null,
          isFetching: false,
          error: true,
        };
      case "LOGOUT":
        return {
          pharmacist: null,
          isFetching: false,
          error: false,
        };
      default:
        return state;
    }
  };
  
  export default PharmacistReducer;
  