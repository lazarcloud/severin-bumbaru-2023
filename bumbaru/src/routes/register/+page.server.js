import { dbAuth } from '$db/mongo'
import { checkEmail, checkPasswordLength, makeId, hashPassword, getUniqueTag, randomName, cleanSessions } from '$utils/auth/index.js'
import { dev } from '$app/environment';
import { sendEmail } from "$lib/emails"
import { renderMail } from 'svelte-mail';
import { Confirmation } from '$lib/emails';
const users = dbAuth.collection('Users')
const sessions = dbAuth.collection('Sessions')
export const actions = {
    register: async({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email')
        const password = data.get('password')
        const password2 = data.get('password2')
        //check empty password
        if(password==""){
            return { field:'password', error: 'Password cannot be empty' }
        }
        //check empty password
        if(password2==""){
            return { field:'password2', error: 'Password cannot be empty' }
        }
        //check email
        const emailCheck = await checkEmail(email)
        if (emailCheck){
            return { field:'email', error: 'Email already used! You can login!' }
        }

        //check password
        const passwordCheck = checkPasswordLength(password)
        if (!passwordCheck){
            return { field:'password', error: 'Invalid password' }
        }

        const passwordMatch = password == password2
        if (!passwordMatch){
            return { field:'password2', error: 'Passwords not matching' }
        }

        var now = Date.now().toString()
        //make random username
        var username = randomName(makeId(4))
        var tag = await getUniqueTag(username)
        console.log(tag)
        if(tag == false){
            return { field:'username', error: 'Could not create username no free tag available' }
        }
        var confirmation_id = makeId()
        var salt = makeId()
        var hashed_password = hashPassword(password, salt)
        const myuser = { _id:makeId(), type:"lazar", salt:salt, username: username, tag:tag, email:email, password: hashed_password, created:now, confirmed:0, confirmation_id:confirmation_id }
        const result = await users.insertOne(myuser)
        console.log(
            `A document was inserted with the _id: ${result.insertedId}`
        )

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
        

        const { html, text } = await renderMail(Confirmation, { data: { user: username, id:confirmation_id, dev:dev } });
        console.log(html)
        await sendEmail(email, html, text)



        return {field:0, email:{email:email, check:await checkEmail(email)}, password:password, password2:password2 }
    }
}