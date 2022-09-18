# Svelte CSS media queries 🐥 

[![npm version](http://img.shields.io/npm/v/svelte-media-queries.svg)](https://www.npmjs.com/package/svelte-media-queries)
[![npm downloads](https://img.shields.io/npm/dm/svelte-media-queries.svg)](https://www.npmjs.com/package/svelte-media-queries)
![license](https://img.shields.io/npm/l/svelte-media-queries)

### [Demo - Svelte REPL](https://svelte.dev/repl/7e97f1a1d1654701a0661e076037d160?version=3.48.0)
### Lightweight, comfortable, like Svelte🐣 | Svelte store / Svelte component
With TypeScript support💙  

[![Rate this package](https://badges.openbase.com/js/rating/svelte-media-queries.svg?style=openbase&token=myaBaR9V2YuM2LLiUs0nOTMlrXb1fGC6F9XuQa3Y0sw=)](https://openbase.com/js/svelte-media-queries?utm_source=embedded&amp;utm_medium=badge&amp;utm_campaign=rate-badge)

## how to install
```npm
npm i svelte-media-queries
```
### What can I do?

```js
query = {
  "mobile": "(max-width: 480px)",
  "tablet": "(min-width: 480px) and (max-width: 768px)",
  "largeTablet": "(min-width: 768px) and (max-width: 1200px)",
  "desktop": "(min-width: 1200px)",
  "other": [
    "(min-width: 1200px)",
    "(max-height: 900px)"
  ],
  "themes": {
    "dark": "(prefers-color-scheme: dark)",
    "light": "(prefers-color-scheme: light)"
  }
} // 
```
```js
matches = {
  "mobile": false,
  "tablet": true,
  "largeTablet": false,
  "desktop": false,
  "other": [
    false,
    true
  ],
  "themes": {
    "dark": false,
    "light": true
  }
}
```
<img src="https://media.giphy.com/media/oYtVHSxngR3lC/giphy-tumblr.gif" width="350"/>

Yes, yes, and it's all recursive and reactive🐹  
Try it in [Svelte REPL](https://svelte.dev/repl/7e97f1a1d1654701a0661e076037d160?version=3.48.0)  

## How to use

### Query? Yes, just like in CSS🙊
```js
query='(min-width: 768px) and (max-width: 1280px)'
```
### Matches? This is your result
#### Component (`bind:` directive)
```
bind:matches
------------------
bind:matches={foo}
```
#### Slot (`let:` directive)
```
let:matches
------------------
let:matches={foo}
```
### Examples
#### Store
```js
<script>
  import { onDestroy } from 'svelte'
  import { createMediaStore } from 'svelte-media-queries'
  
  const matches = createMediaStore(query) //The type of the store will completely repeat the query
  
  onDestroy(() => matches.destroy()) //Stop events for calculation
</script>
```
[query example](https://github.com/fedorovvvv/svelte-media-queries#what-can-i-do)
#### Slot
```svelte
<script>
  import MediaQuery from 'svelte-media-queries'
</script>

<MediaQuery query='(max-width: 480px)' let:matches>
  {#if matches}
    mobile!!
  {/if}
</MediaQuery>
```
#### Bind
```svelte
<script>
  import MediaQuery from 'svelte-media-queries'

  let matches
</script>

<MediaQuery query='(max-width: 480px)' bind:matches/>

{#if matches}
  mobile!!
{/if}

{#if matches}
  Oh my God, it's really mobile
{/if}
```

### That's not all!
#### You can use an array from `query`
```js
query={['(max-width: 1200px)', '(min-width: 800px)']}
```
What about matches?  
Matches will take everything from `query` in order  
```js
matches=[boolean, boolean]
```
#### You can test this in [Svelte REPL](https://svelte.dev/repl/7e97f1a1d1654701a0661e076037d160?version=3.48.0)🐥
#### Example
```svelte
<script>
  import MediaQuery from 'svelte-media-queries'
</script>

<MediaQuery query={['(max-width: 768px)', '(min-width: 768px) and (max-width: 1280px)', '(min-width: 1280px)']} let:matches>
  {@const [mobile, tablet, desktop] = matches}
  <h5>
    mobile: '(max-width: 768px)' = {mobile}
    tablet: '(max-width: 1280px)' = {tablet}
    desktop: '(min-width: 1280px)' = {desktop}
  </h5>
</MediaQuery>
```
`{@const}` - [Svelte Docs](https://svelte.dev/docs#template-syntax-const)🐹  
You can also use it through the array index `tablet = matches[1]`  
With `bind:`, everything is the same🐥
