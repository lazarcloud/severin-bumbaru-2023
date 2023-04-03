<script>
	import { enhance } from '$app/forms';
	export let form
</script>
<svelte:head>
	  <title>Journey - Login</title>
	  <meta name="description" content="login" />
</svelte:head>
<section class = "gradient_bg" >
<div class = "mx-10 my-28">
	<h1 class="text-6xl pt-6 pl-6 text font-bold" >Authenticate</h1>
	<!-- <h1>Providers</h1>
	<div class="providers">
	  <a href="">Login with Google</a>
	  <a href="">Login with Github</a>
	</div> -->
	<h2 class = "text-4xl pl-6 pb-10">Continue your Journey</h2>
	{#if form}
	  {JSON.stringify(form)}
	{/if}
	<form class = "pl-4 text-3xl focus:border-collapse" method="POST" action="?/login" use:enhance autocomplete="off">
	  <input class = "p-3 rounded-md bg-gray-100" type="email" name="email" placeholder="email@domain.com"/>
	  <input class = "p-3 rounded-md bg-gray-100" type = "password" name="password" placeholder="password"/>
	  <input class = "px-36 py-2 rounded-xl bg-mango font-bold text-white" type = "submit" value="Login"/>
	</form>
	<p class = "pl-6">Don't have an account? <a href="/register" class = "font-bold text-mango">Register!</a></p>
	<p class = "pl-6">Forgot password? <a href="/" class = "font-bold text-mango" >Reset it!</a></p>
</div>
</section>
  
  
  
<style>
	input{
		display: block;
		margin: 0.5rem 0;
	}

	form{
		margin: 1rem 0;
	}

	section{
		display: flex;
		flex-direction: column;
	}

	.gradient_bg{

		background-image:
		linear-gradient(115deg, rgb(255, 255, 255) 35%, rgba(223, 119, 103, 0.10)),
		url('./background.jpg');
		width: 100%;
		height: calc(100vh - 64px);
		background-size: cover;
		color: black;
	}

	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
		color: rgb(120, 120, 120);
		opacity: 1; /* Firefox */
		outline: none;
	}

	:-ms-input-placeholder { /* Internet Explorer 10-11 & Microsoft Edge */
		color: rgb(120, 120, 120);

	}

	input:focus{
		outline: none;
	}

</style>