<script>
	import { enhance } from '$app/forms';
	export let form
</script>
<svelte:head>
	  <title>Journey - Login</title>
	  <meta name="description" content="login" />
</svelte:head>
<img src="./background3.png" alt="background" style="display: none;">
<section class = "gradient_bg" >
<div>
	<h1 class="bold">Login</h1>
	<!-- <h1>Providers</h1>
	<div class="providers">
	  <a href="">Login with Google</a>
	  <a href="">Login with Github</a>
	</div> -->
	<h2>Continue your Journey</h2>
	{#if form}
	  {JSON.stringify(form)}
	{/if}
	<form method="POST" action="?/login" use:enhance autocomplete="off">
	  <input type="email" name="email" placeholder="email@domain.com"/>
	  <input type = "password" name="password" placeholder="password"/>
	  <input type = "submit" value="Login"/>
	</form>
	<p>Don't have an account? <a href="/register" class = "text-mango">Register!</a></p>
	<p>Forgot password? <a href="/" class = "text-mango" >Reset it!</a></p>
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
		place-content: center;
	}
	
	.gradient_bg{
		background:
		linear-gradient(115deg, rgb(255, 255, 255) 35%, rgba(112, 173, 203, 0.45) 70%,  rgba(237, 255, 196, 0.70)),
		url('/background3.png');
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

	input:focus{
		outline: none;
	}
	input{
        margin: 0.5rem 0;
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid var(--dark);
		width:50%;
    }
	input[type="submit"]{
		background-color: var(--primary);
		color: white;
		border: none;
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
	p{
		font-size: 1.2rem;
	}
	@media only screen and (max-width: 600px) {
		.gradient_bg {
			background: white;
		}
		div{
			width: 90%;
		}
		input{
			width: 92%;
		}
	}
</style>