export enum Types {
    string = 'string',
    array = 'array',
    object = 'object'
}

export interface ObjectType<T> {
    [index:string]:T
}

export type Query = string
export type QueryArray = QueryAny[]
export type QueryObject = ObjectType<QueryAny>
export type QueryAny = Query | QueryArray | QueryObject

export type Matches = boolean
export type MatchesArray = MatchesAny[]
export type MatchesObject = ObjectType<MatchesAny>
export type MatchesAny = Matches | MatchesArray | MatchesObject

export type MatchesType<T> =
    T extends Query ? Matches : QueryArray