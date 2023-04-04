import { redirect } from '@sveltejs/kit';

export function GET(){
    throw redirect(303, `https://www.youtube.com/watch?v=uHgt8giw1LY`)
}