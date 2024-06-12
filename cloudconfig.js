var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
var express = require('express');
var multer = require('multer');

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_secret : process.env.CLOUD_API_SECRET,
    api_key : process.env.CLOUD_API_KEY
});

var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'bucketbliss_dev',
    allowedFormats: ['jpg', 'png','jpeg'],
  });

module.exports = {
    cloudinary,
    storage
}