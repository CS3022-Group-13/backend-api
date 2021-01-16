import {MError} from "../merror";
import {knex, Model, resolver} from "../index";
import {Transaction} from "knex";

export interface RawMaterial {
    materil_id: string;
    material_name: string;
    quantity: BigInteger;
    unit_price: BigInteger;
}

export class RawMaterialModel {

    static tableName = 'raw_material'

    /**
     * Find raw_material by material id
     * @param material_id: UUID (string)
     */
    static async findBy_materialId(materialId: string): Promise<[MError, User]> {
        const [error, data] = await resolver<RawMaterial[]>(
            knex(this.tableName).where({materialId}),
            {
                singleOnly: true
            }
        )
        return [error, data[0]]
    }

    /**
     * Add User Data Entry :: Support Transactions
     * @param trx : knex transaction object
     * @param rawMaterilaData
     */
    static async trx_createUserDataEntry(trx: Transaction, rawMaterialData: RawMaterial): Promise<any> {
        return trx(this.tableName).insert(rawMaterialData);
    }
}