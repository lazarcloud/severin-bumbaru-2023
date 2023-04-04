<script>
    import { page } from '$app/stores';
    let path;
    $: path = $page.url.pathname;
</script>
<nav style="background-color:#ffffff">
    <div class="left" style="gap:0.5rem">
        <img src="/favicon.png" alt="logo" />
        <a href= '/' class="bold text-2xl">Journey</a>
    </div>
    <div class="right">
        <a href="/" class="{path == '/' ? 'active' : ''}">Home</a>     
        <a href="/newjourney" class="{path == '/newjourney' ? 'active' : ''}">Start New!</a> 
        <a href="/journeys" class="{path == '/journeys' ? 'active' : ''}">Journeys</a>
        <a style="text-color:#eb8c6f" href="/logout" class="{path == '/logout' ? 'active' : ''}">Logout</a> 
    </div>
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
    }
    div{
        display:flex;
        align-items:center;
        gap: 2rem;
        margin-inline: 2rem;
        height: 64px;
    }
    a, p{
        text-decoration: none;
        color: black;
    }
    .active{
        border-bottom: 2px solid var(--primary);
    }
</style>