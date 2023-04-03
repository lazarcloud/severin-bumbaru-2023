<script>
    import { persons, presents, speakers } from '$lib/persons.js';
    import { slide, fly, fade } from 'svelte/transition';

    let members = []
    let newmember = ''
    function addMember(){
        if(newmember == ''){
            return
        }
        if($persons.includes(newmember)){
            return
        }
        persons.update(n => [...n, newmember])
        newmember = ''
    }
    function deletePerson(person){
        persons.update(n => n.filter(p => p != person))
        presents.update(n => n.filter(p => p != person))
        speakers.update(n => n.filter(p => p != person))
    }
    function deleteAll(){
        persons.set([])
        presents.set([])
        speakers.set([])
    }
</script>

<svelte:head>
	<title>Mun Home</title>
	<meta name="description" content="Lazar MUN" />
</svelte:head>

<section>
    <div class="container text">
        <h1>Welcome, let's spark a <span class="medium">adventure</span>!</h1>
    </div>
    <div class="container">
        <div class="form panel">
        <h2 class="bold">New committee</h2>
        <h3>Add members</h3>
        <form on:submit|preventDefault={addMember}>
            <input type="text" placeholder="Name" bind:value={newmember} >
            <input type="submit" value="Add">
        </form>
            
        <div class="bottom">
            <a class="btn" href="/dashboard">Start</a>
        </div>
            
        </div>
        
        
        <div class="ppl panel">
            <h2 class="bold">Your committee</h2>
            <h3>{$persons.length} members</h3>
            <div class="scroll">
                {#each $persons as person}
                    <div class="member">
                        <img src="/avatar.png" alt="avatar">
                        <p>{person}</p>
                        <button class="btn" on:click={deletePerson(person)}>delete</button>
                    </div>
                {/each}
            </div>
            <div class="">
                <button class="btn" on:click={() => deleteAll()}>Clear All</button>
            </div>
        </div>
    </div>
</section>

<style>
    section{
        width:100%;
        background-color: var(--dark);
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
