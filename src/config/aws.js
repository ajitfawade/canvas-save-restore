require("dotenv").config();

module.exports = {
  region: process.env.AWS_REGION,
  accessKey: process.env.AWS_ACCESS_KEY,
  secretKey: process.env.AWS_SECRET_KEY,
  drawingBucket: process.env.AWS_DRAWINGS_BUCKET,
};
