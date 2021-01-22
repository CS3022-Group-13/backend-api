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
    
     static async createMaterialDataEntry(materialData: Material): Promise<any> {
        const [error] = await resolver<any>(
            knex(this.tableName).insert(materialData),
            {allowUndefined: true});
        return error;
    }

    static async deleteBy_materialID(materialID: string): Promise<any> {
        const error = await resolver<Material[]>(
            knex(this.tableName).where({materialID}).del(),
            {
                singleOnly: true
            }
        );
        return error;
    }

    static async updateMaterialDataEntry(materialId:string, materialData: Material): Promise<any> {
        const [error] = await resolver<any>(
            knex(this.tableName).where(materialId).update(materialData),
            {allowUndefined: true});
        return error;
    }


}

