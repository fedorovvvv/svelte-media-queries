import type { Query, QueryAny, QueryArray } from "../components/MediaQuery.types"

export type MQLInline = MediaQueryList
export type MQLArray = MediaQueryList[]
export type MQLAny = MQLInline | MQLArray

export class MQL {

    static get(query:Query) {return window.matchMedia(query)}

    static inline(query:Query):MQLInline {return MQL.get(query)}

    static array(queries:QueryArray):MQLArray {return queries.map(query => MQL.get(query))}
}

export function autoMQL(query:Query):MQLInline
export function autoMQL(query:QueryArray):MQLArray

export function autoMQL(query:QueryAny) {
    if (typeof query === 'string') return MQL.inline(query)
    if (Array.isArray(query)) return MQL.array(query)
}