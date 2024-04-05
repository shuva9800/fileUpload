const express = require("express");
const route = express.Router();


const{imageUpload, videoUpload, imagecompressUpload, fileUpload}= require("../controller/fileuploader");

route.post("/fileupload",fileUpload);


module.exports= route;