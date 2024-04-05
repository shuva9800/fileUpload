const cloumodel = require("../model/cloudmodel");
const cloudinary = require("cloudinary").v2;

exports.fileUpload= async (req,res) => {
    try{
        const file= req.files.file;
        console.log("uploaded file is:-" , file);
        // path = current directory + path where to upload +current time in milisec + extentions

        const path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

        file.mv(path, (err)=>{console.log(err)});

        res.status(200).json({
            success:true,
            message: "file uploaded successfully"
        })

    }
    catch(error){
        console.log(error);
    }
}


//check file type
function matchType(supportedType, fileType){
    console.log("filetype2:-", fileType);
    return supportedType.includes(fileType);
}
//upload file to cloudinary 
async function uploadFiletoCloudinary(file, folder){
    const option = {folder};
    return await cloudinary.uploader.upload(file.tempFilepath, option)
}
// image upload handler
exports.imageUpload = async (req, res)=> {
    try{
        const {name,email,tags}= req.body;
        console.log(name,email,tags);
         const file = req.files.imageFile;
         console.log("inserted file is :-", file);

         const supportedType =["jpg", "png", "jpeg"];
         const fileType = file.name.split(".")[1].toLowerCase();
         console.log("filetype:-", fileType);
        //  const value = matchType( supportedType,fileType);
        
         if(! matchType(supportedType,fileType)){
            return res.status(404).json({
                success:false,
                message:" file type not supported"
            })
         }

         const response = await uploadFiletoCloudinary(file, "shuvadata")
         
    }
    catch(error){

    }
}