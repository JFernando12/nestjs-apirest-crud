import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, Query } from '@nestjs/common';
import { productDTO } from './dto/product.dto'
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Post('/')
    async createProduct(@Res() res, @Body() createProductDTO: productDTO) {
        const product = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: "Product succesfully created",
            product
        });
    };

    @Get('/')
    async getProducts(@Res() res): Promise<productDTO[]> {
        const products = await this.productService.getProducts();
        return res.status(200).json({
            message: "All products",
            products
        })
    }

    @Get("/:productID")
    async getProduct(@Res() res, @Param('productID') productID): Promise<productDTO> {
        const product = await this.productService.getProduct(productID);
        return res.status(200).json({
            message: "Product obtained succesfully",
            product
        })
    }
    
    @Delete("/")
    async deleteProduct(@Res() res, @Query('productID') productID): Promise<productDTO> {
        const productDeleted = await this.productService.deleteProduct(productID);
        return res.status(200).json({
            message: "Product deleted succesfully",
            productDeleted
        })
    }

    @Put('/:productID')
    async updateProduct(@Res() res, @Param('productID') productID, @Body() updatedProduct: productDTO) {
        const newProduct = await this.productService.updateProduct(productID, updatedProduct);
        return res.status(200).json({
            message: "Product updated succesfully",
            newProduct
        })
    }
}
