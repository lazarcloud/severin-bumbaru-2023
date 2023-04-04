import { dbAuth } from '$db/mongo'
import { checkEmail, checkPasswordLength, makeId, hashPassword, getUniqueTag, checkPassword, cleanSessions } from '$utils/auth/index.js'
import { dev } from '$app/environment';
import { redirect } from '@sveltejs/kit';
const users = dbAuth.collection('Users')
const sessions = dbAuth.collection('Sessions')
export const actions = {
    login: async({ request, cookies, url }) => {
        console.log(url)
        // const redirectUrl = String(url.searchParams.get('link') ?? '0');
        var queryString = request.headers.get("referer").split('?')[1]
        const urlParams = new URLSearchParams(queryString);
        var redirectUrl = urlParams.get("link") ?? '0'
        console.log(redirectUrl)
        const data = await request.formData();
        const email = data.get('email')
        const password = data.get('password')
        //check empty password
        if(password==""){
            return { field:'password', error: 'Password cannot be empty' }
        }

        const result = await users.find( { email: email, type:"lazar" } ).toArray()
        if(result.length==0){
            return {sms:'No user found!', status:0}
        }
        const myuser = result[0]
        if(!checkPassword(password, myuser.password, myuser.salt)){
            return {sms:'Wrong password!', status:0}
        }

        const sessionId = makeId()
        const doc = { _id:sessionId, type:"lazar", user_id:myuser._id, created:Date.now(), expires:Date.now()+3600*1000 }
        const result2 = await sessions.insertOne(doc)
        console.log(
            `A document was inserted with the _id: ${result2.insertedId}`
        )

        cookies.set('sessionId', sessionId,{
            path: '/',
            secure: !dev,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            domain: dev?'localhost':'byteforce.ro'
          })
        cookies.set('userId', myuser._id,{
            path: '/',
            secure: !dev,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            domain: dev?'localhost':'byteforce.ro'
        })
        cleanSessions(myuser._id)
        if(redirectUrl!=0){
            throw redirect(302, redirectUrl)
        }
        throw redirect(302, '/')

    }
}