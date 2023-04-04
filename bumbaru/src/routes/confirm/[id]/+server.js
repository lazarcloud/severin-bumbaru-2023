import { dbAuth } from '$db/mongo'
const users = dbAuth.collection('Users')
export async function GET({ cookies, locals, params }){
  console.log(params.id)
  var confirmation_id = params.id
  const result = await users.find( { confirmation_id: confirmation_id } ).toArray()
  if(result.length==0){
    return new Response("wrong id!")
  }
  var user = result[0]
  var id = user._id
  var confirmed = user["confirmed"]
  if(confirmed==0){
    //user not confirmed
    user.confirmed=1
    delete user.confirmation_id
    const res = await users.replaceOne({_id:id}, {...user})
    return new Response("confirmed user!")
  }
  delete user.confirmation_id
  const res = await users.replaceOne({_id:id}, {...user})
  return new Response("user already confirmed!")
}