import {MError} from "../merror";
import {knex, resolver} from "../index";
import { Transaction } from "knex";

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

    static async trx_createInvoiceDataEntry(trx: Transaction, invoiceData: Invoice): Promise<any> {
        return trx(this.tableName).insert(invoiceData);
    }
}