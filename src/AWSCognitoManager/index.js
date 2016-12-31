import AWS from 'aws-sdk';
import userPool from './userPool';
import signUp from './signUp';
import logIn from './logIn';

AWS.config.region = 'ap-northeast-2';

export default {
  userPool,
  signUp,
  logIn,
};
