import {Handler} from "express";
import {ResponseBuilder} from "./res-builder";
import {Response} from "../types";


export interface ResponseData {
    data?: any,
    token?: string,
    message: string
}

export const rBuilder: Handler = (req, res, next) => {
    (res as Response).r = new ResponseBuilder(res);
    next()
};