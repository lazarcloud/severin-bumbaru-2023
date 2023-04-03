<script>
    export let angle = 30
    export let radius = 64
</script>
{angle}
<div style="width:{64/Math.sin(angle)}px;height:64px;background-color:red;transform: skewX(-{90-angle}deg);border-radius:0 100% 0 0;">

</div>
<style>
    div{
        
    }
</style>