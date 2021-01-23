import {MError} from "../merror";
import {knex, resolver} from "../index";
import { Transaction } from "knex";

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
     * reduce quantity of a product
     * @param trx : knex transaction object
     * @param product: Product
     * @param amount: number
     */
    static async reduceProductQuantity(trx: Transaction, product: Product, amount: number): Promise<any> {
        return trx(this.tableName)
                .where({productId: product.productId})
                .update({quantity: product.quantity - amount});
    }
}