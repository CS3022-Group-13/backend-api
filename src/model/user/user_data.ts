import {MError} from "../merror";
import {knex, resolver} from "../index";
import {Transaction} from "knex";

export interface UserData {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    userType: string;
}

export class UserDataModel {

    static tableName = 'userData'

    /**
     * Find user record by user id
     * @param userId: UUID (string)
     */
    static async findBy_userId(userId: string): Promise<[MError, UserData]> {
        const [error, data] = await resolver<UserData[]>(
            knex(this.tableName).where({userId}),
            {
                singleOnly: true
            }
        )
        return [error, data[0]]
    }

    /**
     * Add User_data Data Entry :: Support Transactions
     * @param trx : knex transaction object
     * @param userData
     */
    static async trx_createUserDataEntry(trx: Transaction, userData: UserData): Promise<any> {
        return trx(this.tableName).insert(userData);
    }
}