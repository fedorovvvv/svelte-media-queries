/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Types, type ObjectType, type Query, type QueryAny, type QueryArray, type QueryObject } from "../components/MediaQuery.types"
import { getType } from "./getType"

export type MQLInline = MediaQueryList
export type MQLArray = MQLAny[]
export type MQLObject = ObjectType<MQLAny>
export type MQLAny = MQLInline | MQLArray | MQLObject

export class MQL {
    static get(query:Query) {return window.matchMedia(query)}

    static inline(query:Query):MQLInline {return MQL.get(query)}
    //@ts-ignore
    static array(queries:QueryArray):MQLArray {return queries.map(query => autoMQL(query))} //recursion :(

    static object(query:QueryObject) {
        const res:MQLObject = {}
        for (const key in query) {
            //@ts-ignore
            res[key] = autoMQL(query[key]);
        }
        return res
    }
}

export function autoMQL(query:Query):MQLInline
export function autoMQL(query:QueryArray):MQLArray

export function autoMQL(query:QueryAny) {
    const type = getType(query)
    //@ts-ignore
    if (type === Types.string) return MQL.inline(query)
    //@ts-ignore
    if (type === Types.array) return MQL.array(query)
    //@ts-ignore
    if (type === Types.object) return MQL.object(query)
}