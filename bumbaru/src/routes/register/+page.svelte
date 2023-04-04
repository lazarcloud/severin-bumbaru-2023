<script>
    import { enhance } from '$app/forms';
    export let form
  </script>
  <svelte:head>
      <title>Register</title>
      <meta name="description" content="Lazar Auth Register" />
  </svelte:head>
  <section class = "gradient_bg">
    <div>
      <h1 class="bold">Register</h1>
      <!-- <h1>Providers</h1>
      <div class="providers">
        <a href="">Login with Google</a>
        <a href="">Login with Github</a>
      </div> -->
      <h2>Start your Journey</h2>

      {#if form && form.field==0}
        {JSON.stringify(form)}
      {/if}
  
      <form method="POST" action="?/register" use:enhance>
        <input type="email" name="email" placeholder="example@domain.com"/>
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
      <p>Already have an account? <a href="/login">Login!</a></p>
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
      background-image:
      linear-gradient(115deg, var(--light) 35%, rgba(223, 119, 103, 0.10)),
      url('/background2.png');
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
    a{
      color: var(--primary);
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