<script>
    export let user
    export let id
    export let dev
    let url = dev? "http://localhost:5173/" : "https://ro.byteforce.ro/"
    url = url + `rick/`

  </script>
  
  <h1>Hello!</h1>
  <p>Please change your password here: <a href="{url}">CONFIRM</a></p>
  
  <style>strong { color: red }</style>