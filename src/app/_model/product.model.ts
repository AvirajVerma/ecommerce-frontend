import { FileHandle } from "./file-handle.model";

export interface Product{
    productId: number | any,
    productName: String,
    productDescription: String,
    productDiscountedPrice: Number | any,
    productActualPrice: Number | any,
    productImages: FileHandle[]
}

