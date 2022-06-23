import { writable, type Writable } from "svelte/store"
import type { Matches, MatchesArray, Query, QueryAny, QueryArray } from "../components/MediaQuery.types"
import { autoCalc } from "./calc"
import { autoMQL } from "./converter"
import { autoMQLEvent, MQLEventMethods } from "./MQLEvent"

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
    autoMQLEvent(mql, handleChange)
    return {
        subscribe,
        destroy() {
            autoMQLEvent(mql, handleChange, MQLEventMethods.remove)
        }
    }
}