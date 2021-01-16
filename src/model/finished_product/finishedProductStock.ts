import {MError} from "../merror";
import {knex, Model, resolver} from "../index";
import {Transaction} from "knex";

export interface FinishedProductStock {
    stockID: string;
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    date:any;
}

export class finishedProductStockModel {

    static tableName = 'finishedProductStock'

    /**
     * Find stock record by stock ID
     * @param stockID: UUID (string)
     */
    static async findBy_stockID(stockID: string): Promise<[MError, FinishedProductStock]> {
        const [error, data] = await resolver<FinishedProductStock[]>(
            knex(this.tableName).where({stockID}),
            {
                singleOnly: true
            }
        )
        return [error, data[0]]
    }

    /**
     * Add stock Data Entry :: Support Transactions
     * @param trx : knex transaction object
     * @param stockData
     */
    static async trx_createUserDataEntry(trx: Transaction, stockData: FinishedProductStock): Promise<any> {
        return trx(this.tableName).insert(stockData);
    }
}