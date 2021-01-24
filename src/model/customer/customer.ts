import {MError} from "../merror";
import {knex, resolver} from "../index";
import {Transaction} from "knex";
import {UserData} from "../user/user_data";

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

    static async getCustomerBy_query(query: any): Promise<[MError, UserData]> {
        // Cleaning Query
        const fields = ["customerId", "email", "status"]
        Object.keys(query).forEach((k) => {
            if (fields.includes(k))
                (query[k] === null || query[k] === undefined) && delete query[k];
            else
                delete query[k];
        });

        if (query.customerId) {
            query["customer.customerId"] = query.customerId
            delete query.customerId
        }

        const [error, data] = await resolver(
            knex(this.tableName).join("customerAccount",
                "customer.customerId", "=", "customerAccount.customerId"
            ).select(
                "customer.*",
                "customerAccount.status"
            ).where(query)
        )
        return [error, data as UserData]
    }

    static async getCustomersCountBy_query(query: any): Promise<[MError, UserData]> {
        // Cleaning Query
        const fields = ["status"];
        Object.keys(query).forEach((k) => {
            if (fields.includes(k))
                (query[k] === null || query[k] === undefined) && delete query[k];
            else
                delete query[k];
        });

        if (query.customerId) {
            query["customer.customerId"] = query.customerId
            delete query.customerId
        }

        const [error, data] = await resolver(
            knex(this.tableName).join("customerAccount",
                "customer.customerId", "=", "customerAccount.customerId"
            ).count(
                "customer.*",
                "customerAccount.status"
            ).where(query)
        )
        return [error, data as UserData]
    }





    static async updateBy_customerId(customerId: string, customerData: any): Promise<MError> {
        const [error] = await resolver(
            knex(this.tableName).update(customerData).where({customerId}),
            {allowUndefined: true}
        )
        return error
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
