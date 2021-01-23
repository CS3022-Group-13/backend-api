import {resolver, knex} from "../index";
import {MError} from "../merror";

export interface MaterialStock {
    stockId: string
    materialId: string
    quantity: number
    unitPrice: number
    date: Date
}


export class MaterialStockModel {

    static tableName = "materialStock";


    static async findBy_query(query: any): Promise<[MError, MaterialStock[]]> {
        const fields = ["materialId", "stockId"]
        Object.keys(query).forEach((k) => {
            if (fields.includes(k))
                (query[k] === null || query[k] === undefined) && delete query[k];
            else
                delete query[k];
        });

        const [error, data] = await resolver<MaterialStock[]>(
            knex(this.tableName).where(query),
        )
        return [error, data]
    }

    static async createStock(stockData: MaterialStock): Promise<MError> {
        const [error] = await resolver<any>(
            knex(this.tableName).insert(stockData),
            {allowUndefined: true});
        return error;
    }

    static async deleteBy_stockId(stockId: string): Promise<MError> {
        const [error] = await resolver<any>(
            knex(this.tableName).where({stockId}).del(),
            {
                allowUndefined: true
            }
        );
        return error;
    }

    static async updateBy_stockId(stockId:string, stockData: any): Promise<MError> {
        const [error] = await resolver<any>(
            knex(this.tableName).where({stockId}).update(stockData),
            {allowUndefined: true});
        return error;
    }
}