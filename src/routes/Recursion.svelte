<script lang='ts'>
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
    <h3>query:</h3>
    <code>{JSON.stringify(query)}</code>

    <h3>matches:</h3>
    <code>{JSON.stringify(matches)}</code>
</MediaQuery>
