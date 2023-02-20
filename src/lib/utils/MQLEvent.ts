/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Types } from "$lib/components/MediaQuery.types";
import type { MQLAny, MQLArray, MQLInline, MQLObject } from "./converter";
import { getType } from "./getType";

export enum MQLEventMethods {
    add = 'addEventListener',
    remove = 'removeEventListener'
}

export class MQLEvent {
    static inline(item:MQLInline, handler = () => {}, method:MQLEventMethods = MQLEventMethods.add) {
        (item && item[method]) && item[method]('change', handler)
    }
    static array(arr:MQLArray, handler = () => {},  method:MQLEventMethods = MQLEventMethods.add) {
        //@ts-ignore
        arr.flat(Infinity).forEach(item => autoMQLEvent(item, handler, method))
    }
    static object(obj:MQLObject, handler = () => {}, method:MQLEventMethods = MQLEventMethods.add) {
        for (const key in obj) {
            autoMQLEvent(obj[key], handler, method)
        }
    }
}

export function autoMQLEvent(mql:MQLAny, handler = () => {}, method:MQLEventMethods = MQLEventMethods.add) {
    const type = getType(mql)
    if (type === Types.mediaQueryList) return MQLEvent.inline(mql as MediaQueryList, handler, method)
    //@ts-ignore
    if(type === Types.array) return MQLEvent.array(mql, handler, method)
    //@ts-ignore
    if(type === Types.object) return MQLEvent.object(mql, handler, method)
}