import {MError} from "../merror";
import {knex, resolver} from "../index";
import {Transaction} from "knex";


export interface ProductStock {
    stockId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    date:any;
}

export class ProductStockModel {

    static tableName = 'productStock'

    /**
     * Find stock record by stock ID
     * : UUID (string)
     */
    static async findBy_stockID(stockId: string): Promise<[MError, ProductStock]> {
        const [error, data] = await resolver<ProductStock[]>(
            knex(this.tableName).where({stockId}),
            {
                singleOnly: true
            }
        )
        return [error, data[0]]
    }

    static async createStockDataEntry(stockData: ProductStock): Promise<any> {
        const [error] = await resolver<any>(
            knex(this.tableName).insert(stockData),
            {allowUndefined: true});
        return error;
    }
    
    static async deleteBy_stockID(stockId: string): Promise<any> {
        const [error] = await resolver<any>(
            knex(this.tableName).where({stockId}).del(),
            {
                allowUndefined: true
            }
        );
        return error;
    }

    static async updateStockDataEntry(stockId:string, stockData: ProductStock): Promise<any> {
        const [error] = await resolver<any>(
            knex(this.tableName).where({stockId}).update(stockData),
            {allowUndefined: true});
        return error;
    }
}