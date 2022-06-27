import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';
import { productDTO } from './dto/product.dto';

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product> ) {}

    async getProducts(): Promise<Product[]> {
        const products = await this.productModel.find();
        return products;
    }

    async getProduct(productID: string): Promise<Product> {
        const product = await this.productModel.findById(productID);
        return product;
    }

    async createProduct(newProduct: productDTO): Promise<Product> {
        const product = new this.productModel(newProduct);
        return await product.save()
    }

    async updateProduct(productID: string, createProduct: productDTO): Promise<Product> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(productID, createProduct, {new: true});
        return updatedProduct;
    }

    async deleteProduct(productID: string): Promise<any> {
        const productDeleted = await this.productModel.findOneAndDelete({productID});
        return productDeleted;
    }

}
