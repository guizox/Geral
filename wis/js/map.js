var map;
var myLatLng;
var place;
var markers = [];
var marker;
var inputTraceRoute;
var clickCarPlace;
var clickYourPlace;
var geodesicPoly;
var distanceReturn;

var options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};

 function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
		center: myLatLng,
		scrollwheel: false,
		zoom: 17
	});
}

function successOpen(pos) {
    myLatLng = {lat: pos.coords.latitude, lng: pos.coords.longitude};
    if (!map){
        initMap();
    } else {
        if (markers.length == 2){
            myLatLng = markers[1];
            calculaDistancia(myLatLng, markers[0]);
        } else {
            markPlace();
        }
    }
};

function markPlace(){
    if (markers.length == 1) {
        myLatLng = {lat: -23.000931, lng: -46.845137}
    }

    marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: "img/unnamed.png",
        draggable: true,
        animation: google.maps.Animation.DROP,
        title: "Drag me"
    });

    if (markers.length < 2){
        markers.push(myLatLng);
    }

    if (markers.length == 2){
        paintPolyline();
        calculaDistancia(myLatLng, markers[0]);
    }
}

function removePolyline(){
    geodesicPoly.setMap(null);
}

function paintPolyline() {
   var bounds = new google.maps.LatLngBounds(
   markers[0], markers[1]);
   map.fitBounds(bounds);

    google.maps.event.addListener(markers[0], 'position_changed', paintPolyline);
    google.maps.event.addListener(markers[1], 'position_changed', paintPolyline);

    geodesicPoly = new google.maps.Polyline({
      strokeColor: '#CC0099',
      strokeOpacity: 1.0,
      strokeWeight: 3,
      geodesic: true,
      map: map
    });

    var path = [markers[0], markers[1]];
    geodesicPoly.setPath(path);
}

function error(err) {
    console.log("error " + err);
};

var markCarPlace = function(){
    if (!clickCarPlace){
        clickCarPlace = true;
        place = "Car place";
        if (!inputTraceRoute){
            inputTraceRoute = true;
            $("#navBar").append("<li id='lineMarkPlace'><a onclick='markYourPlace();' id='markYourPlace'>Trace route</a></li>");
        }
        navigator.geolocation.getCurrentPosition(successOpen, error, options);
	} else {
	    var r = confirm("You already have one car place, do you want to change that?");
	    if (r){
	        markers[0].setMap(null);
            markers.splice(0,1);
	    }
	}
	$("#button").click();
}

var markYourPlace = function(){
    if (!clickYourPlace){
        clickYourPlace = true;
        place = "I'm here";
        navigator.geolocation.getCurrentPosition(successOpen, error, options);
    } else {
        var r = confirm("You already have a traced route, do you want to change that?");
        if (r){
            markers[1].setMap(null);
            markers.splice(1,1);
            removePolyline();
            navigator.geolocation.getCurrentPosition(successOpen, error, options);
        }
    }
    $("#button").click();
}

function logout(){
    window.localStorage.removeItem("login");
    window.location.href = "login.html";
}

function calculaDistancia(yourPlace, carPoint){
     var origin1 = new google.maps.LatLng(yourPlace.lat, yourPlace.lng);
     var destinationB = new google.maps.LatLng(carPoint.lat, carPoint.lng);

     var service = new google.maps.DistanceMatrixService();

     var obj = {origins: [origin1],
                destinations: [destinationB],
                travelMode: google.maps.TravelMode.WALKING,
                unitSystem: google.maps.UnitSystem.METRIC,
               }

     var callbackGetDistance = function(response, status){
        if (status != google.maps.DistanceMatrixStatus.OK)
           console.log(status);
        else {
           distanceReturn = response.rows[0].elements[0].distance.text;
           if (distanceReturn){
              var distance = parseFloat(distanceReturn.replace(" km", "").replace(",", "."));
              if (distance > 0.1){
                  setTimeout(function(){
                      $("#distancia").append("<span style='text-color: #FFFAFA; margin-left: 5%; margin-top: 5%;'>You're : " + distanceReturn + " close your car </span> <br/>");
                      navigator.geolocation.getCurrentPosition(successOpen, error, options)
                  }, 5000);
              }
           }
        }
     }
     service.getDistanceMatrix(obj, callbackGetDistance);
}

var user = window.localStorage.getItem("login");
if (user && navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition){
    navigator.geolocation.getCurrentPosition(successOpen, error, options);
} else {
    window.location.href = "www/login.html";
}
