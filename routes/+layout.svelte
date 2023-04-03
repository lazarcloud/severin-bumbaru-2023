<script>
	import Header from './Header.svelte';
	import '$styles/global.css';
	import '$styles/simple/simple.css';
	export let data;
</script>


<section>
	{#if data.user.isAuthenticated}
	<p>Welcome, {data.user.userdata.username}!</p>
	{/if}
	<slot />
</section>




<style>
</style>
