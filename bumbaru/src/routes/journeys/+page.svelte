<script>
    import { slide, fly, fade } from 'svelte/transition';
    export let data;
</script>

<svelte:head>
	<title>Journey - All </title>
	<meta name="description" content="Travel" />
</svelte:head>

<section>
<div style="display: flex">
    <div style="display:flex flex-direction:column width:50%">
        <div class = "journey" style = "margin-top: 80px">
            <div class = "circle text-8xl">
                <a href = "/journeys/1">1</a>
            </div>
            <div class = "details">
                <div class = "journey-trail">
                    Galați - București - Brăila
                </div>
                <div class = "places">
                    5 Parks - 3 Museums - 3 Restaurants
                </div>
            </div>
        </div>
        <div class = "journey">
            <div class = "circle text-8xl">
                <a href = "/journeys/2">2</a>
            </div>
            <div class = "details">
                <div class = "journey-trail">
                    Iași - Timișoara - București
                </div>
                <div class = "places">
                    0 Parks - 16 Museums - 4 Restaurants
                </div>
            </div>
        </div>
        <div class = "journey">
            <div class = "circle text-8xl">
                <a href = "/journeys/3">3</a>
            </div>
            <div class = "details">
                <div class = "journey-trail">
                    Galați - București
                </div>
                <div class = "places">
                    1 Park - 0 Museums - 1 Restaurant
                </div>
            </div>
        </div>
        <div class = "journey">
            <div class = "circle text-8xl">
                <a href = "/journeys/4">+</a>
            </div>
            <div class = "details">
                <div class = "journey-trail" style = "margin-top: 60px">
                    Chart New Course!
                </div>
            </div>
        </div>
    </div>
    
    <div style="display:flex flex-direction:column">
        
    </div>
</div>
</section>

<style>
    section{
        width:100%;
        background-color: var(--dark);
        min-height: calc(100vh - 64px);
    }
    .journey{
        display: flex;
        margin-top: 40px;
        margin-bottom: 20px;
    }
    .details{
        display:flex;
        flex-direction: column;
    }
    .journey-trail{
        
        font-size: xxx-large;
        margin-top: 40px;
        margin-left: 20px;
    }
    .places{
        
        font-size: xx-large;

        margin-left: 20px;
    }
    .circle{
        margin-left: 78px;
        margin-top: 20px;
        border-radius: 50%;
        width: 10rem;
        height: 10rem;
        background: #eb8c6f;
        color: white;

        display:grid;
        place-items: center;
    }    
    .cell{
        border-radius: 50%;
        background: #ffffff;
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
