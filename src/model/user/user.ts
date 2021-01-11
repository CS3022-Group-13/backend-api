import {MError} from "../merror";
import {knex, Model, resolver} from "../index";
import {Transaction} from "knex";

export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    userType: string;
}

export class UserModel {

    static tableName = 'user'

    /**
     * Find user record by user id
     * @param userId: UUID (string)
     */
    static async findBy_userId(userId: string): Promise<[MError, User]> {
        const [error, data] = await resolver<User[]>(
            knex(this.tableName).where({userId}),
            {
                singleOnly: true
            }
        )
        return [error, data[0]]
    }

    /**
     * Add User Data Entry :: Support Transactions
     * @param trx : knex transaction object
     * @param userData
     */
    static async trx_createUserDataEntry(trx: Transaction, userData: User): Promise<any> {
        return trx(this.tableName).insert(userData);
    }
}