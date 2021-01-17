import {MError} from "../merror";
import {knex, Model, resolver} from "../index";
import {Transaction} from "knex";

export interface FinishedProduct {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
}

export class finishedProductModel {

    static tableName = 'finishedProduct'

    /**
     * Find finishedProduct record by product ID
     * @param productID: UUID (string)
     */
    static async findBy_productID(productID: string): Promise<[MError, FinishedProduct]> {
        const [error, data] = await resolver<FinishedProduct[]>(
            knex(this.tableName).where({productID}),
            {
                singleOnly: true
            }
        )
        return [error, data[0]]
    }

    /**
     * Add Product Data Entry :: Support Transactions
     * @param trx : knex transaction object
     * @param productData
     */
    static async trx_createUserDataEntry(trx: Transaction, productData: FinishedProduct): Promise<any> {
        return trx(this.tableName).insert(productData);
    }
}