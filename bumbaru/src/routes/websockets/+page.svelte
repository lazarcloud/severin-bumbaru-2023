<script>
    import { io } from "socket.io-client"
    import { dev } from '$app/environment';
    const url = dev? 'http://localhost:8600' : 'https://wsbumbaru.byteforce.ro';
    const socket = io(url,{
        path: "/main",
        // query: `chatId=${chatId}`,
        transports: ['websocket']
    });
    socket.on('welcome', (sms) => {
        console.log(sms)
    })
</script>
<h1>Title</h1>