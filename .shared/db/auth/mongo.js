import { MongoClient } from 'mongodb';
import { MONGO_AUTH_URI } from '$env/static/private'; 

const client = new MongoClient(MONGO_AUTH_URI)

export function start_mongo() {
	console.log('Starting mongo...');
	return client.connect();
}

export default client.db()
let dbAuth =  client.db()
export { dbAuth }