<script>
    import { page } from '$app/stores';
    export let email
    let path;
    $: path = $page.url.pathname;
</script>
<nav>
    <div class="left">
        <img src="/favicon.png" alt="logo" />
        <p class="bold text-2xl">Journey</p>
    </div>
    <div class="right">
        {#if email}
            <p>{email}</p>
        {/if}
        <a href="/" class="{path == '/' ? 'active' : ''}">Home</a>
        <a href="/dashboard" class="{path == '/dashboard' ? 'active' : ''}">Dashboard</a>
        <a href="/newmoderated" class="{path == '/newmoderated' ? 'active' : ''}">Moderated</a>
        <a href="/unmoderated" class="{path == '/unmoderated' ? 'active' : ''}">Unmoderated</a>
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