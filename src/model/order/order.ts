import {MError} from "../merror";
import {knex, resolver} from "../index";
import { OrderItem, OrderItemModel } from './order_item';
import { Invoice, InvoiceModel } from './invoice';
import {UserData} from "../user/user_data";


export interface Order {
    orderId: string
    customerId: string
    orderStatus: string
    orderDate: string
}

export class OrderModel {

    static tableName = 'order'

    static async findBy_orderId(orderId: string): Promise<[MError, Order]> {
        const [error, data] = await resolver<Order[]>(
            knex(this.tableName).where({orderId}),
            {
                singleOnly: true
            }
        )
        return [error, data[0]]
    }

    static async getOrderBy_query(query: any): Promise<[MError, Order[]]> {

        // Cleaning Query
        const fields = ["orderId", "customerId", "orderStatus", "orderDate"]
        Object.keys(query).forEach((k) => {
            if (fields.includes(k))
                (query[k] === null || query[k] === undefined) && delete query[k];
            else
                delete query[k];
        });

        const [error, data] = await resolver<Order[]>(
            knex(this.tableName).where(query)
        )
        return [error, data]
    }

    static async updateBy_orderId(orderId: string, orderStatus: string): Promise<MError> {
        const [error] = await resolver(
            knex(this.tableName).update({orderStatus}).where({orderId}),
            { allowUndefined: true }
        )
        return error
    }

    static async createOrderDataEntry(orderData: Order, orderItemsData: Array<OrderItem>, invoiceData: Invoice ): Promise<MError> {
        const [error] = await resolver<any>(
            knex.transaction(async (trx): Promise<any> => {
                    await trx(this.tableName).insert(orderData);
                    await OrderItemModel.trx_createOrderItemDataEntries(trx, orderItemsData);
                    await InvoiceModel.trx_createInvoiceDataEntry(trx, invoiceData);

                    for(let item of orderItemsData){
                        await trx.raw(`CALL reduce_product_quantity('${item.productId}', ${item.quantity});`);
                    }
                }
            ), {allowUndefined: true}
        );
        return error;
    }
}