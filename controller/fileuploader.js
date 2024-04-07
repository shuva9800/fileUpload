const cloumodel = require("../model/cloudmodel");
const cloudinary = require("cloudinary").v2;

exports.fileUpload= async (req,res) => {
    try{
        const file= req.files.file;
        const {name,email,tags }= req.body;
        console.log("uploaded file is:-" , file);
        // path = current directory + path where to upload +current time in milisec + extentions

        const path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

        file.mv(path, (err)=>{console.log(err)});
        console.log(file);

        // const value = await cloumodel.create({
        //     name,
        //     email, 
        //     tags,
        //     imageUrl:file
        // }) 

        res.status(200).json({
            success:true,
            message: "file uploaded successfully"
        })

    }
    catch(error){
        console.log(error);
        return res.status(404).json({
            success:false,
            message: "File upload failed"
        })
    }
}


//check file type
function matchType(supportedType, fileType){
    console.log("filetype2:-", fileType);
    return supportedType.includes(fileType);
}
//upload file to cloudinary 
async function uploadFiletoCloudinary(file, folder,quality){
    const option = {folder};
    option.resource_type ="auto";
    if(quality){
        option.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, option)
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
        const value = matchType( supportedType,fileType);
        
         if(! value){
            return res.status(404).json({
                success:false,
                message:" file type not supported"
            })
         }
      //console.log("type matched");
         const response = await uploadFiletoCloudinary(file, "shuvadata");
         console.log("response is:-", response)
        
         const dbdetails= await cloumodel.create({
            name,
            email,
            tags,
            imageUrl:response.secure_url
         })

         return res.status(200).json({
            success:true,
            dbdetails,
            message: "image upload successfully"
         })
         
    }
    catch(error){
        console.log(error);
        return res.status(404).json({
            success:false,
            message: "somthing went wrong"
        })
    }
}

//video upload to cloudinary

exports.videoUpload = async (req,res)=>{
    try{
        const{name, email,tags}= req.body;
        console.log("details of user:-",name,email,tags);
        const file = req.files.videoFile;
        console.log(file);

        const supportType= ["mp4","mp3"];
        const filetype = file.name.split(".")[1].toLowerCase();

        //match type of input file
        if(!matchType(supportType, filetype)){
            return res.status(400).json({
                success:false,
                message: "filetype does not match"
            })
        }
        const response = await uploadFiletoCloudinary(file, "shuvadata");
        console.log(response);
       // data entry in DataBase
        const value = await cloumodel.create({
            name, email,tags,imageUrl:response.secure_url
        })

        console.log(value);
        return res.status(200).json({
            success:true,
            value,
            imageUrl: response.secure_url
        })
    }
    catch(error){
        console.log(error);
        return res.status(404).json({
            success:false,
            message: "somthing went wrong to upload video"
        })
    }
}

//image quality reduce and upload to cloudinary

exports.imagecompressUpload = async (req,res)=>{
    try{
      const{name,email,tags}= req.body;
      console.log(name,email,tags);
      const imageFile = req.files.imgfile;
      console.log(imageFile);
      
      const supportedTypes =["jpg", "png", "jpeg"];
      const inputimgType= imageFile.name.split(".")[1].toLowerCase();

      if(!matchType(supportedTypes,inputimgType)){
        return response.status(404).json({
            success:false,
            message: "image type not supported"
        })
      }

      const response = await uploadFiletoCloudinary(imageFile, "shuvadata", 50);
      console.log(response);

      const dbstatus = await cloumodel.create({
        name,
        email,
        tags,
        imageUrl:response.secure_url,
      })
      return res.status(200).json({
        success: true,
        dbstatus,
        imageUrl: response.secure_url
      })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message:error.message,
            message:"somthing went to wrong"
        })

    }
}