<svelte:head>
	<title>Journey - {data.id} </title>
	<meta name="description" content="Travel" />
</svelte:head>

<script>
    import { forms, cities } from '$lib/store';
    import { Timer, Map } from '$lib/components';
    export let data
    let buttonStatus = 'Get Route'
    let orase = [
        'Galați',
        'Alba Iulia',
        'București',
        'Iași',
        'Timișoara',
    ]
    let anss = []
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
        if(emptyArray.length > 0 && emptyArray[0].toLowerCase() == param.toLowerCase()){
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
    import { socket } from '$lib/socket';
  import { dataset_dev } from 'svelte/internal';
    function getRoute(){
        console.log('fetching route...')
        buttonStatus = 'Loading...'
        const sms = {
            myid: data.user.userdata._id,
            id: data.id,
            departure: $forms.departure,
            cities: $cities,
            method: selectedVehicle,
            departureDate: $forms.departureDate,
            departureTime: $forms.departureTime
        }
        console.log(sms)
        $socket.emit('request', sms);
    }
    $socket.on('response', (sms) => {
        buttonStatus = 'Fetched!'
        // let ansswithoutid = anss.map((ans) => {
        //     delete ans['_id']
        //     return ans
        // })
        // let emptysms = sms.ans
        // delete emptysms['_id']
        // if(!ansswithoutid.includes(emptysms)){
            
        // }
        console.log(sms)

        // if(sms.type=='new'){
        //     anss.push(sms.ans)
        //     anss = anss
        // }else if(sms.type=='old'){
        //     //replace dict from anss with id = sms.ans._id with sms.ans
        //     anss = anss.map((ans) => {
        //         if(ans._id==sms.ans._id){
        //             return sms.ans
        //         }else{
        //             return ans
        //         }
        //     })
        //     anss = anss

        // }
        anss[0] = sms.ans
        let ur = sms._id
        console.log(ur)
            
    })
    let selectedVehicle = 'car';
    function formatDate(dateStr){
        const parts = dateStr.split('/');
        const year = parts[2];
        const month = parts[0].padStart(2, '0');
        const day = parts[1].padStart(2, '0');
        const newDateStr = `${year}-${month}-${day}`;
        return newDateStr
    }
    let tab = 1
    function setTab(t){
        tab = t
        document.getElementsByClassName('form1')[0].style.display = tab==1?'flex':'none'
        document.getElementsByClassName('form2')[0].style.display = tab==2?'flex':'none'
        document.getElementsByClassName('form3')[0].style.display = tab==3?'flex':'none'

    }
    import { onMount } from 'svelte';
    let isMobile = true
    function query(e) {
        // Reset mobile state
        console.log(e)
        isMobile = e.matches;
        if(isMobile==false){
        document.getElementsByClassName('form1')[0].style.display ='flex'
        document.getElementsByClassName('form2')[0].style.display ='flex'
        document.getElementsByClassName('form3')[0].style.display ='flex'
    }
    if(isMobile==true){
        setTab(1)
    }
    };
    onMount(() => {
        const mediaListener = window.matchMedia("(max-width: 600px)");
        
        mediaListener.addListener(query);
        query(mediaListener)
    });
    
    
    $forms.departureDate = formatDate((new Date(Date.now())).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }))
    import { Journey } from '$lib/components'
</script>
<!-- <div class="debug" style="position:absolute;">
    { JSON.stringify($forms) }
{ JSON.stringify($cities) }
{ JSON.stringify(filteredData) }
{ JSON.stringify(filteredData2) }
</div> -->

{#each anss as ans}
<div class="ansss" style="">
    <button class="cbtn selected" on:click={()=>{
        buttonStatus = 'Get Route'
        anss = []
    }}>X</button>
    <Journey ans={ans} />
</div>
{/each}

<section style="display:{anss.length == 0?'grid':'none'};">
    <div class="tab form">
        <div class="forms">
            <form class="form form1">
                <h2 class="bold">Your departure</h2>
                <p>Departure location</p>
                <input type="text" placeholder="departure" bind:value={$forms.departure} />
                {#each filteredData2 as city}
                    <button on:click={ addDepartureCity(city) }>{city}</button>
                {/each}
                <p>Departure date</p>
                
                <input type="date" bind:value={$forms.departureDate} />
                <p>Departure time</p>
                <div class="input">
                    <Timer time={$forms.departureTime}/>
                    <input type="time" placeholder="10:00" bind:value={$forms.departureTime} />
                </div>
            </form>
            <form class="form form2" autocomplete="off">
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
            <form class="form form3 small">
                <h2 class="bold">Send</h2>
                <div class="radio">
                    <label for="car-radio">Car</label>
                    <input type="radio" name="vehicle-type" id="car-radio" value="car" bind:group={selectedVehicle}>
                    <label for="train-radio">Train</label>
                    <input type="radio" name="vehicle-type" id="train-radio" value="train" bind:group={selectedVehicle}>
                  </div>
                  <div class="radio">
                    <label for="car-radio" style="font-size:0.8rem;">Direct train</label>
                    <input type="checkbox" name="vehicle-type" id="car-radio" value="car">
                    <label for="train-radio" style="font-size:0.8rem;">Not night train</label>
                    <input type="checkbox" name="vehicle-type" id="train-radio" value="train">
                  </div>
                <input type="submit" value="{buttonStatus}" on:click|preventDefault={()=>getRoute()}/>
                <input type="submit" value="Reset Form" on:click|preventDefault={()=>{
                    $forms.departure = ''
                    $forms.departureDate = ''
                    $forms.departureTime = ''
                    $forms.new = ''
                    $cities = []
                    buttonStatus = 'Get Route'
                }}/>
            </form>
            <div class="controls">
                <button class="cbtn {tab==1?'selected':''}" on:click={() => setTab(1)}>1</button>
                <button class="cbtn {tab==2?'selected':''}" on:click={() => setTab(2)}>2</button>
                <button class="cbtn {tab==3?'selected':''}" on:click={() => setTab(3)}>3</button>
            </div>
        </div>
        
    </div>
    <div class="tab map">
        <Map departurePrediction={departurePrediction} departure={$forms.departure} inAddCity={$forms.new} inAddCityPrediction={newPrediction} cities={$cities} />
    </div>
</section>

<style>
    .ansss{
        width: 100%;
        height: calc(100vh - 64px);
        padding:1rem;
        position:absolute;
        z-index:1000000;
        background-color: var(--dark);
        overflow: hidden;
    }
    .radio{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    /* *{
        outline: 1px solid red;
    } */
    section{
        display:grid;
        grid-template-columns: 1fr 2fr;
        column-gap: 1vw;
        background-color:var(--light);
        min-height: calc(100vh - 64px);
        counter-reset: section;
    }
    form{
        display:flex;
        flex-direction: column;
        background-color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 1rem;
        min-height: 30vh;
        position: relative;
    }
    form::before{
        --size: 32px;
        counter-increment: section;
        content: counter(section);
        position: absolute;
        top: calc(-1 * var(--size) / 2.5);
        left: calc(-1 * var(--size) / 2.5);
        width: var(--size);
        height: var(--size);
        background-color: var(--primary);
        border-radius: 69rem;
        display: grid;
        color:white;
        place-content: center;
    }
    .small{
        min-height: 10vh;
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
    input[type="submit"]{
		background-color: var(--primary);
		color: white;
		border: none;
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
    .controls{
        display: none;
    }
    @media only screen and (max-width: 600px) {
		section{
            display:grid;
            grid-template-rows: 4fr 2fr;
            grid-template-columns: 1fr;
            row-gap: 1vw;
        }
        .forms{
            position:relative;
            width: 100%;
            min-height: 40vh;
            /* background-color:red; */
            margin: 0 auto;
            top: 0;
            display: flex;
            /* align-items: center; */
            justify-content: center;
        }
        form{
            position:absolute;
            width: clamp(300px, 70vw, 500px);
            border: 1px solid var(--primary)
        }
        form::before{
            display:none;
        }
        .form1{
            display:flex;
        }
        .form2{
            display:none;
        }
        .form3{
            display:none;
        }
        .controls{
            display: flex;
            position: absolute;
        }
        .cbtn{
            --size: 32px;
            width: var(--size);
            height: var(--size);
            background-color: white;
            border: 1px solid var(--primary);
            border-radius: 69rem;
            display: grid;
            color:black;
            place-content: center;
        }
        .cbtn.selected{
            background-color: var(--primary);
            border: none;
            color:white;
        }
	}
    .cbtn{
            --size: 32px;
            width: var(--size);
            height: var(--size);
            background-color: white;
            border: 1px solid var(--primary);
            border-radius: 69rem;
            display: grid;
            color:black;
            place-content: center;
        }
        .cbtn.selected{
            background-color: var(--primary);
            border: none;
            color:white;
        }
</style>