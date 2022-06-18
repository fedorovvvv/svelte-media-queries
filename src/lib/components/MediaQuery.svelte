<script context='module' lang='ts'>
    export type Query = string
    export type QueryAny = Query | Query[]

    export type Matches = boolean
    export type MatchesArray = Matches[]
    export type MatchesAny = Matches | MatchesArray
    
</script>

<script lang='ts'>
    import { onMount } from "svelte";

    export let query:QueryAny
    export let matches:MatchesAny = false
    export let matchesArray:MatchesArray = [false]

    let mounted = false

    const getMatches = (query:Query) => window.matchMedia(query).matches ?? false

    const checkMatches = (query:QueryAny) => {
        if (mounted) {
            if (typeof query === 'string') {
                return matches = getMatches(query)
            }
        }
    }
    onMount(() => {
        mounted = true
        checkMatches(query)
    })
    $:checkMatches(query)
</script>

<svelte:window on:resize={() => checkMatches(query)}/>
<slot {matches}/>
