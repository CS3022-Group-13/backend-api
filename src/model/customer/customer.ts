import {MError} from "../merror";
import {knex, Model, resolver} from "../index";
import {Transaction} from "knex";

export interface Customer{
    customerId: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

export class CustomerModel {

    static tableName = 'customer'

    /**
     * Find customer record by customer id
     * @param customerId: UUID (string)
     */
    static async findBy_customerId(customerId: string): Promise<[MError, Customer]> {
        const [error, data] = await resolver<Customer[]>(
            knex(this.tableName).where({customerId}),
            {
                singleOnly: true
            }
        )
        return [error, data[0]]
    }

    /**
     * Add Customer Data Entry :: Support Transactions
     * @param trx : knex transaction object
     * @param customerData
     */
    static async trx_createCustomerDataEntry(trx: Transaction, customerData: Customer): Promise<any> {
        return trx(this.tableName).insert(customerData);
    }
}