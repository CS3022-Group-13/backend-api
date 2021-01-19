
require("dotenv").config();

import {knexSnakeCaseMappers} from "objection";
import Knex, {Config} from "knex";
import {knex_error_resolver} from "./resolver";
import {MError} from "./merror";



/**
 * Knex Configuration Options
 * Postgresql
 * (knexSnakeCaseMapper <- Maps snake case to camel case)
 * ::: only for internal use
 */
const knex_config: Config = {
    client: "postgresql",
    connection: {
        host: process.env.PG_HOST,
        port: Number(process.env.PG_PORT) || 5432,
        database: process.env.PG_DB,
        user: process.env.PG_USER,
        password: process.env.PG_PASS
    },
    ...knexSnakeCaseMappers()
};

/**
 * Create Knex Client using 'knex_config'
 * ::: only for internal use
 */
export const knex = Knex(knex_config);

/**
 * DB Client for connect with database
 * contains
 *      knex connection
 *      resolver <- wrapper for error handling
 */
export const resolver = knex_error_resolver


/**
 * User Module
 */
import {UserDataModel} from "./user/user_data";
import {UserAccountModel} from "./user/user_account";
import {UserType} from "./user/user_type";

/**
 * Customer Module
 */
import {CustomerModel} from "./customer/customer";
import {CustomerAccountModel} from "./customer/customer_account";

/**
 * Raw Material Module
 */
import {MaterialModel} from "./material/material";
import {MaterialStockModel} from "./material/matrial_stock";

/**
 * Order Module
 */
import {OrderModel} from "./order/order";
import {InvoiceModel} from "./order/invoice";
import {OrderItemModel} from "./order/order_item";
import {OrderStatus} from "./order/order_status";
import {PaymentModel} from "./order/payments";

/**
 * Finished Product Module
 */
import {ProductModel} from "./product/product";
import {ProductStockModel} from "./product/product_stock";

/**
 * Database Models for external use
 * ERR   <- Enum that contains common errors returned by user
 * MODEL <- Model contains static functions which returns [MError, model]
 *          If there is no error, [MError.NO_ERROR, model] will return
 */
export const model = {
    ERR: MError,
    user: {
        user: UserDataModel,
        account: UserAccountModel,
        type: UserType
    },
    customer: {
        customer: CustomerModel,
        account: CustomerAccountModel
    },
    material: {
        material: MaterialModel,
        stock: MaterialStockModel
    },
    product: {
        product: ProductModel,
        stock: ProductStockModel
    },
    order: {
        order: OrderModel,
        invoice: InvoiceModel,
        item: OrderItemModel,
        status: OrderStatus,
        payment: PaymentModel
    }
};


