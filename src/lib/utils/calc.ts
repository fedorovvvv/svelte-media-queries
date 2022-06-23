import type { Matches, MatchesArray } from "../components/MediaQuery.types";
import type {MQLAny, MQLArray, MQLInline } from "./converter";

export class Calc {
    static get(mql:MQLInline):Matches {return mql.media ? mql.matches : false}

    static inline(mql:MQLInline):Matches {return Calc.get(mql)}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    static array(mql:MQLArray):MatchesArray {return mql.map(mql => autoCalc(mql))}//recursion :(
}

export function autoCalc(mql:MQLInline):Matches
export function autoCalc(mql:MQLArray):MatchesArray

export function autoCalc(mql:MQLAny) {
    if(mql instanceof MediaQueryList) return Calc.inline(mql)
    if(Array.isArray(mql)) return Calc.array(mql)
}