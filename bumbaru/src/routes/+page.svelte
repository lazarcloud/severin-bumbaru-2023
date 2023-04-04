<script>
	import { enhance } from '$app/forms';
	export let form
</script>
<svelte:head>
	  <title>Journey - Home</title>
	  <meta name="description" content="home" />
</svelte:head>
<section class = "gradient_bg" >
<div>
	<h1 class="bold">Journey</h1>
	<!-- <h1>Providers</h1>
	<div class="providers">
	  <a href="">Login with Google</a>
	  <a href="">Login with Github</a>
	</div> -->
	<h2>Pack your <span class="medium">bags</span> and let's explore de <span class="medium">world</span>!</h2>
	<p>Don't have an account? <a href="/register" class = "font-bold text-mango">Register!</a></p>
	<p>Forgot password? <a href="/" class = "font-bold text-mango" >Reset it!</a></p>
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

	.gradient_bg{
		background-image:
		linear-gradient(180deg, rgb(255, 255, 255) 35%, rgba(223, 119, 103, 0.10)),
		url('./background1.jpg');
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
	input{
        margin: 0.5rem 0;
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid var(--dark);
		width:60%;
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
</style>