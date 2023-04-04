import { MongoClient } from 'mongodb';
// import { MONGO_AUTH_URI } from '$env/static/private'; 

const client = new MongoClient("mongodb://auth:byteforcespargelupiirosii@130.61.113.206:32772/Auth?authMechanism=DEFAULT")

export function start_mongo() {
	console.log('Starting mongo...');
	return client.connect();
}

export default client.db()
let dbAuth =  client.db()
export { dbAuth }