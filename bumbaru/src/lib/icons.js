import json from '$lib/locations.json';
let data = json.cities
let coords = json.coords
export { coords }
export function getIconsData(){
    let icons = []
    //js loop through data dict with key and value
    for (const [key, value] of Object.entries(data)) {
        let oras = value
        let icon = {
            type: 'text',
            value: key,
            X: getMediumCoords(key).X,
            Y: getMediumCoords(key).Y
        }
        icons.push(icon)
        for (const [key2, value2] of Object.entries(oras)) {
            let icon = {
                type: value2.type,
                X: value2.X,
                Y: value2.Y
            }
            icons.push(icon)
        }

    }
    return icons
}
const { minx, miny, maxx, maxy } = coords
  export function interprete(x, y){
    let x1 = (x - minx) / (maxx - minx) * 100
    let y1 = (y - miny) / (maxy - miny) * 100
    return {X: x1, Y: y1}
  }

 export function getMediumCoords(jud){
    console.log(jud)
    let objs = data[jud]
    console.log(objs)
    let x = 0
    let y = 0
    let n = 0
    for (const [key, value] of Object.entries(objs)) {
        x += value.X
        y += value.Y
        n += 1
    }
    x /= n
    y /= n
    return {X: x, Y: y}
  }