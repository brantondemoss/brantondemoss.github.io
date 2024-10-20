function pixTimeChange() {
    var t = new Date();
    var h = t.getHours();
    var main = document.getElementById('mainImage');
    var plutotext = document.getElementById("plutotext");
    
    if (h >= 7 && h < 21) {
        var rand = Math.floor(Math.random() * 2);

        if (rand == 0) {
            main.innerHTML = "<a href='https://brantondemoss.com/sunflower/'><img class='rounded' src='resources/blacksunflowervector.svg' id='myimage'></a>";
        } else {
            main.innerHTML = '<a href="https://brantondemoss.com/seismicdream"><video loop autoplay muted playsinline><source src="seismicdream/4980.mp4" type="video/mp4"></video></a>';
        }
    } else if (h == 4) {
        main.innerHTML = "<a href='https://brantondemoss.com/sunflower/'><img class='rounded' src='resources/psycplutoround.jpg' id='myimage'></a>";
        plutotext.innerHTML = "<p class='med just'>It's 4 in the morning, what are you doing here!?</p>";
    } else if (h < 6 && h >= 1) {
        main.innerHTML = "<a href='https://brantondemoss.com/sunflower/'><img class='rounded' src='resources/CirclePluto.png' id='myimage'></a>";
        plutotext.innerHTML = "<p class='med just'>It's a lonely time of night. Enjoy Pluto :-)</p>";
    } else {
        main.innerHTML = "<a href='https://brantondemoss.com/sunflower/'><img class='rounded' src='resources/CircleMoon.png' id='myimage'></a>";
        // Uncomment the following line if you want to add the moon text back
        // plutotext.innerHTML = "<p class='med just'>it's only a liquid crystal moon</p>";
    }
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}

addLoadEvent(function() {
    pixTimeChange();
});