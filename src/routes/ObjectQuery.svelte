<script lang='ts'>
	import MediaQuery from '$lib/components/MediaQuery.svelte';
    import Data from './Data.svelte';
    const query = {
        mobile: '(max-width: 480px)',
        tablet: '(min-width: 480px) and (max-width: 768px)',
        largeTabled: '(min-width: 768px) and (max-width: 1200px)',
        desktop: '(min-width: 1200px)',
        other: ['(min-width: 1200px)', '(max-height: 900px)'],
        themes: {
            dark: '(prefers-color-scheme: dark)',
            light: '(prefers-color-scheme: light)',
        },
    }
</script>
<h2>Object query (and recursion)</h2>
<MediaQuery {query} let:matches>
    <Data name='query' data={query}/>
    <Data name='matches' data={matches}/>
</MediaQuery>
