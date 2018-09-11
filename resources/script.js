function pixTimeChange() {
    var t=new Date();
    var h = t.getHours();
    var r1="resources/blacksunflowervector.svg";
    var r2="resources/CircleMoon.png";
    var r3="resources/CirclePluto.png";
    var r4="resources/psycplutoround.jpg"
    var el=document.getElementById('myimage');
    
    if(h>=7 && h<21)
    {el.src =  r1;}
    else if(h==4)
    {el.src = r4;
        document.getElementById("plutotext").innerHTML += "<p class='med just'>It's 4 in the morning, what are you doing here!?</p>";
    }
    else if(h<6 && h>=1)
    {el.src = r3;
        document.getElementById("plutotext").innerHTML +="<p class='med just'>It's a lonely time of night. Enjoy Pluto :-)</p>";
    }
    else
    {el.src = r2;
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
            document.getElementById("ox").innerHTML +="<li>studied math/physics at <a href='http://ox.ac.uk'>Oxford</a></li>";
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
