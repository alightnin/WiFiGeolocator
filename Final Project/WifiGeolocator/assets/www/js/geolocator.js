var theScroll;
var markerData=[];
var latitude=-999, longitude=-999;
var db;

//document.addEventListener('DOMContentLoaded', scroll, false);


function page(toPage) {
    var toPage = $(toPage),
    fromPage = $("#pages .current");
    if(toPage.hasClass("current") || toPage === fromPage) {
        return;
    };
    toPage.addClass("current fade in").one("webkitAnimationEnd", function(){
        fromPage.removeClass("current fade out");
        toPage.removeClass("fade in")
    });
    fromPage.addClass("fade out");
}



//Getting Latitude and Longitude
document.addEventListener("deviceready", deviceReady, false);
var watchID = null;
var network = null;
function deviceReady() {
    watchID = navigator.geolocation.watchPosition(success, error, { frequency: 3000 });
//    db = window.openDatabase("wifi", "1.0", "wifiStorage", 200000);
//    db.transaction(startDB, error, success);
    //if(setting to turn on wifi on startup)
 
}
function startDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS wifi (id unique, data)');
}
function success(position) {
    var elementLat = document.getElementById('latitude');
    latitude = position.coords.latitude;
    elementLat.innerHTML = latitude;
    var elementLong = document.getElementById('longitude');
    longitude = position.coords.longitude;
    elementLong.innerHTML = longitude;
}
function error(error) {
    alert(error.message);
}
function success(){
	//alert("YAY");
}
var inter;
var stat;
var res;
function onBodyLoad() 
{   
	stat=document.getElementById('status');
	res=document.getElementById('results');
	analyzeResults=document.getElementById('analyzeResults');
	stat.innerHTML="Idle";
	res.innerHTML="Waiting for Results";
	analyzeResults.innerHTML="Nothing to report";
	var mapcanvas=document.getElementById('map_canvas');
	mapcanvas.style.width=window.innerWidth-30+'px';
	mapcanvas.style.height=window.innerHeight-80+'px';
	var str = "Width: "+window.innerWidth+ " Height: "+ window.innerHeight;
	res.innerHTML=str;
//	turnOnWifi();
	
	

}

$(document).ready(function(){
	$('#settings').bind('pageshow', function(){
		$('#wifi-toggle').unbind('change');
		$('#wifistate').html('');
		var newState = 'off';
		$('#wifi-toggle').val('newState').slider('refresh');
		$('#wifi-toggle').bind('change', function() {
            alert('WiFi is now ' + jQuery(this).val());
        });
		
	})
})




