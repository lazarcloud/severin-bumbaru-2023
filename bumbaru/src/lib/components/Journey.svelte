<script>
    export let ans = {
    "route": [
        "Iași",
        "Galați"
    ],
    "arrival_epoch_time": 1680848040,
    "duration": 195240,
    "drivetimes": [
        [
            "Iași",
            "Galați",
            11220
        ],
        [
            "Galați",
            "Iași",
            11220
        ]
    ],
    "staytimes": [
        [
            "Galați",
            2
        ]
    ],
    "_id": "51e2063d96a9787f"
}
    import { MapDrive } from '$lib/components'
    let departure = ans.route[0]
    let departurePrediction = ans.route[0]
    let inAddCity = ans.route[0]
    let inAddCityPrediction = ans.route[0]
    let cities = ans.route
</script>

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
    Journey: {ans._id}
</p>
<p>{parseInt(ans.duration / 3600)} hours {parseInt((ans.duration / 3600-parseInt(ans.duration / 3600))*60)} minutes</p>
<p>
    {#each ans.staytimes as oras}
    {oras}zile
    {#if oras != ans.staytimes[cities.length - 1]}
    <span> - </span>
    {/if}
    
    {/each}
</p>
<p>
    {#each ans.drivetimes as [o1, o2, zile], index}
    {o1}
    {o2}
    {(zile/3600).toFixed(2)}ore
    {#if index != cities.length - 1}
    <span> - </span>
    {/if}
    
    {/each}
</p>
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