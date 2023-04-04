export function chart_driveROUTE(dep_place, dep_time, cities){

    // 0 - Galați
    // 1 - Alba Iulia
    // 2 - București
    // 3 - Cluj
    // 4 - Timișoara

    var drive_times = [ 
        //    GL   AB    B   CJ   TM
        [  0, 415, 167, 444, 499], // GL
        [415,   0, 251,  76, 137], // AB
        [167, 251,   0, 319, 367], // B
        [444,  76, 319,   0, 228], // CJ
        [499, 137, 367, 228,   0], // TM
    ];
    var stack = [];
    var route = [];
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

                //console.log('stopped ' + stack);
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
    //console.log('\n')

    
    return route;
}

