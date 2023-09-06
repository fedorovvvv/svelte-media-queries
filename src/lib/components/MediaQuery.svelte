<script context="module" lang='ts'> 
    export const createMediaStore = mediaStore
</script>
<script lang='ts'>
    import { getType } from "$lib/utils/getType";

    import { mediaStore } from "$lib/utils/mediaStore";

    import { onDestroy, onMount } from "svelte";
    import { Types, type MatchesArray, type MatchesObject, type MatchesType, type QueryAny} from "./MediaQuery.types";

    type T = $$Generic<QueryAny>
    type CurrentMatches = MatchesType<T>

    export let query:T = '' as T
    export let matches:CurrentMatches = false as CurrentMatches
    export let matchesArray:MatchesArray = []
    export let matchesObject:MatchesObject = {}


    let store:ReturnType<typeof mediaStore<T>>
    
    const updateMatches = (...watches:any) => {
        if(query) {
            matchesArray = Array.isArray($store) ? $store : []
            matchesObject = getType($store) === Types.object ? $store : {}
            matches = ($store as CurrentMatches) ?? (
                getType(query) === Types.array ? [] :
                getType(query) === Types.object ? {} : false
            ) as CurrentMatches
        } else {
            matches = false as CurrentMatches
            matchesArray = []
        }
    }

    const start = () => {
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
