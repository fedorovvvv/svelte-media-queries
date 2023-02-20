/* eslint-disable @typescript-eslint/ban-ts-comment */
export enum Types {
    string = 'string',
    array = 'array',
    object = 'object',
    mediaQueryList = 'mediaQueryList'
}

export interface ObjectType<T> {
    [index:string]:T
}

export type Query = string
export type QueryArray = QueryAny[]
export type QueryObject = ObjectType<QueryAny>
export type QueryAny = Query | QueryArray | QueryObject

export type Matches<T = boolean> = T
//@ts-ignore
export type MatchesArray<T = MatchesAny[]> = T
export type MatchesObject<T = ObjectType<MatchesAny>> = T
//@ts-ignore
export type MatchesAny = Matches | MatchesArray | MatchesObject

export type MatchesType<T> =
    T extends Query ? Matches :
    T extends QueryObject ? MatchesObject : QueryArray