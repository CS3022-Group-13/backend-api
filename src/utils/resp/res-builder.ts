import {Response} from "express";
import {StatusCode} from "./status-code";
import {ISE} from "./prebuilds";
import {ResponseData} from "./index";

export class ResponseBuilder {
    readonly status: StatusCode;
    readonly prebuild = {
        ISE: () => ISE(this)
    };

    private _res: Response;
    private readonly _data: ResponseData;

    constructor(res: Response) {
        this.status = new StatusCode(this, 500);
        this._data = { message: "Success" };
        this._res = res;
    }

    send(): void {
        this._res.status(this.status.code);
        this._res.json(this._data);
    };

    token(token: string): ResponseBuilder {
        this._data.token =  token;
        return this;
    }

    message(msg: string): ResponseBuilder {
        this._data.message = msg;
        return this;
    }

    data(data: any): ResponseBuilder {
        this._data.data = data;
        return this;
    }
}