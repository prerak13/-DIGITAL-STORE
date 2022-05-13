import {
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
const poolData = {
  UserPoolId: "us-east-1_nlhZ6GZ5v",
  ClientId: "76dlns6ofk194maap62v4n18tp",
};

export default new CognitoUserPool(poolData);
