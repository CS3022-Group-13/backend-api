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
     *: UUID (string)
     */
    static async findBy_productId(productId: string): Promise<[MError, Product]> {
        const [error, data] = await resolver<any>(
            knex(this.tableName).where({productId}),
            {
                singleOnly: true
            }
        )
        return [error, data]
    }

    static async findBy_query(query: any): Promise<[MError,Product[]]> {

        const fields = ["productId", "productName"]
        Object.keys(query).forEach((k) => {
            if (fields.includes(k))
                (query[k] === null || query[k] === undefined) && delete query[k];
            else
                delete query[k];
        });

        const [error, data] = await resolver<any>(
            knex(this.tableName).where(query)
        )
        return [error, data]
    }
    

    static async addProduct(productData: Product): Promise<MError> {
        const [error] = await resolver<any>(
            knex(this.tableName).insert(productData),
            {allowUndefined: true});
        return error;
    }

    static async deleteBy_productID(productId: string): Promise<MError> {
        const [error] = await resolver<any>(
            knex.transaction(async (trx): Promise<any> => {
                await trx("productStock").where({productId}).del()
                await trx(this.tableName).where({productId}).del()
            })
        );
        return error;
    }

    static async updateBy_productId(productId:string, productData: any): Promise<MError> {
        const [error] = await resolver<any>(
            knex(this.tableName).where({productId}).update(productData),
            {allowUndefined: true});
        return error;
    }

    /**
     * reduce quantity of a product
     * @param trx : knex transaction object
     * @param product: Product
     * @param amount: number
     */
    static async reduceProductQuantity(trx: Transaction, product: Product, amount: number): Promise<MError> {
        return trx(this.tableName)
                .where({productId: product.productId})
                .update({quantity: product.quantity - amount});
    }
}