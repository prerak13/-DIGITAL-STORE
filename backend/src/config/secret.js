const config = require("../config/config");

var AWS = require("aws-sdk"),
  region = config.region,
  secretName = config.secretName,
  secrets = {},
  decodedBinarySecret;

var client = new AWS.SecretsManager({
  region: region,
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  sessionToken: config.sessionToken,
});

const getValues = new Promise((resolve, reject) => {
  client.getSecretValue({ SecretId: secretName }, function (err, data) {
    if (err) {
      throw err;
    } else {
      if ("SecretString" in data) {
        secret = data.SecretString;
        secret_values = JSON.parse(secret);
        //   console.log(secret_values);
      } else {
        let buff = new Buffer(data.SecretBinary, "base64");
        decodedBinarySecret = buff.toString("ascii");
      }
      secrets = {
        host: secret_values.host,
        user: secret_values.username,
        password: secret_values.password,
        port: secret_values.port,
        database: secret_values.dbname,
      };

      //   console.log(secrets);
      resolve(secrets);
    }
  });
});

module.exports = getValues;
