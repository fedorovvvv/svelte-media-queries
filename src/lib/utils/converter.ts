import type { Query, QueryAny, QueryArray } from "../components/MediaQuery.types"

export type MQLInline = MediaQueryList
export type MQLArray = MQLAny[]
export type MQLAny = MQLInline | MQLArray

export class MQL {

    static get(query:Query) {return window.matchMedia(query)}

    static inline(query:Query):MQLInline {return MQL.get(query)}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    static array(queries:QueryArray):MQLArray {return queries.map(query => autoMQL(query))} //recursion :(
}

export function autoMQL(query:Query):MQLInline
export function autoMQL(query:QueryArray):MQLArray

export function autoMQL(query:QueryAny) {
    if (typeof query === 'string') return MQL.inline(query)
    if (Array.isArray(query)) return MQL.array(query)
}