<script lang='ts'>
    export let data = {}
    export let name:any = ''
</script>

<pre><code>{(name ? `${name} = ` : '') + JSON.stringify(data, null, 2)}</code></pre>