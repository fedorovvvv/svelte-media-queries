<script>
    import { onMount } from "svelte";

    export let query
    export let matches = false

    const checkMatches = () => matches = window.matchMedia(query).matches
    onMount(() => checkMatches)
    $:checkMatches(query)
</script>

<svelte:window on:resize={checkMatches}/>
<slot {matches}/>