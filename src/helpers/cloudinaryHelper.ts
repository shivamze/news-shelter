import { promises } from "dns";
import cloudinary from "../utils/cloudinary";
import { UploadApiResponse } from "cloudinary";

export async function uploadOnCloudinary(file: File): Promise<UploadApiResponse | null>{
    try{
        if(!file){
            return null;
        }
    
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
    
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: "news-shelter",
                    resource_type: "auto",
                },
                (error, result) => {
                    if(error) return reject(error);
    
                    resolve(result);
                }
            ).end(buffer)
        })
    } catch(err: any){
        console.log(err);
        return null
    }
}

export async function deleteFromCloudinary(publicId: string) {
    try{
        return cloudinary.uploader.destroy(publicId);
    }catch(err: any){
        console.log(err);
        return null;
    }
}