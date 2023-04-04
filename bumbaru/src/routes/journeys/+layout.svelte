<script>
    import { io } from "socket.io-client"
    import { dev } from '$app/environment';
    import { socket } from '$lib/socket';
    const url = dev? 'http://localhost:8600' : 'https://wsbumbaru.byteforce.ro';
    $socket = io(url,{
        path: "/main",
        transports: ['websocket']
    });
    $socket.on('time', (sms) => {
        console.log(sms)
    })
</script>

<slot/>