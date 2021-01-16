import {resolver, knex} from "../index";
import {MError} from "../merror";
import {Customer, CustomerModel} from "./customer";

export interface CustomerAccount{
    customerId: string;
    username: string;
    password: string;
    verified: boolean;
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
     * Create new customer account
     * @param customerData : customer data such as names
     * @param customerAccountData : details such as credentials
     */

    static async createAccount_local(customerData: Customer, customerAccountData: CustomerAccount): Promise<MError> {
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