export const prerender = false
import { dbAuth } from '$db/mongo'
export async function load({ parent }){
    const { user } = await parent();
    var _id = user.userdata._id
    console.log(_id)
    let mydata = dbAuth.collection(_id)
    let data = await mydata.find({}).project({ _id: { $toString: "$_id" }, ans:1}).toArray()
    console.log(data)
    return {
        journeys:data
    }
}