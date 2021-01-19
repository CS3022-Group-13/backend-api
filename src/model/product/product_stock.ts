import {MError} from "../merror";
import {knex, resolver} from "../index";
import {Transaction} from "knex";

export interface ProductStock {
    stockID: string;
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    date:any;
}

export class ProductStockModel {

    static tableName = 'productStock'

    /**
     * Find stock record by stock ID
     * @param stockID: UUID (string)
     */
    static async findBy_stockID(stockID: string): Promise<[MError, ProductStock]> {
        const [error, data] = await resolver<ProductStock[]>(
            knex(this.tableName).where({stockID}),
            {
                singleOnly: true
            }
        )
        return [error, data[0]]
    }
}