import AWSCognitoManager from '../../../AWSCognitoManager';

// ------------------------------------
// Action Types
// ------------------------------------
export const SET_VERIFICATION_CODE = 'SET_VERIFICATION_CODE';
export const TRY_VERIFY_EMAIL = 'TRY_VERIFY_EMAIL';
export const ON_VERIFY_EMAIL_RESPONSE = 'ON_VERIFY_EMAIL_RESPONSE';

export const VerifyEmailStates = {
  WRITING_INFO: 'WRITING_INFO',
  WAITING_RESPONSE: 'WAITING_RESPONSE',
  ON_RESPONSE: 'ON_RESPONSE',
};

// ------------------------------------
// Actions
// ------------------------------------
export const setVerificationCode = (value = '') => ({
  type: SET_VERIFICATION_CODE,
  payload: value,
});

export const tryVerifyEmail = () => (dispatch, getState) => new Promise((resolve) => {
  dispatch({
    type: TRY_VERIFY_EMAIL,
  });

  const {
    verificationCode,
  } = getState().verifyEmail;

  AWSCognitoManager.verifyEmail(verificationCode)
  .then(() => {
    dispatch({
      type: ON_VERIFY_EMAIL_RESPONSE,
      isSuccess: true,
    });
  })
  .catch(err => dispatch({
    type: ON_VERIFY_EMAIL_RESPONSE,
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
  [SET_VERIFICATION_CODE]: (state, action) => ({ ...state, verificationCode: action.payload }),
  [TRY_VERIFY_EMAIL]: state => ({
    ...state,
    currentState: VerifyEmailStates.WAITING_RESPONSE,
  }),
  [ON_VERIFY_EMAIL_RESPONSE]: (state, action) => ({
    ...state,
    currentState: VerifyEmailStates.ON_RESPONSE,
    isSuccess: action.isSuccess,
    error: action.error,
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  verificationCode: '',
  currentState: VerifyEmailStates.WRITING_INFO,
  isSuccess: false,
  error: null,
};
export default function verifyEmailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
