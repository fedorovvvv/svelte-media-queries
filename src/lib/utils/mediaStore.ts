import { writable, type Writable } from "svelte/store"
import type { Matches, MatchesArray, Query, QueryAny, QueryArray } from "../components/MediaQuery.types"
import { autoCalc } from "./calc"
import { autoMQL, type MQLArray } from "./converter"

export type Destroy = () => void

export interface MediaStore<T = Matches> {
    subscribe:Writable<T>['subscribe']
    destroy: Destroy
}

export function mediaStore(query:Query):MediaStore
export function mediaStore(query:QueryArray):MediaStore<MatchesArray>

export function mediaStore(query:QueryAny) {
    if (typeof window === "undefined") return writable();
    const {subscribe, set} = writable()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const mql = autoMQL(query)
    const handleChange = () => set(autoCalc(mql))
    handleChange()
    if (typeof query === 'string') {
        mql.addEventListener('change', handleChange)
        return {
            subscribe,
            destroy() {
                mql.removeEventListener('change', handleChange)
            }
        }
    }
    if (Array.isArray(query)) {
        const toggleEvent = (mqls:MQLArray = [], method = 'addEventListener') => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            mqls.flat(Infinity).forEach(mql => mql[method]('change', handleChange))
        }

        toggleEvent(mql)

        return {
            subscribe,
            destroy() {
                toggleEvent(mql, 'removeEventListener')
            }
        }
    }
}