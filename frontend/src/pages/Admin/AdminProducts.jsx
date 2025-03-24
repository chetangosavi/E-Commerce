import ImageUpload from '@/components/admin/ImageUpload';
import Form from '@/components/common/Form';
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config/config';
import { SquarePlus } from 'lucide-react';
import React, { Fragment, useState } from 'react'

const initialFormData ={
    image:null,
    title:'',
    description:'',
    category:'',
    brand:'',
    price:'',
    salePrice:'',
    totalStock:''

}
const AdminProducts = () => {
  const [openCreateProductDialog,SetOpenCreateProductDialog] = useState(false);
  const [formData,setFormData] = useState(initialFormData);
  const [imageFile,setImageFile] =useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [isImageLoading, setIsImageLoading] = useState(false);


  console.log(formData,"FormData")
  function onSubmit (e){
    e.preventDefault();
  }
  return (
    
      <Fragment>
        <div className='mb-5 w-full flex justify-end'>
            <Button onClick={()=>SetOpenCreateProductDialog(true)}>ADD PRODUCT</Button>
        </div>
        <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4' >

        </div>
        <Sheet open={openCreateProductDialog} onOpenChange={()=>SetOpenCreateProductDialog(false)}>
          <SheetContent side='right' className='overflow-auto'>
            <SheetHeader>
              <SheetTitle className='flex gap-3'>
              <SquarePlus />
                Add New Product
              </SheetTitle>
            </SheetHeader>
            <ImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} isImageLoading={isImageLoading} setIsImageLoading={setIsImageLoading}/>
            <div className='px-6'>
              <Form formControls={addProductFormElements} formData={formData} setFormData={setFormData} buttonText='ADD' onSubmit={onSubmit}/>
            </div>
          </SheetContent>
        </Sheet>
      </Fragment>
   
  )
}

export default AdminProducts