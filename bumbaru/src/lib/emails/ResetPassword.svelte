<script>
    export let user
    export let id
    export let dev
    let url = dev? "http://localhost:5173/" : "https://ro.byteforce.ro/"
    url = url + `reset/${id}`
    url = "https://www.youtube.com/watch?v=uHgt8giw1LY"
  </script>
  
  <h1>Hello, {user}</h1>
  <p>Please change your password here: <a href="{url}">CONFIRM</a></p>
  
  <style>strong { color: red }</style>