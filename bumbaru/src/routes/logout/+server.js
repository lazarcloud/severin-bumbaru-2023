import { dbAuth } from '$db/mongo'

const users = dbAuth.collection('Users')
import { cleanSessions } from '$utils/auth/index.js'
import { dev } from '$app/environment';
import { redirect } from '@sveltejs/kit';
export async function GET({ cookies, locals, url, event, request }){
  // return new Response(JSON.stringify(request))
  const redirectUrl = String(url.searchParams.get('redirect') ?? '0');
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
  // cookies.delete('userId')
  // cookies.delete('sessionId')
  cookies.set('sessionId', '',{
    path: '/',
    secure: !dev,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    domain: dev?'localhost':'byteforce.ro'
  })
  cookies.set('userId', '',{
      path: '/',
      secure: !dev,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      domain: dev?'localhost':'byteforce.ro'
  })
	throw redirect(303, '/');
};