import { MongoClient } from 'mongodb';
let MONGO_URL = 'mongodb://lazar:lazar@130.61.113.206:27017/LazarChat?authMechanism=DEFAULT'

const client = new MongoClient(MONGO_URL)

export function start_mongo() {
	console.log('Starting mongo...');
	return client.connect();
}

export default client.db()
let dbChat =  client.db()
export { dbChat }