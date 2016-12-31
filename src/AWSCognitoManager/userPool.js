import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: __AWS_COGNITO_USER_POOL_ID__,
  ClientId: __AWS_COGNITO_APP_ID__,
};
const userPool = new CognitoUserPool(poolData);
console.log(userPool.getCurrentUser());
export default userPool;
