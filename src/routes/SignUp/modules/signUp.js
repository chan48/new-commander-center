import AWSCognitoManager from '../../../AWSCognitoManager';

// ------------------------------------
// Action Types
// ------------------------------------
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';
export const TRY_SIGN_UP = 'TRY_SIGN_UP';
export const ON_SIGN_UP_RESPONSE = 'ON_SIGN_UP_RESPONSE';

export const SignUpStates = {
  WRITING_ID: 'WRITING_INFO',
  WAITING_RESPONSE: 'WAITING_RESPONSE',
  ON_RESPONSE: 'ON_RESPONSE',
};
// ------------------------------------
// Actions
// ------------------------------------
export const setUserName = (value = '') => ({
  type: SET_USER_NAME,
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

export const trySignUp = () => (dispatch, getState) => new Promise((resolve) => {
  dispatch({
    type: TRY_SIGN_UP,
  });

  console.log(getState());
  const {
    email,
    userName,
    password,
  } = getState().signUp;

  AWSCognitoManager.signUp(userName, email, password)
  .then(() => {
    dispatch({
      type: ON_SIGN_UP_RESPONSE,
      isSuccess: true,
    });
  })
  .catch(err => dispatch({
    type: ON_SIGN_UP_RESPONSE,
    isSuccess: false,
    error: err,
  }))
  .then(() => {
    resolve();
  });
});

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_USER_NAME]: (state, action) => ({ ...state, userName: action.payload }),
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
  userName: '',
  password: '',
  email: '',
  currentState: SignUpStates.WRITING_ID,
  isSuccess: false,
  error: null,
};
export default function signUpReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
