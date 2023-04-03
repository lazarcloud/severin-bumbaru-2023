import { start_mongo as start_mongo_LazarAuth } from "$db/auth/mongo";
import { start_mongo as start_mongo_LazarChat } from "$db/chat/mongo";
import { start_mongo as start_mongo_LazarMessages } from "$db/messages/mongo";

start_mongo_LazarAuth().then(() => {
	console.log('Mongo started!');
}).catch(e => {console.error(e)})

start_mongo_LazarChat().then(() => {
	console.log('Mongo started!');
}).catch(e => {console.error(e)})

start_mongo_LazarMessages().then(() => {
   console.log('Mongo started!');
}).catch(e => {console.error(e)})

import { dbAuth } from '$db/mongo'
import { dbChat } from '$db/mongo'
import { dbMessages } from '$db/mongo'

const tutorials = dbAuth.collection('Data')
const tutorials2 = dbChat.collection('Data')
const tutorials3 = dbMessages.collection('Data')

const doc = { name: "Neapolitan pizza", shape: "round", time:Date.now() };
const result = await tutorials.insertOne(doc);
const result2 = await tutorials2.insertOne(doc);
const result3 = await tutorials3.insertOne(doc);
console.log(
   `A document was inserted with the _id: ${result.insertedId}`,
);
import { auth, checkUrl } from '$utils/auth/index.js'

export async function handle({ event, resolve }){

   var sessionId = event.cookies.get('sessionId')
   var userId = event.cookies.get('userId')
   //check login
   event.locals.user = await auth(sessionId, userId)
   //check route
   console.log((!event.locals.user.isAuthenticated)&&(event.url.pathname!=''))
   if(!event.locals.user.isAuthenticated&&event.url.pathname!=''){
     //return Response.redirect(`${event.url.origin}/auth/basic/login?session_expired=1&link=${event.url.pathname}`,301)
   }
   const response = await resolve(event);
   return response;
 };