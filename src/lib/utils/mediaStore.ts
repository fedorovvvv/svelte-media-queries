import { writable, type Writable } from "svelte/store"
import type { Matches, MatchesArray, Query, QueryAny, QueryArray } from "../components/MediaQuery.types"
import { autoCalc } from "./calc"
import { MQL } from "./converter"

export type Destroy = () => void

export interface MediaStore<T = Matches> {
    subscribe:Writable<T>['subscribe']
    destroy: Destroy
}

export function mediaStore(query:Query):MediaStore
export function mediaStore(query:QueryArray):MediaStore<MatchesArray>

export function mediaStore(query:QueryAny) {
    if (typeof window === "undefined") return writable();
    if (typeof query === 'string') {
        const {subscribe, set} = writable<Matches>()
        const mql = MQL.inline(query)
        const handleChange = () => set(autoCalc(mql))

        handleChange()
        mql.addEventListener('change', handleChange)

        return {
            subscribe,
            destroy() {
                mql.removeEventListener('change', handleChange)
            }
        }
    }
    if (Array.isArray(query)) {
        const {subscribe, set} = writable<MatchesArray>()
        const mql = MQL.array(query)
        const handleChange = () => set(autoCalc(mql))

        handleChange()
        mql.map(mq => mq.addEventListener('change', handleChange))

        return {
            subscribe,
            destroy() {
                mql.map(mq => mq.removeEventListener('change', handleChange))
            }
        }
    }
}