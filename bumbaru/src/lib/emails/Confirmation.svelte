<script>
    export let user
    export let id
    export let dev
    let url = dev? "http://localhost:5173/" : "https://ro.byteforce.ro/"
    url = url + `confirm/${id}`
</script>
  
    <h1>Hello, new user! </h1>
    <p>Please confirm your account here: <a href={url}>CONFIRM</a></p>
  
