import * as act from './auth.actions';

const initState = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(state = initState, action: act.AuthActions) {
  switch (action.type) {
    case act.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        authError: null,
        loading: false,
      };
    case act.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case act.LOGIN_START:
    case act.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case act.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
