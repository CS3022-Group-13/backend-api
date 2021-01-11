import {Handler} from "../types";
import {Rule} from "./index";

export class Inspector {
    private readonly rules: Rule[];
    private readonly defaultError: string;

    constructor(rules: Rule[], defaultError: string) {
        this.rules = rules;
        this.defaultError = defaultError;
    }

    mw: Handler = (req, res, next) => {
        // Set response status to BAD REQUEST
        const r = res.r

        for (const rule of this.rules) {
            // Set response message as ERROR MSG
            r.message(rule.error || this.defaultError);

            // Select Source from request
            const source = (rule.source === "root") ? req : req[rule.source];
            if (!source) {  // if selected source is undefined
                r.status.BAD_REQ();
                r.message(rule.error || this.defaultError)
                    .send();
                return;
            }

            // Select Target
            const target = source[rule.target];
            if (rule.required) {
                if (!target) {  // if selected target is undefined
                    r.status.BAD_REQ();
                    r.message(rule.error || this.defaultError)
                        .send();
                    return;
                }
            } else {
                next();
            }

            // Validation
            if (!rule.checker(target)) {
                // Validation failed
                r.status.BAD_REQ();
                r.message(rule.error || this.defaultError)
                    .send();
                return;
            }
        };

        // Validation passed set back response
        r.status.OK()
            .message("Success");

        next();
    };
}
