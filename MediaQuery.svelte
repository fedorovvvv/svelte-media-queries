<script>
    import { onMount } from "svelte";

    export let query
    export let matches = false

    let mounted = false

    const getMatches = (query) => window.matchMedia(query).matches ?? false

    const checkMatches = () => {
        if (mounted) {
            if (typeof query === 'string') {
                return matches = getMatches(query)
            }
            return matches = query?.flat(Infinity).map(getMatches)
        }
    }
    onMount(() => {
        mounted = true
        checkMatches()
    })
    $:checkMatches(query)
</script>

<svelte:window on:resize={checkMatches}/>
<slot {matches}/>