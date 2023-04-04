<script>
    import { forms, cities } from '$lib/store';
    import { Timer, Map } from '$lib/components';
    let orase = [
        'Galați',
        'Alba Iulia',
        'București',
        'Iași',
        'Timișoara',
    ]
    let filteredData = []
    let filteredData2 = []
    let departurePrediction
    let newPrediction
    $: departurePrediction = filteredData2.length==0?$forms.departure:filteredData2[0]
    $: newPrediction = filteredData.length==0?$forms.new:filteredData[0]
    function removeSelectedCity(array){
        return array.filter((element) => !$cities.includes(element));
    }
    function filterData(param){
        let emptyArray
        console.log(param)
        if(param=='' || param==null || param==undefined){
            emptyArray = []
            return emptyArray
        }
        param = param.toLowerCase()

        emptyArray = orase.filter(o => o.toLowerCase().includes(param.toLowerCase()))
        console.log(emptyArray)
        emptyArray.sort((a, b) => {
            a = a.toLowerCase();
            b = b.toLowerCase();
            return a.indexOf(param) - b.indexOf(param);
        });
        if(emptyArray[0].toLowerCase() == param.toLowerCase()){
            emptyArray = []
        }
        return emptyArray
    }
    $: filteredData = removeSelectedCity(filterData($forms.new))
    $: filteredData2 = filterData($forms.departure)
    function addNewCity(city){
        if($cities.includes(city)){
            return
        }
        cities.update(n => [...n, city])
        $forms.new = ''
    }
    function addNewCityForm(){
        if(filteredData.length==0){
            $forms.new = ''
            return
        }
        addNewCity($forms.new)
    }
    function removeCity(city){
        cities.update(n => n.filter(c => c !== city))
    }
    function addDepartureCity(){
        if(filteredData2.length==0){
            $forms.departure = ''
            return
        }
        $forms.departure = filteredData2[0]
        // on:focus={()=>newCity = newCity} on:blur={()=>filteredData=[]} 
    }
</script>
<!-- <div class="debug" style="position:absolute;">
    { JSON.stringify($forms) }
{ JSON.stringify($cities) }
{ JSON.stringify(filteredData) }
{ JSON.stringify(filteredData2) }
</div> -->
<section>
    <div class="tab form">
        <div class="forms">
            <form class="form">
                <h2 class="bold">Your departure</h2>
                <p>Departure location</p>
                <input type="text" placeholder="departure" bind:value={$forms.departure} />
                {#each filteredData2 as city}
                    <button on:click={ addDepartureCity(city) }>{city}</button>
                {/each}
                <p>Departure time</p>
                <div class="input">
                    <Timer time={$forms.departureTime}/>
                    <input type="time" placeholder="10:00" bind:value={$forms.departureTime} />
                </div>
            </form>
            <form class="form" autocomplete="off">
                <h2 class="bold">Your destination(s)</h2>
                <p>Add new destination</p>
                <input type="text" placeholder="new city" bind:value={$forms.new} autocomplete="off" />
                {#each filteredData as city}
                    <button on:click={ addNewCity(city) }>{city}</button>
                {/each}
                <input type="submit" value="Add" on:click|preventDefault={() => addNewCityForm()} />
                {#each $cities as city}
                    <p>{city}</p>
                    <button class="btn" on:click|preventDefault={() => removeCity(city)}>Remove</button>
                {/each}
            </form>
        </div>
        
    </div>
    <div class="tab map">
        <Map departurePrediction={departurePrediction} departure={$forms.departure} inAddCity={$forms.new} inAddCityPrediction={newPrediction} cities={$cities} />
    </div>
</section>
<style>
    /* *{
        outline: 1px solid red;
    } */
    section{
        display:grid;
        grid-template-columns: 1fr 2fr;
        column-gap: 1vw;
    }
    form{
        display:flex;
        flex-direction: column;
        background-color: var(--light);
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 1rem;
        min-height: 30vh;
    }
    h2{
        font-size: 2rem;
    }
    input{
        margin: 0.5rem 0;
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid var(--dark);
        width: 100%;
    }
    ::-webkit-calendar-picker-indicator {
        display: none;
    }
    .input{
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .tab{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    @media only screen and (max-width: 600px) {
		section{
            display:grid;
            grid-template-rows: 1fr 2fr;
            grid-template-columns: 1fr;
            row-gap: 1vw;
        }
	}
</style>