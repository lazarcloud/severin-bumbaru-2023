import { MongoClient } from 'mongodb';
let MONGO_URL = 'mongodb://lazar:lazar@130.61.113.206:27017/LazarServices?authMechanism=DEFAULT'

const client = new MongoClient(MONGO_URL)

export function start_mongo() {
	console.log('Starting mongo...');
	return client.connect();
}

export default client.db()

import { dbAuth } from '$db/auth/mongo'
import { dbChat } from '$db/chat/mongo'
import { dbMessages } from '$db/messages/mongo'

export { dbAuth, dbChat, dbMessages }