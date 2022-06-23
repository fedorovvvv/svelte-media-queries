<script lang='ts'>
	import Data from './Data.svelte';
	import MediaQuery from '$lib/components/MediaQuery.svelte';
    const query = [
        '(max-width: 300px)',
        '(min-width: 432px) and (max-width: 1200px)',
        [
            '(min-width: 650px)',
            '(max-width: 800px)'
        ]
    ]
</script>
<h2>Recursion query</h2>
<MediaQuery {query} let:matches>
    <Data name='query' data={query}/>
    <Data name='matches' data={matches}/>
</MediaQuery>
