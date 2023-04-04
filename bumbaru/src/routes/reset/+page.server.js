import { dbAuth } from '$db/mongo'
import { dev } from '$app/environment';
import { sendEmail } from "$lib/emails"
import { renderMail } from 'svelte-mail';
import { ResetPassword } from '$lib/emails';
export const actions = {
    teset: async({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email')

        const { html, text } = await renderMail(ResetPassword, { data: { user: username, id:confirmation_id, dev:dev } });
        console.log(html)
        await sendEmail(email, html, text)



        return {field:0, email:{email:email}}
    }
}