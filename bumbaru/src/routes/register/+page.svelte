<script>
    import { enhance } from '$app/forms';
    export let form
  </script>
  <svelte:head>
      <title>Register</title>
      <meta name="description" content="Lazar Auth Register" />
  </svelte:head>
  <section>
    <h1>Register</h1>
    <!-- <h1>Providers</h1>
    <div class="providers">
      <a href="/auth/google">Register with Google</a>
      <a href="/auth/github">Register with Github</a>
    </div> -->
    <h2>with Lazar</h2>

    {#if form && form.field==0}
      {JSON.stringify(form)}
    {/if}
 
    <form method="POST" action="?/register" use:enhance>
      <input type="email" name="email" placeholder="john@lazar.lol"/>
      {#if form && form.field=='email'}
      {JSON.stringify(form)}
      {/if}
      <input type="password" name="password" placeholder="password"/>
      {#if form && form.field=='password'}
      {JSON.stringify(form)}
      {/if}
      <input type="password" name="password2" placeholder="confirm password"/>
      {#if form && form.field=='password2'}
      {JSON.stringify(form)}
      {/if}
      <input type="submit" value="Register"/>
    </form>
    <p>Already have an account? <a href="/">Login!</a></p>
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
      linear-gradient(160deg, rgb(255, 255, 255) 30%, rgba(223, 119, 103, 0.10)),
      url('./background.jpg');
      width: 100%;
      height: calc(100vh - 64px);
      background-size: cover;
      color: black;
    }
  
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: rgb(0, 0, 0);
      opacity: 1; /* Firefox */
      outline: none;
    }
  
    :-ms-input-placeholder { /* Internet Explorer 10-11 & Microsoft Edge */
      color: rgb(0, 0, 0);
  
    }
  
    input:focus{
      outline: none;
    }
  
  </style>