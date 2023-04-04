<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    function query(e) {
        // Reset mobile state
        console.log(e)
        if (!e.matches) {
            show = true;
        }else{
            show = false
        }
    };
    onMount(() => {
        const mediaListener = window.matchMedia("(max-width: 600px)");

        mediaListener.addListener(query);
    });
    let path;
    let show = true;
    $: path = $page.url.pathname;
    function swap(){
        show = !show
    }
    export let user
</script>
<nav style="background-color:#ffffff">
    <div class="left" style="gap:0.5rem">
        <img src="/favicon.png" alt="logo" />
        <a href= '/' class="bold text-2xl">Journey</a>
    </div>
    <div class="btn">
        <button on:click={()=>swap()}>|||</button>
    </div>
    {#if show}
    <div class="right">
        {#if user.isAuthenticated}
        <a href="/" class="{path == '/' ? 'active' : ''}">Home</a>     
        <a href="/newjourney" class="{path == '/newjourney' ? 'active' : ''}">Start New!</a> 
        <a href="/journeys" class="{path == '/journeys' ? 'active' : ''}">Journeys</a>
        <a style="text-color:#eb8c6f" href="/logout" class="{path == '/logout' ? 'active' : ''}">Logout</a> 
        {:else}
        <a href="/login" class="{path == '/login' ? 'active' : ''} login">Login</a>
        <a href="/register" class="{path == '/register' ? 'active' : ''} register">Register</a>
        {/if}
    </div>
    {/if}
</nav>

<style>
    img{
        height: 60%;
    }
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1rem;
        height: 64px;
    }
    div{
        display:flex;
        align-items:center;
        gap: 2rem;
        margin-inline: 2rem;
        height: 100%;
        /* height: 64px; */
    }
    a, p{
        text-decoration: none;
        color: black;
    }
    .active{
        border-bottom: 2px solid var(--primary);
    }
    .btn{
        display:none;
    }
    @media only screen and (max-width: 600px) {
        .btn{
            display:flex;
        }
        nav{
            position:relative;
        }
		.right{
            display: flex;
            background-color: var(--light);
            flex-direction: column;
            align-items: center;
            place-content: center;
            position: absolute;
            width: 100%;
            margin-inline: 0;
            bottom: calc(-128px + -64px);
            left:0;
            height: auto;
        }
	}
</style>