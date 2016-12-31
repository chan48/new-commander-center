import React from 'react';
import { UserListStates } from '../modules/userList';

const UserList = props => (
  <div style={{ margin: '0 auto' }} >
    <h2>verification Code:</h2>
    <input
      type='text'
      value={props.verificationCode}
      onChange={event => props.setVerificationCode(event.target.value)}
    />

    <button className='btn btn-default' onClick={props.tryUserList}>
      Verify Email
    </button>

    <h2>{JSON.stringify(props.currentState)}</h2>
    <h2>{JSON.stringify(props.isSuccess)}</h2>
    <h2>{props.error ? props.error.toString() : false}</h2>
  </div>
);

UserList.propTypes = {
  setVerificationCode: React.PropTypes.func.isRequired,
  tryUserList: React.PropTypes.func.isRequired,
  verificationCode: React.PropTypes.string.isRequired,
  currentState: React.PropTypes.string.isRequired,
  isSuccess: React.PropTypes.bool.isRequired,
  error: React.PropTypes.any,
};

export default UserList;
