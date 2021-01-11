import vali from "validator";
import {CheckerType} from "./index";

export const CHECK = {
    length(min?: number, max?: number): CheckerType {
        const options = {min, max}
        return (value) => vali.isLength(value, options);
    },
    email(options?: vali.IsEmailOptions): CheckerType {
        return (value) => vali.isEmail(value, options)
    },
    empty(ignoreWSp: boolean = false): CheckerType {
        const options = {ignore_whitespace: ignoreWSp}
        return (value) => vali.isEmpty(value, options)
    },
    password(options?: vali.strongPasswordOptions): CheckerType {
        return (value) => vali.isStrongPassword(value, options)
    },
    jwt(): CheckerType {
        return (value) => vali.isJWT(value)
    },
    number(noSymbols?: boolean): CheckerType {
        const options = {no_symbols: noSymbols}
        return (value) => vali.isNumeric(value, options)
    },
    telephone(): CheckerType {
        return (value) => vali.isMobilePhone(value, "sl-SI")
    }
}