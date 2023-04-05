<script>
    export let data
    import { MapDrive } from '$lib/components'
    let departure = data.data.ans.route[0]
    let departurePrediction = data.data.ans.route[0]
    let inAddCity = data.data.ans.route[0]
    let inAddCityPrediction = data.data.ans.route[0]
    let cities = data.data.ans.route
</script>


<div style="position:absolute">
<!-- {JSON.stringify(data.data)} -->

</div>
<h1>
    <p>
        {#each cities as oras}
        {oras}
        {#if oras != cities[cities.length - 1]}
        <span> - </span>
        {/if}
        
        {/each}
    </p>
</h1>
<p>
    Journey: {data.data._id}
</p>
<p>{parseInt(data.data.ans.duration / 3600)} hours {parseInt((data.data.ans.duration / 3600-parseInt(data.data.ans.duration / 3600))*60)} minutes</p>
<section>
<MapDrive {departure} {departurePrediction} {inAddCity} {inAddCityPrediction} {cities} />

</section>
<h1>

</h1>
<style>
    p, h1{
        text-align: center;

    }
    h1{
        font-size: 2rem;
        margin-top: 2rem;
    }
    section{
        width:calc(90 * min(1vw, 1vh));
        background-color: var(--dark);
        height: 100vh;
       margin: 0 auto;
       text-align: center;
    }
    @media only screen and (max-width: 600px) {
        section{
            width:100vw;
        }
    }
</style>