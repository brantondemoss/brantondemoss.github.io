function pixTimeChange() {
    var t=new Date();
    var h = t.getHours();
    var r1="resources/blacksunflowervector.svg";
    var r2="resources/CircleMoon.png";
    var r3="resources/CirclePluto.png";
    var r4="resources/psycplutoround.jpg"
    var el=document.getElementById('myimage');
    var main=document.getElementById('mainImage');
    
    if(h>=7 && h<21)
    {
	var rand = Math.floor(Math.random() * 2)

	if (rand == 0) { main.innerHTML += "<a href='/sunflower'><img class='rounded' src='resources/blacksunflowervector.svg' id='myimage' title='this image changes based on time of day'></a>"}
	else{ main.innerHTML += '<a href="https://brantondemoss.com/seismicdream"><video loop autoplay muted playsinline width="420" style="float: left; padding-left: 20%;padding-top: 5px;"><source src="seismicdream/4980.mp4" type="video/mp4"></video>'}
	
	
    }
    else if(h==4)
    {
	main.innerHTML += "<a href='/sunflower'><img class='rounded' src='resources/psycplutoround.jpg' id='myimage' title='this image changes based on time of day'></a>"
        document.getElementById("plutotext").innerHTML += "<p class='med just'>It's 4 in the morning, what are you doing here!?</p>";
    }
    else if(h<6 && h>=1)
    {
	main.innerHTML += "<a href='/sunflower'><img class='rounded' src='resources/CirclePluto.png' id='myimage' title='this image changes based on time of day'></a>"
        document.getElementById("plutotext").innerHTML +="<p class='med just'>It's a lonely time of night. Enjoy Pluto :-)</p>";
    }
    else
    {
	main.innerHTML += "<a href='/sunflower'><img class='rounded' src='resources/CircleMoon.png' id='myimage' title='this image changes based on time of day'></a>"
        /*document.getElementById("plutotext").innerHTML +="<p class='med just'>it's only a liquid crystal moon</p>";*/
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



function ipLookUp () {
    $.ajax('http://ip-api.com/json')
    .then(
          function success(response) {
          
          if(response.countryCode != "GB")
          {
            document.getElementById("ox").innerHTML +="<li>studied math/physics at <a href='http://ox.ac.uk' class='blue'>Oxford</a> and <a href='https://www.colorado.edu/physics/' class='orange'>Boulder</a></li>";
          }
          /*console.log('User\'s Location Data is ', response);
          console.log('User\'s Country', response.country);*/
          },
          
          function fail(data, status) {
          console.log('Request failed.  Returned status of',
                      status);
          }
          );
}
ipLookUp()
