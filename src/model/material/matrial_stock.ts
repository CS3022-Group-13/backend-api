import {resolver, knex} from "../index";
import {MError} from "../merror";

export interface MaterialStock {
    stock_id: string
    materialId: string
    quantity: number
    unitPrice: number
    date: Date
}


export class MaterialStockModel {

    static tableName = "materialStock";

    /**
     * Find stock by id
     * @param stock_id : string
     */
    static async findBy_stockId(stock_id: string): Promise<[MError, MaterialStock]> {
        const [error, data] = await resolver<MaterialStock[]>(
            knex(this.tableName).where({stock_id}),
            {
                singleOnly: true
            }
        );
        return [error, data[0]];
    }
}