<script context='module' lang='ts'>
    export const createMediaStore = mediaStore
</script>

<script lang='ts'>
import { getType } from "$lib/utils/getType";

    import { mediaStore } from "$lib/utils/mediaStore";

    import { onDestroy, onMount } from "svelte";
    import { Types, type MatchesArray, type MatchesObject, type MatchesType, type QueryAny } from "./MediaQuery.types";

    export let query:QueryAny = ''
    export let matches:MatchesType<typeof query> = false
    export let matchesArray:MatchesArray = []
    export let matchesObject:MatchesObject = {}


    //@ts-expect-error
    let store:ReturnType<typeof mediaStore>
    
    const updateMatches = (...watches:any) => {
        if(query) {
            matchesArray = Array.isArray($store) ? $store : []
            matchesObject = getType($store) === Types.object ? $store : {}
            matches = $store ?? (
                getType(query) === Types.array ? [] :
                getType(query) === Types.object ? {} : false
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
