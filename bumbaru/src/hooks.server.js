import { start_mongo as start_mongo_Auth } from "$db/auth/mongo";

start_mongo_Auth().then(() => {
	console.log('Mongo started!');
}).catch(e => {console.error(e)})

console.log('lazarus')
import { dbAuth } from '$db/mongo'

const tutorials = dbAuth.collection('Data')

const doc = { name: "Neapolitan pizza", shape: "round", time:Date.now() };
const result = await tutorials.insertOne(doc);

console.log(
   `A document was inserted with the _id: ${result.insertedId}`,
);
import { auth, urlIsPublic } from '$utils/auth/index.js'

export async function handle({ event, resolve }){

   var sessionId = event.cookies.get('sessionId')
   var userId = event.cookies.get('userId')
   //check login
   event.locals.user = await auth(sessionId, userId)
   //check route
   console.log((!event.locals.user.isAuthenticated)&&(event.url.pathname!=''))
   console.log({'Auth':event.locals.user.isAuthenticated})
   console.log({'Url':urlIsPublic(event.url.pathname)})
   if(event.locals.user.isAuthenticated){
    const response = await resolve(event);
    return response;
   }
   if(urlIsPublic(event.url.pathname)){
    const response = await resolve(event);
    return response;
   }

   return Response.redirect(`${event.url.origin}/login?session_expired=1&link=${event.url.pathname}`,301)

 };