import {MError} from "../merror";
import {knex, resolver} from "../index";
import {Product} from "../product/product";

export interface Payment {
    paymentId: string
    customerId: string
    invoiceId: string
    amount: number
}

export class PaymentModel {

    static tableName = "payment";

    static async findBy_paymentId(paymentId: string): Promise<[MError, Payment]> {
        const [error, data] = await resolver<Payment[]>(
            knex(this.tableName).where({paymentId}),
            {
                singleOnly: true
            }
        );
        return [error, data[0]];
    }

    static async findBy_query(query: any): Promise<[MError, Payment[]]> {

        const fields = ["paymentId", "customerId", "invoiceId"]
        Object.keys(query).forEach((k) => {
            if (fields.includes(k))
                (query[k] === null || query[k] === undefined) && delete query[k];
            else
                delete query[k];
        });

        const [error, data] = await resolver<any>(
            knex(this.tableName).where(query)
        )
        return [error, data]
    }

    static async deleteBy_paymentId(paymentId: string): Promise<MError> {
        const [error] = await resolver<Payment[]>(
            knex(this.tableName).where({paymentId}).del(),
            {
                allowUndefined: true
            }
        );
        return error
    }

    static async addPayment(data: Payment): Promise<MError> {
        const [error] = await resolver<Payment[]>(
            knex(this.tableName).insert(data),
            {
                allowUndefined: true
            }
        );
        return error;
    }
}