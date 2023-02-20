<script lang='ts'>
    import type { MatchesAny, QueryAny } from "$lib/components/MediaQuery.types";
	import MediaQuery from "$lib/components/MediaQuery.svelte";
	
	let value = `(min-width: 500px);   (min-width: 768px) and (max-width: 1280px);   (max-width: 700px)`
	$: query = (() => {
		let res:QueryAny = value.replace(/\s/g,' ').split(';')
		res.length === 1 && (res = res.join())
		return res
	})()
	
	let dynamic:MatchesAny
</script>

<MediaQuery {query} bind:matches={dynamic}/>

<code>split(';')</code>
<input bind:value placeholder="(min-width: 500px);   (min-width: 768px) and (max-width: 1280px);   (max-width: 700px)"/>

<h5>
	query = {typeof query === 'string' ? `'${query}'` : `[${query.map(r => `'${r}'`).join(', ')}]`}
</h5>

<h5>
	{#if typeof dynamic === 'object'}
		matches:<i>boolean[]</i> = <code>[{dynamic.join(', ')}]</code>
	{:else}
		matches:<i>boolean</i> = <code>{dynamic}</code>
	{/if}
</h5>

<style>
	input {
		width: 100%;
		margin: 10px 0;
	}
</style>