import userPool from './userPool';

const verifyEmail = verificationCode => new Promise((resolve, reject) => {
  const cognitoUser = userPool.getCurrentUser();

  cognitoUser.getAttributeVerificationCode('email', {
    onFailure: err => reject(err),
    inputVerificationCode: () => {
      cognitoUser.verifyAttribute('email', verificationCode, {
        onSuccess: result => resolve(result),
      });
    },
  });
});

export default verifyEmail;
