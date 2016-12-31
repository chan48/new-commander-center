import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import userPool from './userPool';

const logIn = (username, password) => new Promise((resolve, reject) => {
  const authenticationData = {
    Username: username,
    Password : password,
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userData = {
    Username: username,
    Pool : userPool,
  };
  const cognitoUser = new CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      console.log('access token + ' + result.getAccessToken().getJwtToken());
      /* Use the idToken for Logins Map when Federating User Pools with Cognito Identity
         or when passing through an Authorization Header to an API Gateway Authorizer */
      console.log('idToken + ' + result.idToken.jwtToken);
      resolve();
    },
    onFailure: err => reject(err),
  });
});

export default logIn;
