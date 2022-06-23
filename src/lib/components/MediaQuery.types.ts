export type Query = string
export type QueryArray = QueryAny[]
export type QueryAny = Query | QueryArray

export type Matches = boolean
export type MatchesArray = MatchesAny[]
export type MatchesAny = Matches | MatchesArray

export type MatchesType<T> =
    T extends Query ? Matches : QueryArray