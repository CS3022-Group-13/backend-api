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
}