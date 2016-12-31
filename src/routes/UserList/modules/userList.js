import AWSCognitoManager from '../../../AWSCognitoManager';

// ------------------------------------
// Action Types
// ------------------------------------
export const FETCH_LIST = 'FETCH_LIST';
export const FETCH_NEXT_LIST = 'FETCH_NEXT_LIST';
export const ON_FETCH_DONE = 'ON_FETCH_DONE';

// ------------------------------------
// Actions
// ------------------------------------

export const fetchList = () => (dispatch, getState) => new Promise((resolve) => {
  dispatch({
    type: FETCH_LIST,
  });

  AWSCognitoManager.getUserPoolClients()
  .then(data => dispatch({
    type: ON_FETCH_DONE,
    data,
  }))
  .catch(error => dispatch({
    type: ON_FETCH_DONE,
    error,
  }));

});
export const setVerificationCode = (value = '') => ({
  type: SET_VERIFICATION_CODE,
  payload: value,
});

export const tryUserList = () => (dispatch, getState) => new Promise(() => {
  dispatch({
    type: FETCH_LIST,
  });

  AWSCognitoManager.userList(verificationCode)
  .then(() => dispatch({
      type: ON_VERIFY_EMAIL_RESPONSE,
      isSuccess: true,
  }))
  .catch(err => dispatch({
    type: ON_VERIFY_EMAIL_RESPONSE,
    isSuccess: false,
    error: err,
  }))
});

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_VERIFICATION_CODE]: (state, action) => ({ ...state, verificationCode: action.payload }),
  [TRY_VERIFY_EMAIL]: state => ({
    ...state,
    currentState: UserListStates.WAITING_RESPONSE,
  }),
  [ON_VERIFY_EMAIL_RESPONSE]: (state, action) => ({
    ...state,
    currentState: UserListStates.ON_RESPONSE,
    isSuccess: action.isSuccess,
    error: action.error,
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  error: null,
  nextToken: '',
};
export default function userListReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
