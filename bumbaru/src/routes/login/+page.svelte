<script>
	import { enhance } from '$app/forms';
	export let form
  </script>
  <svelte:head>
	  <title>Login</title>
	  <meta name="description" content="lazar login" />
  </svelte:head>
  <section>
	<h1>Lazar Auth</h1>
	<!-- <h1>Providers</h1>
	<div class="providers">
	  <a href="">Login with Google</a>
	  <a href="">Login with Github</a>
	</div> -->
	<h2>Login with Lazar</h2>
	{#if form}
	  {form.sms}
	{/if}
	<form method="POST" action="?/login" use:enhance autocomplete="off">
	  <input type="email" name="email" placeholder="lazar@lazar.lol"/>
	  <input type="password" name="password" placeholder="password"/>
	  <input type="submit" value="Login"/>
	</form>
	<p>Don't have an account? <a href="/register">Register!</a></p>
	<p>Forgot password? <a href="/">Reset it!</a></p>
  </section>
  
  
  
  <style>
  </style>