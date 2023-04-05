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
        <div class = "journey">
            <div class = "circle">
                <a href = "/new">+</a>
            </div>
            <div class = "details">
                <div class = "journey-trail bold">
                    Chart New Course!
                </div>
            </div>
        </div>
        {#each data.journeys as j, index}
        <div class = "journey">
            <div class = "circle">
                <a href = "/getjourney/{j._id}">{index + 1}</a>
            </div>
            <div class = "details">
                <div class="journey-trail bold">
                    
                   
                    {#each j.ans.route as oras}
                    {oras}
                    {#if oras != j.ans.route[j.ans.route.length - 1]}
                    <span> - </span>
                    {/if}
                    
                    {/each}
                
                </div>
                <div class = "places">
                    <p>{parseInt(j.ans.duration / 3600)} hours {parseInt((j.ans.duration / 3600-parseInt(j.ans.duration / 3600))*60)} minutes</p>
                    <a href="/getjourney/{j._id}">details</a>
                </div>
            </div>
        </div>
        {/each}
        
    </div>
    
</div>
</section>

<style>
    section{
        width:90%;
        background-color: var(--dark);
        min-height: calc(100vh - 64px);
        margin: 0 auto;
        overflow-y: auto;
    }
    .journey{
        padding: 1rem;
    }
    .details{
        display:flex;
        flex-direction: column;
        place-content: center;
    }
    .journey-trail{
        font-size: 2rem;
    }
    .places{

    }
    .circle{
        border-radius: 50%;
        width: min(10vw, 96px);
        height: min(10vw, 96px);
        background: #eb8c6f;
        color: white;

        display:grid;
        place-items: center;
        font-size: calc( min(10vw, 96px) * 0.7 );
        margin-right: 1rem;
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
    @media only screen and (max-width: 600px) {
        .journey-trail{
        font-size: 1.25rem;
    }
    }
</style>
