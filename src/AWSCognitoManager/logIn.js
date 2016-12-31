import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import userPool from './userPool';


function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const logIn = (id, password) => new Promise((resolve, reject) => {
  const authenticationData = {
    Password : password,
  };
  const userData = {
    Pool : userPool,
  };
  if (validateEmail(id)) {
    authenticationData.Email = id;
    userData.Email = id;
  } else {
    authenticationData.Username = id;
    userData.Username = id;
  }

  const authenticationDetails = new AuthenticationDetails(authenticationData);

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
