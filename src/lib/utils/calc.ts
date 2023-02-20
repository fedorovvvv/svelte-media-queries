/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Types, type Matches, type MatchesArray, type MatchesObject } from "../components/MediaQuery.types";
import type {MQLAny, MQLArray, MQLInline, MQLObject } from "./converter";
import { getType } from "./getType";

export class Calc {
    static get(mql:MQLInline):Matches {return mql.media ? mql.matches : false}

    static inline(mql:MQLInline):Matches {return Calc.get(mql)}
    //@ts-ignore
    static array(mql:MQLArray):MatchesArray {return mql.map(mql => autoCalc(mql))}//recursion :(

    static object(mql:MQLObject) {
        const res:MatchesObject = {}
        for (const key in mql) {
            //@ts-ignore
            res[key] = autoCalc(mql[key]);
        }
        return res
    }
}

export function autoCalc(mql:MQLInline):Matches
export function autoCalc(mql:MQLArray):MatchesArray

export function autoCalc(mql:MQLAny) {
    const type = getType(mql)
    if(type === Types.mediaQueryList) return Calc.inline(mql as MediaQueryList)
    //@ts-ignore
    if(type === Types.array) return Calc.array(mql)
    //@ts-ignore
    if(type === Types.object) return Calc.object(mql)
}