import {ResponseBuilder} from "./res-builder";

export const ISE = (rb: ResponseBuilder): ResponseBuilder => {
    rb
        .status.ERROR()
        .message("Internal Server Error")
    return rb
}