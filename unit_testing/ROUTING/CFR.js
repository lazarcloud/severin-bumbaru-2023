import { createClient } from 'redis';

const client = createClient("redis://:byteforcespargelupiirosii@130.61.113.206:32773/");

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('key', 'value');
const value = await client.get('key');
await client.disconnect();