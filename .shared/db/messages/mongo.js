import { MongoClient } from 'mongodb';
let MONGO_URL = 'mongodb://lazar:lazar@130.61.113.206:27017/LazarMessages?authMechanism=DEFAULT'

const client = new MongoClient(MONGO_URL)

export function start_mongo() {
	console.log('Starting mongo...');
	return client.connect();
}

export default client.db()
let dbMessages =  client.db()
export { dbMessages }