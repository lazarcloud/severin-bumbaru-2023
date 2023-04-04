import { createClient } from 'redis';

const client = createClient("redis://:byteforcespargelupiirosii@130.61.113.206:32773/");
const storage = [];

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();
read(Date.now());
await client.disconnect();

export async function read(epoch_date){

    const data = [];

    epoch_date /= 1000; //for miliseconds
    epoch_date /= 86400;
    for(let day = 0; day < 28; day ++){

        const batch = await client.get(stringify(i + epoch_date + 1));
        for(let from = 0; from <= 4; from ++){
            for(let to = 0; to <= 4; to ++){
                for(let c = 0; c <= 3; c ++)
                    a[day][from][to][c] = batch.stringify(from).stringify(to).stringify(c);
            }
        }
    }
    storage = data;
    return data;
}

export async function chart_trainROUTE(no_train_overnight, no_train_change, dep_place, dep_time, cities){

    var c = no_train_overnight + no_train_change * 2;

    var data = storage
    var RETURN = {}

    var citymap = ['Galați', 'Alba Iulia', 'București', 'Iași', 'Timișoara'];
    var stack = [];
    var route = [];
    var cityroute = []; 
    var traintimes = [];
    var staytimes = [];
    var mintime = 9.0071993e+15;

    // console.log(cities);

    function get_time(current_day, from, to) {
        return data[current_day][from][to][c].trip_duration;
    }
    
    function get_total_time(dep_place, dep_time, testroute){
    
        var day = 0;

        var return_time = dep_time
        testroute = testroute.concat([[dep_place, 0]]);
        var current_place = dep_place;
    
        for (var i = 0; i < testroute.length; i ++){
    
            var next_place = testroute[i][0];
            var stay = testroute[i][1];
    
            var distance = get_time(day, current_place, next_place);
            return_time += distance * 60 + stay * 86400;

            if(return_time > 86400 * (day + 1))
                day ++;

            current_place = next_place;
        }
        return return_time;   
    }

    function unique(k){
        const fr = new Map();
        for(let i = 0; i <= k; i++){
            const city = stack[i][0];
            const stay = stack[i][1];
            if(fr.has(city) && fr.get(city) === stay){

                console.log('stopped ' + stack);
                return false;
            }
            fr.set(city, stay);
        }
        return true;
    }

    function check(time){
        if(time <= mintime){
            mintime = time;            
            route = [...stack];
        }
    }
    
    function bck_loop(k, dep_place, dep_time, cities){
        for(let i = 0; i < cities.length; i ++){
            stack[k] = cities[i];
            console.log(stack);
            if(unique(k))
                if(k == cities.length - 1){

                        check(get_total_time(dep_place, dep_time, stack));
                        return 0;
                }
                else
                    bck_loop(k + 1, dep_place, dep_time, cities);
        } 
    }

    
    bck_loop(0, dep_place, dep_time, cities);
    console.log('\n')

    cityroute.push(citymap[dep_place]);
    for(let i = 0; i < route.length; i ++)
        cityroute.push(citymap[route[i][0]]);

    RETURN['route'] = cityroute;
    RETURN['arrival_epoch_time'] = mintime;
    RETURN['duration'] = mintime - dep_time;

    // console.log(dep_place + ' ' + route[0][0] + ' ' + get_time(dep_place, route[0][0]));

    traintimes.push(
    [ 
        cityroute[dep_place],
        cityroute[1],
        data[dep_place][route[0][0]][c].departure_time,
        data[dep_place][route[0][0]][c].arrival_time,
        get_time(dep_place, route[0][0]) * 60,
        data[dep_place][route[0][0]][c].url 
    ]);
    for(let i = 1; i < cityroute.length - 1; i ++){
        traintimes.push(
        [
            cityroute[i], 
            cityroute[i + 1],
            data[route[i - 1][0]][i][c].departure_time, 
            data[route[i - 1][0]][i][c].arrival_time, 
            get_time(route[i - 1][0], route[i][0]) * 60,
            data[route[i - 1][0]][i][c].url
        ]);
        staytimes.push([cityroute[i], route[i][1]]);
    }
    traintimes.push(
    [
        cityroute[route.length], 
        cityroute[dep_place], 
        data[route[route.length - 1][0]][dep_place][c].departure_time, 
        data[route[route.length - 1][0]][dep_place][c].arrival_time,  
        get_time(route[route.length - 1][0], dep_place) * 60, 
        data[route[route.length - 1][0]][dep_place][c].url  
    ]);
    staytimes.push([cityroute[route.length], route[route.length - 1][1]]);

    RETURN['traintimes'] = traintimes;
    RETURN['staytimes'] = staytimes;


    return RETURN;
}