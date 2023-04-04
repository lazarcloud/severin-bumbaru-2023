import { makeId } from '$utils/auth'
import { redirect } from '@sveltejs/kit'
export async function load(){
    let id = makeId(4)
    throw redirect(303, `/journeys/${id}`)
}