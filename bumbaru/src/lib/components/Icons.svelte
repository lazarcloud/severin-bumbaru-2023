<script>
    export let count
</script>
<p class="icons"><img class="icon" src="/circle_360.png" alt="full" />
    {count}
<img class="icon" src="/circle_240.png" alt="full" />

    {Math.round(count*3/4)}
<img class="icon" src="/circle_180.png" alt="full" />

    {Math.round(count/2)}
</p>
<style>
    .icons{
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .icon{
        height:16px;
    }
</style>