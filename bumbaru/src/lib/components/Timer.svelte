<script>
    import clockLong from '$lib/imgs/clockLong.png'
    import clockShort from '$lib/imgs/clockShort.png'
    export let time = '8:00'
</script>
<section>
    <img src={clockLong} alt="clock" style="transform: rotate({time.split(':')[1]*360/60 - 90}deg);"/>
    <img src={clockShort} alt="clock" style="transform: rotate({time.split(':')[0]*360/12 - 90}deg);"/>
</section>

<style>
    section{
        width: 2rem;
        aspect-ratio: 1/1;
        position: relative;
    }
    img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: transform 0.5s;
    }
</style>