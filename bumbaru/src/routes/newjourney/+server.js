import { makeId } from '$utils/auth'
import { redirect } from '@sveltejs/kit'
async function GET(){
    let id = makeId(4)
    throw redirect(303, `/journeys/${id}`)
}