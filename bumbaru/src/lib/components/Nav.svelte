<script>
    import logo from '$lib/imgs/favicon.png';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    let isMobile = true
    function query(e) {
        // Reset mobile state
        console.log(e)
        isMobile = e.matches;
    };
    onMount(() => {
        const mediaListener = window.matchMedia("(max-width: 600px)");
        
        mediaListener.addListener(query);
        query(mediaListener)
    });
    let path;
    let show = false;
    $: path = $page.url.pathname;
    function swap(){
        show = !show
    }
    export let user
</script>
<nav>
    <div class="left" style="gap:0.5rem">
        <img src={logo} alt="logo" />
        <a href= '/' class="bold text-2xl">Journey</a>
    </div>
    <div class="btn">
        <button on:click={()=>swap()} style="transform: rotate({show?'0':'90deg'});">|||</button>
    </div>
    {#if !isMobile || show}
    {#if user.isAuthenticated}

    <div class="right" style="--nr:3">
        <a href="/" class="{path == '/' ? 'active' : ''}">Home</a>     
        <a href="/newjourney" class="{path == '/newjourney' ? 'active' : ''}">Start New!</a> 
        <a href="/journeys" class="{path == '/journeys' ? 'active' : ''}">Journeys</a>
        <a style="text-color:#eb8c6f" href="/logout" class="{path == '/logout' ? 'active' : ''}">Logout</a> 
    </div>
    {:else}
    <div class="right" style="--nr:1">
        <a href="/" class="{path == '/' ? 'active' : ''}">Home</a>     
        <a href="/login" class="{path == '/login' ? 'active' : ''} login">Login</a>
        <a href="/register" class="{path == '/register' ? 'active' : ''} register">Register</a>
    </div>
    {/if}

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
        background-color: var(--dark);
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
        .btn{
            transform: rotate(0);
        }
        .btn{
        transition: all 0.5s ease;

        }
        nav{
            position:relative;
        }
		.right{
            display: flex;
            background-color: var(--dark);
            /* background-color:red; */
            flex-direction: column;
            align-items: center;
            place-content: center;
            position: absolute;
            width: 100%;
            margin-inline: 0;
            bottom: calc(var(--nr) * -64px - var(--nr) * -1rem + -64px);
            left:0;
            height: auto;
            padding: 1rem;
            z-index: 10000;
        }
        /* a{
            border: 1px solid black
        } */
	}
</style>