import React from 'react';
import { LogInStates } from '../modules/logIn';

const LogIn = props => (
  <div style={{ margin: '0 auto' }} >
    <h2>User Name or Email:</h2>
    <input type='text' value={props.id} onChange={event => props.setID(event.target.value)} />

    <h2>Password:</h2>
    <input type='password' value={props.password} onChange={event => props.setPassword(event.target.value)} />
    <button className='btn btn-default' onClick={props.tryLogIn}>
      Log In
    </button>

    <h2>{JSON.stringify(props.currentState)}</h2>
    <h2>{JSON.stringify(props.isSuccess)}</h2>
    <h2>{JSON.stringify(props.error)}</h2>
  </div>
);

LogIn.propTypes = {
  setID: React.PropTypes.func.isRequired,
  setPassword: React.PropTypes.func.isRequired,
  tryLogIn: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
  password: React.PropTypes.string.isRequired,
  currentState: React.PropTypes.string.isRequired,
  isSuccess: React.PropTypes.bool.isRequired,
  error: React.PropTypes.any,
};

export default LogIn;
