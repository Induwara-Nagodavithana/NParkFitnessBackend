var aws = require('aws-sdk')
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')

const bucketName = "npark-fitness-bucket"
const region = "us-east-2"
const accessKeyId = 'AKIAQDCCIQH2ET7FOHB6'
const secretAccessKey = '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'
const accountId = '006581420532'

aws.config.update({
  secretAccessKey: secretAccessKey,
  region: region,
  accessKeyId: accessKeyId
});
var s3 = new aws.S3();


// var s3 = new aws.S3({
//   accessKeyId:accessKeyId,
//   region:region,
//   secretAccessKey:secretAccessKey
// })

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
  console.log(file);
  console.log(req);
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname)
    }
  })
})

exports.upload = upload

// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream