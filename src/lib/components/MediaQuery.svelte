<script context='module' lang='ts'>
    export const createMediaStore = mediaStore
</script>

<script lang='ts'>
    import { mediaStore } from "$lib/utils/mediaStore";

    import { onDestroy, onMount } from "svelte";
    import type { MatchesAny, MatchesArray, MatchesType, QueryAny } from "./MediaQuery.types";

    export let query:QueryAny = ''
    export let matches:MatchesType<typeof query> = false
    export let matchesArray:MatchesArray = []


    //@ts-expect-error
    let store:ReturnType<typeof mediaStore>
    
    const updateMatches = (...watches:any) => {
        if(query) {
            matchesArray = Array.isArray($store) ? $store : []
            //@ts-expect-error
            matches = $store ?? (
                Array.isArray(query) ? [] : false
            )
        } else {
            matches = false
            matchesArray = []
        }
    }

    const start = () => {
        //@ts-expect-errors
        store = createMediaStore(query)
        updateMatches()
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
        start()
    })
    
    onDestroy(() => {
        destroy()
    })
    
    $:update(query)
    $:updateMatches($store)
</script>
<slot {matches} {matchesArray}/>
