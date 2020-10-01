const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const awsConfig = require("../config/aws");
// const {
//   DOCUMENT_TYPES,
//   MAX_UPLOAD_LIMIT,
//   UPLOAD_FIELD_NAME,
// } = require("../../utils/constants");

aws.config.update({
  accessKeyId: awsConfig.accessKey,
  secretAccessKey: awsConfig.secretKey,
  region: awsConfig.region,
});
const s3 = new aws.S3();

/* const fileFilter = function (req, file, cb) {
  const mimeTypes = DOCUMENT_TYPES.test(file.mimetype);
  const extName = DOCUMENT_TYPES.test(
    path.extname(file.originalname).toLowerCase()
  );
  if (mimeTypes && extName) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Error: File upload only supports the following file types:${DOCUMENT_TYPES}`
      )
    );
  }
}; */

// const storage = multerS3({
//   s3,
//   bucket: awsConfig.drawingBucket,
//   metadata(req, file, cb) {
//     cb(null, { fileName: file.originalname });
//   },
//   key(req, file, cb) {
//     cb(
//       null,
//       `${req.params.userId}/${req.params.documentCode}/${file.originalname}`
//     );
//   },
// });

const upload = multer({
  //   storage,
});

module.exports.fileUpload = multer({ dest: `${global.appRoot}/tmp` }).single(
  "image"
);
