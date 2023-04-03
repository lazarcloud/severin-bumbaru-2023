<script>
    export let time = 100
    export let maxTime = 100
    let minutes, seconds;
    $: minutes = Math.floor(time / 60)
    $ : seconds = time % 60
    $: maxMinutes = Math.floor(maxTime / 60)
    $: maxSeconds = maxTime % 60
    $: if(seconds<10){
        seconds = "0" + seconds
    }
    $: if(maxSeconds<10){
        maxSeconds = "0" + maxSeconds
    }
</script>

<section>
    <div>
        {minutes}:{seconds}/{maxMinutes}:{maxSeconds}
    </div>
</section>

<style>
    section{
        width: 100%;
        margin: 4px;
    }
    div{
        background-color: var(--primary);
        width: 40%;
        text-align: center;
        padding: 2rem;
        border-radius: 0.5rem;
        font-size: 2rem;
        color: white;
        margin: 0 auto;
    }
</style>