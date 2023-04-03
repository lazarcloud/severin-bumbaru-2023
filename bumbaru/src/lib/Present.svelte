<script>
    import { persons, presents, speakers, menus } from '$lib/persons.js';
    function addPresent(person){
        if($presents.includes(person)){
            return
        }
        presents.update(n => [...n, person])
    }
</script>

<h2>Present people</h2>

<section>
    <div class="buttons">
        <button class="btn" on:click={() => presents.set([])}>Clear All</button>
        <button class="btn" on:click={() => presents.set($persons)}>Add All</button>
        <button class="btn" on:click={() => menus.update(n => {n.present = false; return n})}>Inchide prezenta</button>
    </div>

    <div class="scroll">
        {#each $persons as person}
            <div class="member bigMember {$presents.includes(person)?'prezent':'absent'}">
                <p>{person}</p>
                <div class="flex">
                    <button class="btn prezentButton" style="opacity:{$presents.includes(person)?'1':'0.5'};" on:click={() => addPresent(person)}>P</button>
                    <button class="btn absentButton" style="opacity:{$presents.includes(person)?'0.5':'1'};" on:click={() => presents.update(n => n.filter(p => p != person))}>A</button>
                </div>
            </div>
        {/each}
    </div>
</section>

<style>
    .member{
        display:grid;
        grid-template-columns: 2fr 0.5fr 0.5fr;
        align-items:center;
        width: clamp(300px, 50%, 500px);
    }
    h2{
        text-align: center;
    }
    .buttons{
        display:grid;
        grid-template-columns: 1fr 1fr 1fr;
        width: 100%;
    }
    .flex{
        display: flex;
    }
    .member{
        display: flex;
        align-items: center;
        gap: 2rem;
        width: 100%;
        height: 64px;
        border-radius: 0.5rem;
    }
    .bigMember{
        justify-content: space-between;
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
    .scroll{
        height: 40vh;
        margin-bottom: 1rem;
        overflow-y: auto;
    }
    section{
        overflow-y: auto;
    }
    .prezent>.prezentButton{
        opacity: 1;
    }
    .prezent>.absentButton{
        opacity: 0.5;
    }
    .absent>.prezentButton{
        opacity: 0.5;
    }
    .absent>.absentButton{
        opacity: 1;
    }
</style>