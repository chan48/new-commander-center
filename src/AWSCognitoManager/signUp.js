import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import userPool from './userPool';

const signUp = (userName, email, password) => new Promise((resolve, reject) => {
  const attributeList = [];

  const dataEmail = {
    Name : 'email',
    Value : email,
  };

  const attributeEmail = new CognitoUserAttribute(dataEmail);

  attributeList.push(attributeEmail);

  userPool.signUp(userName, password, attributeList, null, (err) => {
    console.log(err);
    if (err) {
      return reject(err);
    }
    return resolve();
  });
});

export default signUp;
