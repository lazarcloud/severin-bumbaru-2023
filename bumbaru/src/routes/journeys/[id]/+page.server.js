import { dbAuth } from '$db/mongo'
export function load({params, parent}) {
    const { user } = await parent();
    var _id = user.userdata._id
    let me = dbAuth.collection(_id)
    let data = await me.find({_id:params.id}).project({ _id: { $toString: "$_id" }, ans:1}).toArray()
    return {
        id: params.id
    }
}