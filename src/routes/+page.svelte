<script lang='ts'>
	import Recursion from './Recursion.svelte';
	import MediaQuery from '$lib/components/MediaQuery.svelte'
	import Dynamic from './Dynamic.svelte'
	import ObjectQuery from './ObjectQuery.svelte';

	
	let innerWidth = 0
</script>
<svelte:window bind:innerWidth/>
<main>
	<h1>
		Change the size of this area {innerWidth}px🐥
	</h1>
	
	<h2>
		Dynamic parameters (smart🐹)
	</h2>
	<Dynamic/>
	
	<hr>

	<h2>
		Slot and the <code>let:</code> directive<i>boolean</i>
	</h2>
	<code>'(min-width: 200px)'</code>
	<MediaQuery query='(min-width: 200px)' let:matches>
		<h5>
			(min-width: 200px) = {matches}
		</h5>
	</MediaQuery>

	<hr/>

	<h2>
		Slot and the <code>let:</code> directive (Array):<i>boolean[]</i>
	</h2>
	<code>['(max-width: 768px)', '(min-width: 768px) and (max-width: 1280px)', '(min-width: 1280px)']</code>
    <MediaQuery query={['(max-width: 768px)', '(min-width: 768px) and (max-width: 1280px)', '(min-width: 1280px)']} let:matches>
        {@const [mobile, tablet, desktop] = matches}
        <h5>
            mobile: '(max-width: 768px)' = {mobile}<br><br>
            tablet: '(max-width: 1280px)' = {tablet}<br><br>
            desktop: '(min-width: 1280px)' = {desktop}
        </h5>
    </MediaQuery>

	<hr/>

	<Recursion/>

	<hr/>
	
	<ObjectQuery/>
</main>

<style>
	:global(h1,h2,h3,h4,h5,h6) {
		color: #555
	}
	:global(i) {
		color: #009bb0
	}
	:global(code), :global(pre) {
			font-weight: 400;
			color: #444;
			background-color: #eee;
			border-radius: 3px;
			font-family: courier, monospace;
			padding: 0 3px;
	}
	:global(pre) {
		display: block;
		padding: 10px;
		border: 3px dashed #ddd;
		overflow: auto;
	}
</style>