<script>
    import { persons, presents, speakers, menus } from '$lib/persons.js';
    function addPresent(person){
        if($presents.includes(person)){
            return
        }
        presents.update(n => [...n, person])
    }
    function swap(person){
        $speakers[0] = person
    }
</script>

<h2>Yield</h2>

<section>
    <div class="buttons">
        <button class="btn" on:click={() => menus.update(n => {n.yield = false; return n})}>Inchide ieldu</button>
    </div>
    {#each $presents as present}
        {#if $speakers[0]!= present}
        <div class="member">
            <img src="/avatar.png" alt="avatar" />
            <button on:click={() => swap(present)}>{present}</button>
        </div>
        {/if}
    {/each}
    {#if $speakers.length<=1}
        <p>Not enough pressent people</p>
    {/if}
</section>

<style>
    h2{
        text-align: center;
    }
    img{
        height: 60%;
    }
    .buttons{
        display:grid;
        grid-template-columns: 1fr;
        width: clamp(300px, 50%, 500px);
    }
    .member{
        display: flex;
        align-items: center;
        gap: 2rem;
        width: 100%;
        height: 64px;
        border-radius: 0.5rem;
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
</style>