import Product from "../models/product.model";
import { IProduct } from "../interfaces/product.interface";

export const createProduct = async (
  productData: Partial<IProduct>,
): Promise<IProduct> => {
  return Product.create(productData);
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  return Product.find();
};

export const getProductById = async(productId:string):Promise<IProduct|null> =>{
    return Product.findById(productId);
}

export const updateProduct = async(productId:string, productData:IProduct) : Promise<IProduct|null>=>{
    return Product.findByIdAndUpdate(productId,productData,{
        new:true,
        runValidators:true
    })
}