import { imageUploadUtil } from "../../helpers/cloudinary.js";
import { Product } from "../../schemas/Product.Schema.js";

export const hadndleImageUpload = async (req,res)=>{
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = `data:${req.file.mimetype};base64,${b64}`;
        
        const result = await imageUploadUtil(url);

        res.status(200).json({ success: true, result, message: "Upload successful" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Error in server',
            success:false
        })
        
    }
}

// Add new Product:

const addProduct = async (req,res)=>{
    try {
        const {image,title,description,category,brand,price,salePrice,totalStock} = req.body;
        
         // Check if required fields are present
         if (!title || !description || !category || !brand || !price || !totalStock) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Validate price and salePrice
        price = Number(price);
        salePrice = Number(salePrice);
        totalStock = Number(totalStock);

        if (isNaN(price) || isNaN(salePrice) || isNaN(totalStock)) {
            return res.status(400).json({
                success: false,
                message: "Price, sale price, and stock must be numbers",
            });
        }

        if (salePrice > price) {
            return res.status(400).json({
                success: false,
                message: "Sale price cannot be greater than the original price",
            });
        }
        
        const newProduct = new Product({image,title,description,category,brand,price,salePrice,totalStock})
        await newProduct.save();
        res.status(200).json({
            success:true,
            message:"Product Added Successfully",
            data:newProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Failed to add product, Some Server error"
        })
    }
}

// Fetch All Products:

const getAllProducts = async (req, res) => {
    try {
        const listOfProducts = await Product.find();

        
        if (listOfProducts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products available",
            });
        }

        res.status(200).json({
            success: true,
            message: "All products fetched successfully",
            products: listOfProducts,  
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch products, Some Server error",
        });
    }
};




// Update Product:
const updateProduct = async (req,res)=>{
    try {

        const {id} = req.params;
        const {image,title,description,category,brand,price,salePrice,totalStock} = req.body;
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({
                status:false,
                message:'Product Not Found!'
            })
        }

 
        //Creating object manually for update only
        const updatedFields = {};
        Object.keys(req.body).forEach((key)=>{
            if(req.body[key]!==undefined){
                updatedFields[key] = req.body[key];
            }
        });

        const updatedProduct = await findByIdAndUpdate(id,{$set:updatedFields})
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct, 
        });

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Failed to add product, Some Server error"
        })
    }
    }


// Delete Product:
const deleteProduct = async (req,res)=>{
    try {
        const {id} = req.params;
        const deletedProduct =await Product.findByIdAndDelete(id)

        if(!deletedProduct){
            return res.status(404).json({
                message:'Product Not Found!',
                success:false
            })
        }

        return res.status(200).json({
            message:'Product Deleted Successfully',
            success:true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Failed to delete product, Some Server error"
        })
    }
    }