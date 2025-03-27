/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {  useEffect, useRef } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const ImageUpload = ({imageFile,setImageFile,uploadedImageUrl, setUploadedImageUrl,isImageLoading, setIsImageLoading}) => {
    const inputRef = useRef(null);

    function handleImageFileChange(e){
        console.log(e.target.files)
        const selectedFile = e.target.files?.[0];
        if(selectedFile){
            setImageFile(selectedFile);
        }

    }

    function handleDragover(e){
        e.preventDefault()
    }

    function handleOnDrop(e){
        e.preventDefault();
        const dropedFile = e.dataTransfer.files?.[0];
        if(dropedFile)setImageFile(dropedFile);
    }

    function handleRemoveImage(){
        setImageFile(null)
        if(inputRef.current){
            inputRef.current.value = '';
        }
    }

    async function uploadImageToCloudinary(){
        setIsImageLoading(true)
        const data = new FormData();
        data.append('my_file',imageFile)
        const response = await axios.post('http://localhost:8000/api/admin/upload-image',data);
        console.log(response.data)
        if(response.data?.success){
            setUploadedImageUrl(response.data.result.url);
            setIsImageLoading(false);
        } 
    }

    useEffect(()=>{
        if(imageFile !== null){
            uploadImageToCloudinary()
        }
    },[imageFile])

    return (
    <div className="w-full max-w-md max-auto px-6">
        <Label className='text-lg font-semibold mb-2 block '>Upload Image</Label>
        <div onDragOver={handleDragover} onDrop={handleOnDrop} className="border-2 border-dashed rounded-lg p-4 mt-4">
            <Input id='image-upload' type='file' className='hidden' ref={inputRef} onChange={handleImageFileChange}/>
            {
                !imageFile ?
                <Label htmlFor='image-upload' className='flex flex-col items-center justify-center h-23 cursor-pointer'>
                   <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"/>
                   <span>Drag & Drop - Click To Upload Image</span>
                </Label>:
                isImageLoading?<Skeleton className="h-10 bg-gray-100"/>:
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <FileIcon className="w-8 h-8 text-primary mr-2"/>
                    </div>
                    <p className="text-sm font-medium">
                        {imageFile.name}
                    </p>
                    <Button variant="ghost" size='icon' className='text-muted-foreground hover:text-foreground' onClick={handleRemoveImage}>
                        <XIcon className="w-4 h-4 "/>
                        <span className="sr-only">Remove File</span>
                    </Button>
                </div>
            }
        </div>
    </div>
  )
}

export default ImageUpload