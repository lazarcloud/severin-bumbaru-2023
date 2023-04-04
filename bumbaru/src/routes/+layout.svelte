<script>
	import './styles.css'
	import "../app.css";
	
	import { Nav } from '$lib/components'
	export let data;
</script>

	<Nav email={data.user.userdata.email} />
	<slot/>
<style>
	/* :global(*){
        outline: 1px solid blue;
    } */
</style>
