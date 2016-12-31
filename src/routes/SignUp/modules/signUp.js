import AWSCognitoManager from '../../../AWSCognitoManager';

// ------------------------------------
// Action Types
// ------------------------------------
export const SET_USERNAME = 'SET_USERNAME';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';
export const TRY_SIGN_UP = 'TRY_SIGN_UP';
export const ON_SIGN_UP_RESPONSE = 'ON_SIGN_UP_RESPONSE';

export const SignUpStates = {
  WRITING_INFO: 'WRITING_INFO',
  WAITING_RESPONSE: 'WAITING_RESPONSE',
  ON_RESPONSE: 'ON_RESPONSE',
};
// ------------------------------------
// Actions
// ------------------------------------
export const setUsername = (value = '') => ({
  type: SET_USERNAME,
  payload: value,
});

export const setEmail = (value = '') => ({
  type: SET_EMAIL,
  payload: value,
});

export const setPassword = (value = '') => ({
  type: SET_PASSWORD,
  payload: value,
});

export const trySignUp = () => (dispatch, getState) => new Promise(() => {
  dispatch({
    type: TRY_SIGN_UP,
  });

  console.log(getState());
  const {
    email,
    username,
    password,
  } = getState().signUp;

  AWSCognitoManager.signUp(username, email, password)
  .then(() => dispatch({
    type: ON_SIGN_UP_RESPONSE,
    isSuccess: true,
  }))
  .catch(error => dispatch({
    type: ON_SIGN_UP_RESPONSE,
    isSuccess: false,
    error,
  }));
});

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_USERNAME]: (state, action) => ({ ...state, username: action.payload }),
  [SET_EMAIL]: (state, action) => ({ ...state, email: action.payload }),
  [SET_PASSWORD]: (state, action) => ({ ...state, password: action.payload }),
  [TRY_SIGN_UP]: state => ({
    ...state,
    currentState: SignUpStates.WAITING_RESPONSE,
  }),
  [ON_SIGN_UP_RESPONSE]: (state, action) => ({
    ...state,
    currentState: SignUpStates.ON_RESPONSE,
    isSuccess: action.isSuccess,
    error: action.error,
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  username: '',
  password: '',
  email: '',
  currentState: SignUpStates.WRITING_INFO,
  isSuccess: false,
  error: null,
};
export default function signUpReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
