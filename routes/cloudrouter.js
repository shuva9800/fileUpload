const express = require("express");
const route = express.Router();


const{imageUpload, videoUpload, imagecompressUpload, fileUpload}= require("../controller/fileuploader");

route.post("/fileupload",fileUpload);
route.post("/imageupload", imageUpload);
// route.post("/videoupload", videoUpload);
// route.post("/compressimg", imagecompressUpload);


module.exports= route;