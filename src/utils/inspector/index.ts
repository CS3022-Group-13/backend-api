
// Type Declarations
export type SourceType = "root" | "body" | "query" | "params" | "headers"
export type CheckerType = (val: string ) => boolean

export interface Rule {
    source: SourceType
    target: string
    checker: CheckerType
    error?: string
    required?: boolean
}

export interface InspectorBuildConfig {
    defaultError?: string,
    rules: Rule[]
}

export interface InspectorRuleConfig {
    checker: CheckerType,
    error?: string
}

interface RuleOptions {
    error?: string
    required?: boolean
}


export type RuleConfigureType = (checker: CheckerType, options: RuleOptions) => Rule

// Functional Exports
export {CRule, BRule, PRule, QRule, HRule, InspectorBuilder} from "./builder";
export {CHECK} from "./checkers";