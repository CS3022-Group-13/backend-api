import {QueryBuilder} from "knex";
import {MError} from "./merror";
import {Transaction} from "knex";

interface ResolverOption {
    singleOnly?: boolean,
    allowUndefined?: boolean
}

type Query = Promise<Transaction> | QueryBuilder<any, any>
export async function knex_error_resolver<T>(qb: Query, options: ResolverOption = {}): Promise<[MError, T]> {
    try {
        const data: T = await qb
        if (!options.allowUndefined && !data) {
            return [MError.NOT_FOUND, data];
        }
        if (options.singleOnly && (data as unknown as Array<any>).length === 0) {
            return [MError.NOT_FOUND, data];
        }
        return [MError.NO_ERROR, data];
    } catch (e) {
        switch (e.code) {
            case 'ECONNREFUSED':
                console.log("[ERROR][DB]: Couldn't connect to database.")
                return [MError.DB_CONNECTION, {} as T];
            case "23505":
                console.log("[ERROR][DB]: Duplicate database entry.")
                return [MError.DUPLICATE_ENTRY, {} as T];
            case "23503":
                console.log(e)
                console.log("[ERROR][DB]: Violate Foreign Key Constrain")
                return [MError.FOREIGN_KEY, {} as T];
            default:
                console.log(e)
                console.log("[ERROR][DB]: Unknown Error -> ", e.code);
                return [MError.UNKNOWN, {} as T];
        }
    }
}

