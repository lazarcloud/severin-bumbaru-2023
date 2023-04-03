<script>
    import { slide, fly, fade } from 'svelte/transition';
</script>

<svelte:head>
	<title>Travel - Home</title>
	<meta name="description" content="Travel" />
</svelte:head>

<section>
    <div class="container text">
        <h1>Pack your <span class="medium">bags</span>, let's chase the <span class="medium">adventure</span>!</h1>
    </div>
    <div class="container">
    </div>
</section>

<style>
    section{
        width:100%;
        min-height: calc(100vh - 64px);
    }
    img{
        height: 60%;
    }
    .scroll{
        height: 57.5%;
        margin-bottom: 1rem;
        overflow-y: auto;
    }
    .member{
        display: flex;
        align-items: center;
        gap: 2rem;
        justify-content: space-between;
        width: clamp(300px, 50%, 500px);
        height: 64px;
        border-radius: 0.5rem;
    }
    .container{
        display:grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 1rem;
        margin-inline: 1rem;
    }
    h1 .center, h2 .center, h3 .center{
        text-align:center;
    }
    .panel{
        background-color: var(--light);
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.5rem 0.1rem var(--shadow);
        height: 60vh;
        position: relative;
    }
    .text{
        padding-block: 1.5rem;
    }
    h1{
        font-size: 2.5rem;
    }
    form{
        min-height: 2rem;
        width: 100%;
        margin-block: 1rem;
    }
    input, .btn{
        all: unset;
        background-color: var(--dark);
        border-radius: 0.5rem;
        padding-inline: 1rem;
        padding-block: 0.75rem;
        cursor: pointer;
        margin: 4px;
    }
    input{
        height: 100%;
    }
    
    input[type="submit"], .btn{
        background-color: var(--primary);
        color: white;
    }
    a.btn{
        text-decoration: none;
    }
    button.btn{
        text-align:center;
    }
    .bottom{
        position: absolute;
        bottom: 2rem;
    }
</style>
