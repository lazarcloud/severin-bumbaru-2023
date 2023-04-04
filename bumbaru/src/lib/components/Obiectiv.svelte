<script>
export let name = "Faleza Dunării"
export let data
export let link = data.link || "https://www.google.com/maps/place/Faleza+Dunării/@45.4286167,28.0509547,17z/data=!3m1!4b1!4m6!3m5!1s0x40b6df019fc191cb:0x36e2479e7acfe1c0!8m2!3d45.4286167!4d28.0531487!16s%2Fg%2F11gf9gdwmk"
export let Y = data.Y || 45.4286167
export let X = data.X || 28.0509547
export let photo = data.photo || "https://live.staticflickr.com/33/98876773_f0da1d5bfb_b.jpg"
export let type = data.type || "park"
Y = parseFloat(Y).toFixed(2)
X = parseFloat(X).toFixed(2)
</script>
<section>
    <img src={photo} alt={name} style="width:100%;height:100%;object-fit:cover;">
    <div class="data">
        <h1 class="bold">{name}</h1>
        <div class="other">
            <div class="a">
                <p>{type}</p>
            <p>{Y}</p>
            <p>{X}</p>
            </div>
            <a href={link}>Google Maps</a>
            
        </div>
    </div>
</section>
<style>
    section{
        display:grid;
        grid-template-columns: 1fr 2fr;
        margin: 1rem;
        border-radius: 0.5rem;
        overflow:hidden;
        background-color: var(--light);
        grid-column-gap: 1rem;
    }
    h1{
        font-size: 2rem;
    }
    .data{
    }
    a{
        background-color: var(--primary);
        color: white;
        margin: 8px;
    }
    a, p{
        margin: 0.5rem 0;
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid var(--dark);
		width:50%;
    }
    .other{
        padding-bottom: 1rem;
    }
    @media only screen and (max-width: 600px){
        .hid{
            display:none;
        }
        .a{
            display:grid;
            grid-template-columns: 1fr 1fr 1fr;
        }
        h1{
            font-size: 1.5rem;
        }
    }
</style>