import { MongoClient } from 'mongodb';
let MONGO_URL = "mongodb://root:byteforcespargelupiirosii@130.61.113.206:32772/"

const client = new MongoClient(MONGO_URL)

export function start_mongo() {
	console.log('Starting mongo...');
	return client.connect();
}

export default client.db()

import { dbAuth } from '$db/auth/mongo'


export { dbAuth }