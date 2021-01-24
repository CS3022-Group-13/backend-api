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

    static async updateBy_userId(userId: string, userData: any): Promise<MError> {
        const [error] = await resolver(
            knex(this.tableName).update(userData).where({userId}),
            {allowUndefined: true}
        )
        return error
    }

    static async getUserBy_query(query: any): Promise<[MError, UserData]> {
        // Cleaning Query
        const fields = ["email", "verified"]
        Object.keys(query).forEach((k) => {
            if (fields.includes(k))
                (query[k] === null || query[k] === undefined) && delete query[k];
            else
                delete query[k];
        });

        const [error, data] = await resolver(
            knex(this.tableName).join("userAccount",
                "userData.userId", "=", "userAccount.userId"
            ).select(
                "userData.*",
                "userAccount.verified"
            ).where(query)
        )
        return [error, data as UserData]
    }

    static async getUsersCountBy_query(query: any): Promise<[MError, number]> {
        // Cleaning Query
        const fields = ["verified", "userType"]
        Object.keys(query).forEach((k) => {
            if (fields.includes(k))
                (query[k] === null || query[k] === undefined) && delete query[k];
            else
                delete query[k];
        });
       
        const [error, data] = await resolver(
            knex(this.tableName).join("userAccount",
                "userData.userId", "=", "userAccount.userId"
            ).count(
                "userData.*",
                "userAccount.verified"
            ).where(query)
        )
        return [error, data as number];
    }

    static async getUserDetails(userId: string): Promise<[MError, UserData]> {
        const [error, data] = await resolver(
            knex(this.tableName).join("userAccount",
                "userData.userId", "=", "userAccount.userId"
            ).select(
                "userData.*",
                "userAccount.verified",
                "userAccount.username",
            ).where({"userAccount.userId": userId}),
            {singleOnly: true}
        )
        return [error, data as UserData]
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