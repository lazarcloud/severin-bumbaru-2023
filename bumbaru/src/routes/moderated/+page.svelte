<script>
    import Present from '$lib/Present.svelte';
    import Yield from '$lib/Yield.svelte';
    import { persons, presents, speakers, menus } from '$lib/persons.js';
    function addToList(person){
        if($speakers.includes(person)){
            return
        }
        speakers.update(n => [...n, person])
    }
    function removeSpeaker(person){
        speakers.update(n => n.filter(p => p != person))
    }
    function nextSpeaker(){
        let newSpeakers = $speakers
        newSpeakers.shift()
        speakers.set(newSpeakers)
        if(timer!=0){
            clearInterval(timer)
            timer = 0
        }
        time=maxTime
    }
    function removeFirstSpeaker(person){
        //removes first speaker with name person
        speakers.update(n => {
            let index = n.indexOf(person)
            if(index == -1){
                return n
            }
            n.splice(index, 1)
            return n
        })
    }
    function moveUp(person){
        speakers.update(n => {
            let index = n.indexOf(person)
            if(index == 0){
                return n
            }
            let temp = n[index]
            n[index] = n[index - 1]
            n[index - 1] = temp
            return n
        })
    }
    function moveDown(person){
        speakers.update(n => {
            let index = n.indexOf(person)
            if(index == n.length - 1){
                return n
            }
            let temp = n[index]
            n[index] = n[index + 1]
            n[index + 1] = temp
            return n
        })
    }
    let timer = 0
    function toggleTimer(){
        console.log(timer)
        if(timer==0){
            timer = setInterval(() =>{
                if(time>0 && fullTime>0){
                    time--
                    fullTime--
                }else{
                    clearInterval(timer)
                    timer = 0
                }
            }, 1000)
        }else{
            clearInterval(timer)
            timer = 0
        }
    }
    function resetTimer(){
        time = maxTime
        clearInterval(timer)
        timer = 0
    }
    let maxTime = 60
    let maxFullTime = 60 * 5;
    let fullTime = maxFullTime;
    let time = maxTime
    let toSet = maxTime
    function setTimer(){
        toSet = parseInt(toSet)
        time = toSet-(maxTime - time)
        maxTime = toSet
    }
    let toSetFullTime = maxFullTime
    function setFullTime(){
        toSetFullTime = parseInt(toSetFullTime)
        fullTime = toSetFullTime
        maxFullTime = toSetFullTime
    }
    function resetTimerFull(){
        fullTime = maxFullTime;
    }
</script>
<h1>Dashboard</h1>
<div class="buttons">
    {#if !$menus.present}
        <button on:click={() => menus.update(n => {n.present = true; return n})}>Present</button>
    {/if}
</div>
<section>
    <div class="menu">
        <h2>My timer</h2>

        <div class="timer">
            <h1>{fullTime}/{maxFullTime}</h1>
            <h1>{time}/{maxTime}</h1>
            <div class="buttons">
                <button on:click={() => toggleTimer()} class="timerButton">{timer==0?'Start':'Stop'}</button>
                <button on:click={() => resetTimer()} class="timerButton">Reset</button>
                <button on:click={() => nextSpeaker()}>Next Speaker</button>
                <button on:click={() => menus.update(n => {n.yield = true; return n})}>Yield</button>
                <input class="btn" type="text" bind:value={toSet} />
                <button on:click={() => setTimer()}>Set time</button>
            </div>
            <div class="buttons">
                <button on:click={() => resetTimerFull()} class="timerButton">Reset Full Timer</button>
                <input class="btn" type="text" bind:value={toSetFullTime} />
                <button on:click={() => setFullTime()}>Set Big time</button>
            </div>

        </div>
        <div class="speaking">
            <h2>Speaking</h2>
            {#each $speakers as person, index}
            {#if index == 0}
            <h2>Current Speaker</h2>
            {/if}
            {#if index == 1}
            <h2>Next Speaker</h2>
            {/if}
                <div>
                    <button>{person}</button>
                    <button on:click={moveUp(person)}>Up</button>
                    <button on:click={moveDown(person)}>Down</button>
                    <button on:click={removeFirstSpeaker(person)}>Remove</button>
                </div>
            {/each}
            {#if $speakers.length == 0}
                <p>There are no people speaking in the room</p>
            {/if}
        </div>
    </div>
    <div class="people">
        <h2>My committee</h2>
        <div class="ppl">
            {#each $presents as present}
                {#if $speakers.includes(present)}
                    <div class="member">
                        <button class="gray">{present}</button>
                    </div>
                {:else}
                    <div class="member">
                        <button on:click={addToList(present)}>{present}</button>
                    </div>
                {/if}
            {/each}
        </div>
        {#if $presents.length == 0}
            <p>There are no people present in the room</p>
        {/if}
    </div>
</section>
{#if $menus.present}
    <div class="overlay">
        <Present />
    </div>
{/if}
{#if $menus.yield}
    <div class="overlay">
        <Yield />
    </div>
{/if}





<style>
    section{
        display:grid;
        grid-template-columns: 1fr 1fr;
        align-items:start;
    }
    .menu{
        display:grid;
        grid-template-rows: 0.25fr 1fr 2fr;
    }
    .buttons{
        width: 100%;
    }
    .gray{
        opacity: 0.5;
    }
    .member{
        margin-bottom: 1rem;
    }
    .people{
        display:grid;
        grid-template-rows: 0.25fr 2fr;
    }
    .overlay{
        position: fixed;
        top: 20%;
        left: 10%;
        width: 80%;
        height: 60%;
        background-color: white;
        z-index: 100;
        border-radius: 0.25rem;
        border: 1px solid black;
        padding: 1rem;
        box-sizing: border-box;
    }
    .speaking, .ppl{
        display:grid;
        align-items: center;
        justify-items: center;
        margin-top: 1px solid black;
        padding-top: 1rem;
        max-height:300px;
    }
    h2{
        text-align:center;
    }
</style>