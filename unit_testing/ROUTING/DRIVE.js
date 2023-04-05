export function chart_driveROUTE(dep_place, dep_time, cities){

    var RETURN = {}
    
    // unable to patch; do not call with an epmty 'cities' array

    // if(dep_place == undefined || dep_time == undefined || cities == undefined)
    //     return RETURN;

    // 0 - Galați
    // 1 - Alba Iulia
    // 2 - București
    // 3 - Iași
    // 4 - Timișoara
    var citymap = ['Galați', 'Alba Iulia', 'București', 'Iași', 'Timișoara'];
    var drive_times = [ 
    //    GL   AB    B   IS   TM
        [  0, 415, 167, 187, 499], // GL
        [415,   0, 251, 373, 137], // AB
        [167, 251,   0, 321, 367], // B
        [187, 373, 321,   0, 500], // IS
        [499, 137, 367, 500,   0], // TM
    ];
    var stack = [];
    var route = [];
    var cityroute = []; 
    var drivetimes = [];
    var staytimes = [];
    var mintime = 9.0071993e+15;

    // console.log(cities);

    function get_time(from, to) {
        return drive_times[from][to];
    }
    
    function get_total_time(dep_place, dep_time, testroute){
    
        var return_time = dep_time
        testroute = testroute.concat([[dep_place, 0]]);
        var current_place = dep_place;
    
        for (var i = 0; i < testroute.length; i ++){
    
            var next_place = testroute[i][0];
            var stay = testroute[i][1];
    
            var distance = get_time(current_place, next_place);
            return_time += distance * 60 + stay * 86400;
    
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

    drivetimes.push([ citymap[dep_place], cityroute[1], get_time(dep_place, route[0][0]) * 60 ]);
    for(let i = 1; i < cityroute.length - 1; i ++){
        drivetimes.push([cityroute[i], cityroute[i + 1], get_time(route[i - 1][0], route[i][0]) * 60 ]);
        staytimes.push([cityroute[i], route[i][1]]);
    }
    drivetimes.push([cityroute[route.length], citymap[dep_place], get_time(route[route.length - 1][0], dep_place) * 60 ]);
    staytimes.push([cityroute[route.length], route[route.length - 1][1]]);

    RETURN['drivetimes'] = drivetimes;
    RETURN['staytimes'] = staytimes;


    return RETURN;
}

