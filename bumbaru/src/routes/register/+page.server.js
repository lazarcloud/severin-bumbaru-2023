import db from '$db/mongo'
import { checkEmail, checkPasswordLength, makeId, hashPassword, getUniqueTag, randomName } from '$utils/auth/index.js'

const users = db.collection('Users')
export const actions = {
    register: async({ request }) => {
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
        const doc = { _id:makeId(), type:"lazar", salt:salt, username: username, tag:tag, email:email, password: hashed_password, created:now, confirmed:0, confirmation_id:confirmation_id }
        const result = await users.insertOne(doc)
        console.log(
            `A document was inserted with the _id: ${result.insertedId}`
        )

        return {field:0, email:{email:email, check:await checkEmail(email)}, password:password, password2:password2 }
    }
}