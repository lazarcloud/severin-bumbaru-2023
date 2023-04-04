import { dbAuth } from '$db/mongo'
const users = dbAuth.collection('Users')
const sessions = dbAuth.collection('Sessions')

export async function checkEmailSyntax(email){
    return !email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);  
}

export async function checkEmail(email){
    const result = await users.find( { email: email, type:"lazar" } ).toArray()
    console.log(result.length)
    if(result.length>0){
      return true
    }
    return false
}

export function checkPasswordLength(password){
    return true
    if (password.length < 8){
        return false
    } else {
        return true
    }
}

import { randomBytes, pbkdf2Sync } from 'crypto'
export function makeId(count){
    if(!count){
      count = 8
    }
  const id = randomBytes(count).toString("hex"); // => f9b327e70bbcf42494ccb28b2d98e00e
  return id
}

export function hashPassword(password, salt){
    // Hashing user's salt and password with 1000 iterations,
    //64 length and sha512 digest
    let hash = pbkdf2Sync(password, salt, 
    1000, 64, `sha512`).toString(`hex`);
    return hash
}

export function checkPassword(password, hash, salt){
    let hashed_password = pbkdf2Sync(password, salt, 
    1000, 64, `sha512`).toString(`hex`);
    if(hashed_password==hash){
      return true
    }
    return false
}

export function getRandomInt(max) {
  const number = Math.floor(Math.random() * max);
  return number
}

export async function getUniqueTag(username){
    const result = await users.find( { username: username } ).project( { tag:1, _id:0 } ).toArray()
    console.log(result)
    if(result.length == 10000){
      return false
    }
    function checkTag(tag){
      if(result.some(e => e.tag == tag)) {
        return true
      }
      return false
    }
    var tag = getRandomInt(10000)
    while(checkTag(tag)){
      var tag = getRandomInt(10000)
    }
    return tag
}

let urls = [
  "/",
  "/login",
  "/register",
]
export function urlIsPublic(url){
  if(urls.includes(url)){
    return true
  }
  return false
  // if(url.startsWith("/ws")){
}

export async function auth(sessionId, userId){
  if(sessionId==undefined || userId==undefined){
    return {
      isAuthenticated:false,
      userdata:{},
    }
  }
  var now = Date.now()
  
  
  //console.time('Execution Time');
  const result = await users.find( { _id: userId } ).toArray()
  //console.timeEnd('Execution Time');
  if(result.length==0){
      return {
        isAuthenticated:false,
        userdata:{},
      }
  }
  var myuser = result[0]
  
  const result2 = await sessions.find( { _id: sessionId } ).toArray()
  if(result2.length==0){
      return {
        isAuthenticated:false,
        userdata:{},
      }
  }
  var mysess = result2[0]

  if(myuser._id!=mysess.user_id){
    return {
      isAuthenticated:false,
      userdata:{},
    }
  }
  if(mysess.expires<now){
    sessions.deleteOne( { _id:mysess._id } )
    return {
      isAuthenticated:false,
      userdata:{},
    }
  }
  mysess.expires = Math.max(mysess.expires, now+7*3600*1000)
  const res2 = await sessions.replaceOne({_id:mysess._id}, {...mysess})
  delete myuser["password"]
  delete myuser["salt"]
  return {
    isAuthenticated:true,
    userdata:myuser,
  }
}
export async function cleanSessions(userid){
  var now = Date.now()
  const mysessions = await sessions.find( { user_id: userid } ).toArray()
  for (const mysess of mysessions) {
    if(mysess.expires<now){
      await sessions.deleteOne( { _id:mysess._id } )
    }
  }
}

import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
export function randomName(seed = 0){
  const name = uniqueNamesGenerator({
    dictionaries: [adjectives, animals, colors],
    style: 'lowerCase',
    separator: '-',
    seed: seed,
  });
  return name
}