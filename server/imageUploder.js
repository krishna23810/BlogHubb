const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary with credentials
cloudinary.config({
    cloud_name: process.env.Cloudname,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploadImage = async (file, folder) => {
    console.log('uploadImage function called');
    console.log("folder:", folder);
    // Check if the file is provided
    if (!file) {
         Error('No file provided for upload');
    }
    // create an option object
    const options = {folder};
    
    // set resource type to auto
    options.resource_type = 'auto';

    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    } catch (error) {
        console.error('Error uploading image:', error);
        Error('Image upload failed');
    }
}
