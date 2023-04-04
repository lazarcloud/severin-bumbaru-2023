<script>
	import { enhance } from '$app/forms';
	export let form
	export let data
</script>
<svelte:head>
	  <title>Journey - Home</title>
	  <meta name="description" content="home" />
</svelte:head>
<img src="./background1.png" alt="background" style="display: none;">
<section class="gradient_bg">
<div>
	<h1 class="bold">Journey</h1>
	<!-- <h1>Providers</h1>
	<div class="providers">
	  <a href="">Login with Google</a>
	  <a href="">Login with Github</a>
	</div> -->
	<h2>Pack your <span class="medium">bags</span> and let's explore the <span class="medium">world</span>!</h2>
	<!-- <p>Don't have an account? <a href="/register" class = "font-bold text-mango">Register!</a></p>
	<p>Forgot password? <a href="/" class = "font-bold text-mango" >Reset it!</a></p> -->
	<div class="buttons">
		{#if !data.user.isAuthenticated}
		<a href="/login" class="button">Login</a>
		<a href="/register" class="button">Register</a>
		{:else}
		<a href="/new" class="button" style="background-color: #000000;">New journey!</a>
		{/if}
	</div>
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
		place-content: center;
	}
	
    div{
        text-align: center;
    }
	.buttons{
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1rem;
		width:100%;
	}
	.buttons>a{
		text-decoration: none;
		background-color: var(--primary);

		color: white;
		border: none;
		margin: 0.25rem 0.25rem;
		padding: 0.5rem;
		border-radius: 0.5rem;
		min-width: 200px;
	}
	.gradient_bg{
		background-image:
		linear-gradient(180deg, var(--light) 35%, rgba(58, 31, 215, 0.1)),
		url('https://ryderwalker.com/wp-content/uploads/2019/10/Romania-8.jpg');
		width: 100%;
		min-height: calc(100vh - 64px);
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
	h1{
		font-size: 4rem;
	}
	h2{
		font-size: 2rem;
	}
	div{
		width: 50%;
		
		padding: 3rem 1rem;
		border-radius: 0.5rem;
		margin-left: 2rem;
	}
	@media only screen and (max-width: 600px) {
		.gradient_bg {
			background: white;
		}
		div{
			width: 100%;
			margin: 0;

		}
	}
</style>