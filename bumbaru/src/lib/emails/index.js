import Confirmation from './Confirmation.svelte';
import ResetPassword from './ResetPassword.svelte';


import { createTransport } from "nodemailer"

let transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "noreply.lazar@gmail.com",
    pass: "pvhmtcdgsikgrnix",
  },
});
async function sendEmail(to, html, text){
  
  return await transporter.sendMail({
  from: '"ByteBot🤖" <noreply.lazar@gmail.com>',
  to: to,
  subject: "Hello ✔",
  text: text,
  html: html,
});
}
export { Confirmation, ResetPassword, sendEmail };
