import {MError} from "../merror";
import {knex, resolver} from "../index";
import { OrderItem, OrderItemModel } from './order_item';
import { Invoice, InvoiceModel } from './invoice';
import { ProductModel } from "../product/product";

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


    static async createOrderDataEntry(orderData: Order, orderItemsData: Array<OrderItem>, invoiceData: Invoice ): Promise<MError> {
        const [error] = await resolver<any>(
            knex.transaction(async (trx): Promise<any> => {
                    await trx(this.tableName).insert(orderData);
                    await OrderItemModel.trx_createOrderItemDataEntries(trx, orderItemsData);
                    await InvoiceModel.trx_createInvoiceDataEntry(trx, invoiceData);

                    for(let item of orderItemsData){
                        const [error, product] = await ProductModel.findBy_productID(item.productId);
                        await ProductModel.reduceProductQuantity(trx, product, item.quantity);      
                    }
                }
            ), {allowUndefined: true}
        );
        return error;
    }
}