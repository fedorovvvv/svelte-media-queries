<script>
    import { onMount } from "svelte";

    export let query
    export let matches = false

    const getMatches = (query) => window.matchMedia(query).matches

    const checkMatches = () => {
        if (typeof query === 'string') {
            return matches = getMatches(query)
        }
        return matches = query.flat(Infinity).map(getMatches)
    }
    onMount(() => checkMatches)
    $:checkMatches(query)
</script>

<svelte:window on:resize={checkMatches}/>
<slot {matches}/>