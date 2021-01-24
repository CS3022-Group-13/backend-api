import {resolver, knex} from "../index";
import {MError} from "../merror";
import {Customer, CustomerModel} from "./customer";
import {UserAccount} from "../user/user_account";


export interface CustomerAccount {
    customerId: string;
    username: string;
    password: string;
    status: boolean;
}

export class CustomerAccountModel {

    static tableName = 'customerAccount';
    
    /**
     * Find customer account record by customer id
     * @param customerId: UUID (string)
     */
    static async findBy_customerId(customerId: string): Promise<[MError, CustomerAccount]> {
        const [error, data] = await resolver<CustomerAccount[]>(
            knex(this.tableName).where({customerId}),
            {
                singleOnly: true
            }
        )
        return [error, data[0]]
    }

    /**
     * Find customer account by username
     * @param username : string
     */
    static async findBy_username(username: string): Promise<[MError, CustomerAccount]> {
        const [error, data] = await resolver<CustomerAccount[]>(
            knex(this.tableName).where({username}),
            {
                singleOnly: true
            }
        );
        return [error, data[0]];
    }


    static async updateBy_customerId(customerId: string, data: any): Promise<MError> {
        // Cleaning Query
        const fields = ["password", "status"]
        Object.keys(data).forEach((k) => {
            if (fields.includes(k))
                (data[k] === null || data[k] === undefined) && delete data[k];
            else
                delete data[k];
        });

        if (data == {}) {
            return MError.NO_ERROR
        }

        const [error] = await resolver(
            knex(this.tableName).update(data).where({customerId}),
            {allowUndefined: true}
        );
        return error;
    }

    /**
     * Create new customer account
     * @param customerData : customer data such as names
     * @param customerAccountData : details such as credentials
     */

    static async createAccount(customerData: Customer, customerAccountData: CustomerAccount): Promise<MError> {
        const [error] = await resolver<any>(
            knex.transaction(async (trx): Promise<any> => {
                    await CustomerModel.trx_createCustomerDataEntry(trx, customerData);
                    await trx(this.tableName).insert(customerAccountData);
                }
            ), {allowUndefined: true}
        );
        return error;
    }
}