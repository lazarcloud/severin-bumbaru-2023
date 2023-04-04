import { dbAuth } from '$db/mongo'
import { dev } from '$app/environment';
import { sendEmail } from "$lib/emails"
import { renderMail } from 'svelte-mail';
import { ResetPassword } from '$lib/emails';
export const actions = {
    reset: async({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email')

        const { html, text } = await renderMail(ResetPassword, { data: { id:'lazar', dev:dev } });
        console.log(html)
        await sendEmail(email, html, text)



        return {sms:'Email sent!', status:1}
    }
}