import {MError} from "../merror";
import {knex, resolver} from "../index";

export interface Payment {
    paymentId: string
    customerId: string
    invoiceId: string
    amount: number
}

export class PaymentModel {

    static tableName = 'payment'

    static async findBy_paymentId(paymentId: string): Promise<[MError, Payment]> {
        const [error, data] = await resolver<Payment[]>(
            knex(this.tableName).where({paymentId}),
            {
                singleOnly: true
            }
        )
        return [error, data[0]]
    }
}