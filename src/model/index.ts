
require("dotenv").config();

import {knexSnakeCaseMappers} from "objection";
import Knex, {Config} from "knex";
import {knex_error_resolver} from "./resolver";
import {MError} from "./merror";
import {UserModel} from "./user/user";
import {UserAccountModel} from "./user/userAccount";
import {UserType} from "./user/userType";


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
 * Database Models for external use
 * ERR   <- Enum that contains common errors returned by user
 * MODEL <- Model contains static functions which returns [MError, model]
 *          If there is no error, [MError.NO_ERROR, model] will return
 */
export const model = {
    ERR: MError,
    user: UserModel,
    userAccount: UserAccountModel,
    userType: UserType
};


export abstract class Model {
}

