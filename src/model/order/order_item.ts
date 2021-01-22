import {MError} from "../merror";
import {knex, resolver} from "../index";
import { Transaction } from "knex";

export interface OrderItem {
    orderId: string
    productId: string
    quantity: number
    unitPrice: number
}

export class OrderItemModel {

    static tableName = 'orderItem'

    static async findBy_orderIdAndProductId(orderId: string, productId: string): Promise<[MError, OrderItem]> {
        const [error, data] = await resolver<OrderItem[]>(
            knex(this.tableName).where({orderId, productId}),
            {
                singleOnly: true
            }
        )
        return [error, data[0]]
    }

    /**
     * Add Order Item Data Entries :: Support Transactions
     * @param trx : knex transaction object
     * @param orderItemsData
     */
    static async trx_createOrderItemDataEntries(trx: Transaction, orderItemsData: Array<OrderItem>): Promise<any> {
        return trx(this.tableName).insert(orderItemsData);
    }
}