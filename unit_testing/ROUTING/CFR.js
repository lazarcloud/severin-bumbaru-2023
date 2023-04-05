import { createClient } from 'redis';

const client = createClient({
    socket: {
        host: '130.61.113.206',
        port: '32773'
    },
    password: 'byteforcespargelupiirosii'
});
var storage;

await client.connect();
// let batch = await client.lRange((1680728400).toString(), 0, -1);
// batch[1] = JSON.parse(batch[1]);
// console.log(batch[1]);

client.on('error', err => console.log('Redis Client Error', err));
await read(Date.now());

await client.disconnect();

export async function read(epoch_date){

    const data = [[[[{}]]]];

    for (let i = 0; i < 28; i ++) {
        data[i] = [];
        data[i].push([]);
        for (let j = 0; j < 5; j ++) {
            data[i][j] = [];
            data[i][j].push([]);
            for (let k = 0; k < 5; k ++) {
                data[i][j][k] = [];
                data[i][j][k].push([]);
                for (let l = 0; l < 4; l ++) {
                    data[i][j][k][l] = [];
                    data[i][j][k][l].push([]);
                }
            }
        }
    }

    // console.log(epoch_date)
    epoch_date /= 1000; //for miliseconds
    epoch_date = parseInt(epoch_date)

    epoch_date /= 86400;
    epoch_date = parseInt(epoch_date)
    epoch_date *= 86400;

    epoch_date += 75600; 
    //epoch_date = parseInt(epoch_date)

    console.log(epoch_date)

    for(let day = 0; day < 4; day ++){

        var newlist = ['0'];
        var batch = await client.lRange((0 * 86400 + epoch_date).toString(), 0, -1);
        console.log(batch);
        for(let From = 0; From <= 4; From ++){
            for(let to = 0; to <= 4; to ++){
                for(let c = 0; c <= 3; c ++){
                    let To = to.toString();
                    let C = c.toString();
              
                    newlist[0] = JSON.parse(batch[0]);

                    // console.log('batch = ' + newlist);

                    // console.log('batch[0] = ' + JSON.stringify(newlist[0]));
                    // console.log('batch[0][\'1\'] = ' + JSON.stringify(newlist[0]['1']['0'].trip_duration));
                    // console.log('batch = ' + batch);

                    if(batch[From][To][C] != undefined){
                        let dict = batch[From][To][C];

                        console.log('\n\n\n' + JSON.stringify(dict));
                        data[day][From][to][c] = dict;

                        //console.log('data = ' + JSON.stringify(data));
                    }
                }
            }
        }
    }
    storage = data;
    return data;
}

export async function chart_trainROUTE(no_train_overnight, no_train_change, dep_place, dep_time, cities){

    var c = no_train_overnight + no_train_change * 2;

    var data = [...storage];
    var RETURN = {};

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
            if(fr.has(city)){

                console.log('stopped ' + stack);
                return false;
            }
            fr.set(city, 'la hoha');
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
        citymap[dep_place],
        cityroute[1],
        data[dep_place][route[0][0]][c]['departure_time'],
        data[dep_place][route[0][0]][c]['arrival_time'],
        get_time(dep_place, route[0][0]) * 60,
        data[dep_place][route[0][0]][c]['url'], 
        data[dep_place][route[0][0]][c]['overnight'], 
        !data[dep_place][route[0][0]][c]['direct'], 

    ]);
    for(let i = 1; i < cityroute.length - 1; i ++){
        traintimes.push(
        [
            cityroute[i], 
            cityroute[i + 1],
            data[route[i - 1][0]][i][c]['departure_time'], 
            data[route[i - 1][0]][i][c]['arrival_time'], 
            get_time(route[i - 1][0], route[i][0]) * 60,
            data[route[i - 1][0]][i][c]['url'],
            data[route[i - 1][0]][i][c]['overnight'],
            !data[route[i - 1][0]][i][c]['direct'],
        ]);
        staytimes.push([cityroute[i], route[i][1]]);
    }
    traintimes.push(
    [
        cityroute[route.length], 
        citymap[dep_place], 
        data[route[route.length - 1][0]][dep_place][c]['departure_time'], 
        data[route[route.length - 1][0]][dep_place][c]['arrival_time'],  
        get_time(route[route.length - 1][0], dep_place) * 60, 
        data[route[route.length - 1][0]][dep_place][c]['url'],
        data[route[route.length - 1][0]][dep_place][c]['overnight'],
        !data[route[route.length - 1][0]][dep_place][c]['direct'],  
    ]);
    staytimes.push([cityroute[route.length], route[route.length - 1][1]]);

    RETURN['traintimes'] = traintimes;
    RETURN['staytimes'] = staytimes;


    return RETURN;
}