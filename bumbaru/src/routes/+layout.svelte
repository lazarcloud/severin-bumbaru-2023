<script>
	import './styles.css'
	import "../app.css";
	
	import { Nav } from '$lib/components'
	import { NavAuth } from '$lib/components'
	export let data;
</script>
	{#if data.user.isAuthenticated}
	<Nav />
	{:else}
	<NavAuth />
	{/if}
	<!-- <NavAuth /> -->
	<slot/>
<style>
	/* :global(*){
        outline: 1px solid blue;
    } */
</style>
