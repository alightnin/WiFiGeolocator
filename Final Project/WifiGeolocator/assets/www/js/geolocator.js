var theScroll;
var markerData=[];
var latitude=-999, longitude=-999;
var db;
var wifiState = 'Off';
var scanState = 2;
var keyscan, valuescan, keywifi, valuewifi;

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
	//alert("ready");
	//navigator.geolocation.watchPosition(success, error);

//    navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true });
	var inter=setInterval(navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true }), scanState*1000);
    //alert("Ready");
//    if (navigator.geolocation){
//    	navigator.geolocation.getCurrentPosition(showPosition);
//    }else{
//    	alert("Geolocation is not supported by this browser.");
//    }
  }
//    db = window.openDatabase("wifi", "1.0", "wifiStorage", 200000);
//    db.transaction(startDB, error, success);
    //if(setting to turn on wifi on startup)
 
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
   // alert(latitude+" "+longitude);
	showMarkers();
} 
function error(error) {
    alert(error.message);
}
 
var inter;
var stat;
var res;
function onBodyLoad() 
{   
	alert("The app will now attempt to access your current location. This takes several seconds. Until the process is complete, the app will be unresponsive. Please press OK to continue");
//	stat=document.getElementById('status');
//	res=document.getElementById('results');
//	analyzeResults=document.getElementById('analyzeResults');
//	stat.innerHTML="Idle";
//	res.innerHTML="Waiting for Results";
	analyzeResults.innerHTML="Nothing to report";
	var mapcanvas=document.getElementById('map_canvas');
	mapcanvas.style.width=window.innerWidth-30+'px';
	mapcanvas.style.height=window.innerHeight-80+'px';
//	var str = "Width: "+window.innerWidth+ " Height: "+ window.innerHeight;
//	res.innerHTML=str;
//	turnOnWifi();
}

$(document).ready(function(){
	$('#settings').bind('pageshow', function(){
		for(key in localStorage){
			if(key=="ScanInt")
			{
				scanState = localStorage.getItem('ScanInt');
				$('#scan-slider').slider().val(scanState).slider('refresh');
			}
			if(key=="Wifi")
			{
				wifiState = localStorage.getItem('Wifi');
			}
		}
		$('#scan-slider').unbind('change');
		$('#scan-slider').slider().val(scanState);
		$('#scan-slider').bind('change', function(){
			scanState = $(this).slider().val();
		});
		$('#wifi-toggle').unbind('change');
		//$('#wifi-toggle').val('wifiState');
		$('#wifi-toggle').bind('change', function() {
            wifiState = $(this).val();
            if(wifiState == "On")
            {
            	turnOnWifi();
            	$('wifi-toggle').val("On");
            }
            else
            	turnOffWifi();
            	$('wifi-toggle').val("Off");
        });	
	})
})

function saveSettings()
{
	if(wifiState == "On")
		turnOnWifi();
	saveSet();
	
	
}

function saveSet()
{
	keyscan = "ScanInt";
	valuescan = $('#scan-slider').slider().val();
	console.log("Key: " + keyscan + " Value: " + valuescan);
	localStorage.setItem(keyscan, valuescan);
	
	keywifi = "Wifi";
	valuewifi = $('#wifi-toggle').val();
	console.log("Key: " + keywifi + " Value: " + valuewifi);
	localStorage.setItem(keywifi, valuewifi);
	
	alert("Settings now saved!" + "\nScan Interval: " + scanState + "\nWiFi: " + wifiState);
}




