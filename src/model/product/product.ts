import {MError} from "../merror";
import {knex, resolver} from "../index";
import {Transaction} from "knex";

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
     * @param productID: UUID (string)
     */
    static async findBy_productID(productID: string): Promise<[MError, Product]> {
        const [error, data] = await resolver<Product[]>(
            knex(this.tableName).where({productID}),
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

    static async trx_createProductDataEntry(trx: Transaction, productData: Product): Promise<any> {
        return trx(this.tableName).insert(productData);
    }
}