export type Query = string
export type QueryArray = Query[]
export type QueryAny = Query | QueryArray

export type Matches = boolean
export type MatchesArray = Matches[]
export type MatchesAny = Matches | MatchesArray

export type MatchesType<T> =
    T extends Query ? Matches : QueryArray