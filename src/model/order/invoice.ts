import {MError} from "../merror";
import {knex, resolver} from "../index";

export interface Invoice {
    invoiceId: string
    orderId: string
    invoiceDate: string
    invoiceTotal: string
}

export class InvoiceModel {

    static tableName = 'invoice'

    static async findBy_invoiceId(invoiceId: string): Promise<[MError, Invoice]> {
        const [error, data] = await resolver<Invoice[]>(
            knex(this.tableName).where({invoiceId}),
            {
                singleOnly: true
            }
        )
        return [error, data[0]]
    }
}