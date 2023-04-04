<script>
	import './styles.css'
	import "../app.css";
	
	import { Nav } from '$lib/components'
	export let data;
</script>

	<!-- {#if data.user.isAuthenticated && data.user.userdata.confirmed==0}
		<h1>Please confirm your account!</h1>
	{/if} -->
	<Nav user={data.user} />

	<slot/>
<style>
	/* :global(*){
        outline: 1px solid blue;
    } */
</style>
