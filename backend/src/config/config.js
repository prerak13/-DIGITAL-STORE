const AWS = require("aws-sdk");

const AWS_CONFIG_S3 = new AWS.S3({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: process.env.AWS_REGION,
});

const S3_PARAMS = {
  Bucket: process.env.S3_BUCKET,
  Key: "key",
  Body: "",
};

let config = {
  secretAccessKey: "KV0LF5kiMzpKwM24Xttt+pV7a3zA5MjFf8nvBl85",
  accessKeyId: "ASIA3HJ3S47NXYFMULH6",
  region: "us-east-1",
  sessionToken:
    "FwoGZXIvYXdzECIaDBh5Ketm8YKeZt9oDyLAAY07j7Gz6m2ireW4kr/K9uZ/hucqm5TMHOK44fidQtKlXdSZlugQl3OE9kxTqSG5GE3JU5FZanjgAhbjShdJC6fVzicBbCzOj49ZGH216mcgwUvfFRxlZnf9LOHbXhlM3wHlsOSMdWw+28gcLmYATycoZ0m5j+QlZON97MqNigCA1DyTtxlZFXiBjoy6C8+/c13TMSk3kmzPpn2k/5T2539UKk5O3J3L28dx67keQABByKPhztmOKQp4t3NxJRN9GCjlh7eSBjItOks738r3DDOFmsWQpAnirApATXuCqXty15+J4NQMPXNq4wjha2zAd3qpiMGZ",
  secretName:
    "arn:aws:secretsmanager:us-east-1:771608471515:secret:CloudProjectDatabaseSecret-o2j332",
  Bucket: "cloud-project-product",
  TopicArn: "arn:aws:sns:us-east-1:771608471515:OrderStatusNotification",
};

module.exports = config;
