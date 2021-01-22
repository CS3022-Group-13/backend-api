import {MError} from "../merror";
import {knex, resolver} from "../index";


export interface Product {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
}

export class ProductModel {

    static tableName = 'product'

    /**
     * Find finishedProduct record by product ID
     * @param productId: UUID (string)
     */
    static async findBy_productID(productId: string): Promise<[MError, Product]> {
        const [error, data] = await resolver<Product[]>(
            knex(this.tableName).where(productId),
            {
                singleOnly: true
            }
        )
        return [error, data[0]]
    }
    /** 
    @param trx
    @param productData
    */

    static async createProductDataEntry(productData: Product): Promise<any> {
        const [error] = await resolver<any>(
            knex(this.tableName).insert(productData),
            {allowUndefined: true});
        return error;
    }

    static async deleteBy_productID(productId: string): Promise<any> {
        const error = await resolver<Product[]>(
            knex(this.tableName).where(productId).del(),
            {
                singleOnly: true
            }
        );
        return error;
    }

    static async updateProductDataEntry(productId:string, productData: Product): Promise<any> {
        const [error] = await resolver<any>(
            knex(this.tableName).where(productId).update(productData),
            {allowUndefined: true});
        return error;
    }

}


