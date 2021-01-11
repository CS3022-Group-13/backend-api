import {InspectorBuildConfig, InspectorRuleConfig, Rule, RuleConfigureType, SourceType} from "./index";
import {EHandler} from "../types";
import {Inspector} from "./inspector";

export const InspectorBuilder = (rules: Rule[], error?: string) => {
    const inspector = new Inspector(
        rules,
        error || "Invalid model"
    );
    return inspector.mw as EHandler;
};

export const CRule = (target: string): RuleConfigureType => {
    return (checker, options?): Rule => {
        return {
            source: "root",
            target: target,
            checker: checker,
            error: options?.error,
            required: options?.required
        }
    }
}

export const BRule = (target: string): RuleConfigureType => {
    return (checker, options?): Rule => {
        return {
            source: "body",
            target: target,
            checker: checker,
            error: options?.error,
            required: options?.required
        }
    }
}


export const QRule = (target: string): RuleConfigureType => {
    return (checker, options?): Rule => {
        return {
            source: "query",
            target: target,
            checker: checker,
            error: options?.error,
            required: options?.required
        }
    }
}


export const PRule = (target: string): RuleConfigureType => {
    return (checker, options?): Rule => {
        return {
            source: "params",
            target: target,
            checker: checker,
            error: options?.error,
            required: options?.required
        }
    }
}

export const HRule = (target: string): RuleConfigureType => {
    return (checker, options?): Rule => {
        return {
            source: "headers",
            target: target,
            checker: checker,
            error: options?.error,
            required: options?.required
        }
    }
}

