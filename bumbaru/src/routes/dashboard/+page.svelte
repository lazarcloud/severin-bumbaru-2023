<script>
    import { forms, cities } from '$lib/store';
    let orase = [
        'Galați',
        'Alba Iulia',
        'București',
        'Iași',
        'Timișoara',
    ]
    let filteredData = []
    function filterData(param){
        console.log(param)
        if(param=='' || param==null || param==undefined){
            filteredData = []
            return
        }
        param = param.toLowerCase()

        filteredData = orase.filter(o => o.toLowerCase().includes(param.toLowerCase()))
        console.log(filteredData)
        filteredData.sort((a, b) => {
            a = a.toLowerCase();
            b = b.toLowerCase();
            return a.indexOf(param) - b.indexOf(param);
        });
    }
    $: filterData($forms.new)
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
</script>
{ JSON.stringify($forms) }
{ JSON.stringify($cities) }
{ JSON.stringify(filteredData) }
<section>
    <div class="tab form">
        <div class="forms">
            <form class="form">
                <h2 class="bold">Your departure</h2>
                <p>Departure location</p>
                <input type="text" placeholder="departure" bind:value={$forms.departure} />
                <p>Departure time</p>
                <input type="time" placeholder="10:00" bind:value={$forms.departureTime} />
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

    </div>
</section>
<style>
    /* *{
        outline: 1px solid red;
    } */
    section{
        display:grid;
        grid-template-columns: 1fr 2fr;
        column-gap: 1rem;
    }
    form{
        display:flex;
        flex-direction: column;
        background-color: aquamarine;
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
    }
</style>