/* eslint-disable @typescript-eslint/no-empty-function */
import { writable, type Writable } from "svelte/store"
import type { Matches, QueryAny } from "../components/MediaQuery.types"
import { autoCalc } from "./calc"
import { autoMQL } from "./converter"
import { autoMQLEvent, MQLEventMethods } from "./MQLEvent"

export type Destroy = () => void

type ConvertQueryAny<T extends QueryAny> = T extends string ? boolean : T

export interface MediaStore<T = Matches> {
    subscribe:Writable<T | undefined>['subscribe']
    destroy: Destroy
}

export function createMediaStore<T extends QueryAny>(query:T):MediaStore<ConvertQueryAny<T>> {
    if (typeof window === "undefined") return {...writable(undefined), destroy: () => {}};
    const {subscribe, set} = writable<ConvertQueryAny<T> | undefined>(undefined)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const mql = autoMQL(query)
    const handleChange = () => set(autoCalc(mql) as ConvertQueryAny<T>)
    handleChange()
    autoMQLEvent(mql, handleChange)
    return {
        subscribe,
        destroy() {
            autoMQLEvent(mql, handleChange, MQLEventMethods.remove)
        }
    }
}