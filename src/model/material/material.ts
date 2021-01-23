import {MError} from "../merror";
import {knex, resolver} from "../index";

export interface Material {
    materialId: string;
    materialName: string;
    quantity: number;
    unitPrice: number;
}

export class MaterialModel {

    static tableName = 'material'

    /**
     * Find material by material id
     * @param materialId: UUID (string)
     */
    static async findBy_materialId(materialId: string): Promise<[MError, Material]> {
        const [error, data] = await resolver<Material[]>(
            knex(this.tableName).where({materialId}),
            {
                singleOnly: true
            }
        )
        return [error, data[0]]
    }

    static async findBy_query(query: any): Promise<[MError, Material[]]> {

        const fields = ["materialId", "materialName"]
        Object.keys(query).forEach((k) => {
            if (fields.includes(k))
                (query[k] === null || query[k] === undefined) && delete query[k];
            else
                delete query[k];
        });

        const [error, data] = await resolver<Material[]>(
            knex(this.tableName).where(query)
        )
        return [error, data]
    }


    static async addMaterial(materialData: Material): Promise<MError> {
        const [error] = await resolver<any>(
            knex(this.tableName).insert(materialData),
            {allowUndefined: true});
        return error;
    }

    static async deleteBy_materialId(materialId: string): Promise<MError> {
        const [error] = await resolver<any>(
            knex.transaction(async (trx): Promise<any> => {
                await trx("materialStock").where({materialId}).del()
                await trx(this.tableName).where({materialId}).del()
            })
        );
        return error;
    }

    static async updateBy_materialId(materialId:string, materialData: any): Promise<MError> {
        const [error] = await resolver<any>(
            knex(this.tableName).where({materialId}).update(materialData),
            {allowUndefined: true});
        return error;
    }
}