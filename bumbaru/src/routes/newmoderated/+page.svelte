<script>
    import Present from '$lib/Present.svelte';
    import Yield from '$lib/Yield.svelte';
    import { persons, presents, speakers, menus } from '$lib/persons.js';
    import { Timer, Icons } from '$lib/components'
    let timerMenu = 0
    let timerMenuBig = 0
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
                if(time>0){
                    time--
                    timeBig--
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
        timeBig = maxTimeBig
        clearInterval(timer)
        timer = 0
    }
    let maxTime = 60
    let maxTimeBig = 600
    let time = maxTime
    let timeBig = maxTimeBig
    let toSet = time % 60
    let toSetMinutes = Math.floor(time / 60)
    let toSetBig = timeBig % 60
    let toSetMinutesBig = Math.floor(timeBig / 60)
    function setTimer(){
        toSet = parseInt(toSet)
        toSetMinutes = parseInt(toSetMinutes)
        time = toSet + toSetMinutes -(maxTime - time)
        maxTime = toSet + toSetMinutes * 60
        resetTimer()
        timerMenu = 0
    }
    function setTimerBig(){
        toSetBig = parseInt(toSetBig)
        toSetMinutesBig = parseInt(toSetMinutesBig)
        timeBig = toSetBig + toSetMinutesBig -(maxTimeBig - timeBig)
        maxTimeBig = toSetBig + toSetMinutesBig * 60
        resetTimer()
        timerMenuBig = 0
    }
</script>
<section>
    <div class="container">
        <div class="left panel">
            <div class="menu">
                <h2 class="bold">Dashboard</h2>
                <div class="timer">
                    <div class="timers">
                        <Timer time={timeBig} maxTime={maxTimeBig} />
                        <Timer time={time} maxTime={maxTime} />
                    </div>
                    <div class="buttons">
                        <button class="btn timerButton" on:click={() => toggleTimer()}>{timer==0?'Start':'Stop'}</button>
                        <button class="btn timerButton" on:click={() => resetTimer()}>Reset</button>
                        <button class="btn" on:click={() => timerMenu = 1}>Change time</button>
                        <button class="btn" on:click={() => timerMenuBig = 1}>Change total time</button>
                        <button class="btn" on:click={() => menus.update(n => {n.yield = true; return n})}>Yield</button>
                    </div>

                </div>
                <div class="speaking ">
                    <h2 class="bold">Speaking</h2>
                    {#each $speakers as person, index}
                    {#if index == 1}
                    <h2>Next Speaker</h2>
                    {/if}
                    {#if index == 0}
                    <h2>Current Speaker</h2>
                    <div class="member bigMember">
                        <img src="/avatar.png" alt="avatar" />
                        <p>{person}</p>
                        <div class="flex">
                            <button class="btn" on:click={moveUp(person)}>Up</button>
                            <button class="btn" on:click={moveDown(person)}>Down</button>
                            <button class="btn" on:click={nextSpeaker(person)}>Next speaker</button>
                        </div>
                    </div>
                    {:else}
                    <div class="member bigMember">
                        <img src="/avatar.png" alt="avatar" />
                        <p>{person}</p>
                        <div class="flex">
                            <button class="btn" on:click={moveUp(person)}>Up</button>
                            <button class="btn" on:click={moveDown(person)}>Down</button>
                            <button class="btn" on:click={removeFirstSpeaker(person)}>Remove</button>
                        </div>

                    </div>
                    {/if}
                        
                    {/each}
                    {#if $speakers.length == 0}
                        <p>There are no people speaking in the room.</p>
                    {/if}
                </div>
            </div>
        </div>
        <div class="people right panel">
            <h2 class="bold">My committee</h2>
            <div class="ppl scroll">
                {#each $presents as present}
                    {#if $speakers.includes(present)}
                        <div class="member">
                            <img src="/avatar.png" alt="avatar" />
                            <button class="gray">{present}</button>
                        </div>
                    {:else}
                        <div class="member">
                            <img src="/avatar.png" alt="avatar" />
                            <p on:click={addToList(present)}>{present}</p>
                        </div>
                    {/if}
                {/each}
            </div>
            {#if $presents.length == 0}
                <p>There are no people present in the room.</p>
            {/if}
            <Icons count={$presents.length} />
            <button class="btn" on:click={() => menus.update(n => {n.present = true; return n})}>Present</button>
        </div>
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
{#if timerMenu}
    <div class="overlay">
        <div class="timeMenu">
            <button class="btn" on:click={() => timerMenu = 0}>Close menu</button>
            <p>Minutes</p>
            <input class="btn" type="text" bind:value={toSetMinutes} />

            <p>Seconds</p>
            <input class="btn" type="text" bind:value={toSet} />

            <button class="btn" on:click={() => setTimer()}>Set time</button>

        </div>
    </div>
{/if}
{#if timerMenuBig}
    <div class="overlay">
        <div class="timeMenu">
            <button class="btn" on:click={() => timerMenuBig = 0}>Close menu</button>
            <p>Minutes</p>
            <input class="btn" type="text" bind:value={toSetMinutesBig} />

            <p>Seconds</p>
            <input class="btn" type="text" bind:value={toSetBig} />

            <button class="btn" on:click={() => setTimerBig()}>Set time</button>

        </div>
    </div>
{/if}
<style>
    section{
        width:100%;
        background-color: var(--dark);
        min-height: calc(100vh - 64px);
        padding-top: 1rem;
    }
    .container{
        display:grid;
        grid-template-columns: 2fr 1fr;
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
        min-height: 85vh;
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
    .member > p{
        cursor: pointer;
    }
    .text{
        padding-block: 1.5rem;
    }
    h1{
        font-size: 2.5rem;
    }
    img{
        height: 60%;
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
    .buttons{
        width: 100%;
        display:flex;
        align-items: center;
        justify-content: space-evenly;
    }
    .scroll{
        height: 55vh;
        margin-bottom: 1rem;
        overflow-y: auto;
    }
    .timeMenu{
        display: flex;
        flex-direction: column;
    }
   
    
    .gray{
        opacity: 0.5;
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
    .timers{

    }
</style>