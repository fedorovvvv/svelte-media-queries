<script context='module' lang='ts'>
    export const createMediaStore = mediaStore
</script>

<script lang='ts'>
    import { mediaStore } from "$lib/utils/mediaStore";

    import { onDestroy, onMount } from "svelte";
    import type { MatchesAny, MatchesArray, QueryAny } from "./MediaQuery.types";

    export let query:QueryAny = ''
    export let matches:MatchesAny = false
    export let matchesArray:MatchesArray = []
    
    let mounted = false
    
    let store:ReturnType<typeof mediaStore>
    
    const updateMatches = (...watches:any) => {
        if(query) {
            matchesArray = Array.isArray($store) ? $store : []
            matches = $store
        } else {
            matches = false
            matchesArray = []
        }
    }

    const start = () => {
        if (mounted) {
            //@ts-expect-errors
            store = createMediaStore(query)
            updateMatches()
        }
    }
    
    const destroy = () => {
        updateMatches()
        store?.destroy
    }
    
    const update = (...watchers:any) => {
        destroy()
        query && start()
    }

    
    onMount(() => {
        mounted = true
        start()
    })
    
    onDestroy(() => {
        destroy()
    })
    
    $:update(query)
    $:updateMatches($store)
    $:console.log($store)
</script>
<slot {matches}/>
