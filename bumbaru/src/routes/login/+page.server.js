import db from '$db/mongo'
import { checkEmail, checkPasswordLength, makeId, hashPassword, getUniqueTag, checkPassword, cleanSessions } from '$utils/auth/index.js'
import { dev } from '$app/environment';
const users = db.collection('Users')
const sessions = db.collection('Sessions')
export const actions = {
    login: async({ request, cookies }) => {
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
            domain: dev?'localhost':'lazar.lol'
          })
        cookies.set('userId', myuser._id,{
            path: '/',
            secure: !dev,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            domain: dev?'localhost':'lazar.lol'
        })
        cleanSessions(myuser._id)
        return {field:0, password:password }
    }
}