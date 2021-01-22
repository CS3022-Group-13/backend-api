import {knex, resolver} from "../index";
import {MError} from "../merror";
import {UserData, UserDataModel} from "./user_data";

export interface UserAccount {
    userId: string
    username: string
    password: string
    verified: boolean
}


export class UserAccountModel {

    static tableName = "userAccount";

    /**
     * Find user account by username
     * @param username : string
     */
    static async findBy_username(username: string): Promise<[MError, UserAccount]> {
        const [error, data] = await resolver<UserAccount[]>(
            knex(this.tableName).where({username}),
            {
                singleOnly: true
            }
        );
        return [error, data[0]];
    }

    static async findBy_userId(userId: string): Promise<[MError, UserAccount]> {
        const [error, data] = await resolver<UserAccount[]>(
            knex(this.tableName).where({userId}),
            {
                singleOnly: true
            }
        );
        return [error, data[0]];
    }

    static async updateBy_userId(userId: string, data: any): Promise<MError> {
        // Cleaning Query
        const fields = ["password", "verified"]
        Object.keys(data).forEach((k) => {
            if (fields.includes(k))
                (data[k] === null || data[k] === undefined) && delete data[k];
            else
                delete data[k];
        });

        if (data == {}) {
            return MError.NO_ERROR
        }

        const [error] = await resolver<UserAccount[]>(
            knex(this.tableName).update(data).where({userId}),
            {allowUndefined: true}
        );
        return error;
    }

    /**
     * Create new user account
     * @param userData : user data such as names
     * @param accountData : details such as credentials
     */
    static async createAccount_local(userData: UserData, accountData: UserAccount): Promise<MError> {
        const [error] = await resolver<any>(
            knex.transaction(async (trx): Promise<any> => {
                    await UserDataModel.trx_createUserDataEntry(trx, userData);
                    await trx(this.tableName).insert(accountData);
                }
            ), {allowUndefined: true}
        );
        return error;
    }
}