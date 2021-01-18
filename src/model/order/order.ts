import {MError} from "../merror";
import {knex, resolver} from "../index";

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
}