import { dbAuth } from '$db/mongo'
import { ObjectId } from 'mongodb';
export async function load({params, parent}) {
    const { user } = await parent();
    var _id = user.userdata._id
    let me = dbAuth.collection(_id)
    let data = await me.find({_id:new ObjectId(params.id)}).project({ _id: { $toString: "$_id" }, ans:1}).toArray()
    return {
        id: params.id,
        data:data[0]
    }
}