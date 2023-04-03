import { redirect } from '@sveltejs/kit';
import db from '$db/mongo'
const users = db.collection('Users')
import { cleanSessions } from '$utils/auth/index.js'
import { dev } from '$app/environment';
export async function GET({ cookies, locals, url, event, request }){
  return new Response(JSON.stringify(request))
  const redirect = String(url.searchParams.get('redirect') ?? '0');
	locals.user = {
        isAuthenticated: false,
        userdata: {},
    };

  const _id = cookies.get('userId')
  const sessionId = cookies.get('sessionId')
  const result = await users.find( { _id:_id } ).toArray()
  await cookies.delete('userId');
  await cookies.delete('sessionId');
  cleanSessions(_id)
  cookies.set('sessionId', '',{
    path: '/',
    secure: !dev,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    domain: dev?'localhost':'lazar.lol'
  })
  cookies.set('userId', '',{
      path: '/',
      secure: !dev,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      domain: dev?'localhost':'lazar.lol'
  })
	throw redirect(303, '/');
};