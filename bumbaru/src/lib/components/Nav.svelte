<script>
    import { page } from '$app/stores';
    let path;
    $: path = $page.url.pathname;
</script>
<nav class="bg-gradient-to-r from-white from-10% via-white via-20% to-white to-85%">
    <div class="left">
        <img src="/favicon.png" alt="logo" />
        <p class="bold text-2xl">Journey</p>
    </div>
    <div class="right">
        <a href="/" class="{path == '/' ? 'active' : ''}">Home</a>
        <a href="/map" class="{path == '/dashboard' ? 'active' : ''}">Map</a>
        <a href="/journeys" class="{path == '/newmoderated' ? 'active' : ''}">Journeys</a>
        <a href="/newjourney" class="{path == '/unmoderated' ? 'active' : ''}, bg-red-700, text-white"> Start New </a>
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
        border-bottom: 2px solid var(--black);
    }
</style>