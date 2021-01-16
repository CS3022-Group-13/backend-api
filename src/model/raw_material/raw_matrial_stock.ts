import {resolver, knex} from "../index";
import {MError} from "../merror";
import {RawMaterial, RawMaterialModel} from "./raw_material";

export interface RawMaterialStock {
    id: string
    material_id: string
    quantity: number
    unit_price: number
    date: Date
}


export class RawMaterialStockModel {

    static tableName = "raw_materil_stock";

    /**
     * Find stock by id
     * @param id : string
     */
    static async findBy_id(id: string): Promise<[MError, UserAccount]> {
        const [error, data] = await resolver<RawMaterialStock[]>(
            knex(this.tableName).where({id}),
            {
                singleOnly: true
            }
        );
        return [error, data[0]];
    }

    /**
     * Create new user account
     * @param rawMaterialData : details of raw material
     * @param stockdata 
     */
    static async createStock_local(rawMaterialData: RawMaterial, stockdata: RawMaterialStock): Promise<MError> {
        const [error] = await resolver<any>(
            knex.transaction(async (trx): Promise<any> => {
                    await RawMaterialModel.trx_createUserDataEntry(trx, rawMaterialData)
                    await trx(this.tableName).insert(stockdata);
                }
            ), {allowUndefined: true}
        );
        return error;
    }
}