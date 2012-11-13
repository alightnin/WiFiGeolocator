var theScroll;
var markerData=[];
var latitude=-999, longitude=-999;

document.addEventListener('DOMContentLoaded', scroll, false);


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

//Map JS
$(function() {
	var yourStartLatLng = new google.maps.LatLng(39, -108);
		$('#map_canvas').gmap({'center': yourStartLatLng});
});
$('#map').live("pageshow", function() {
	$('#map_canvas').gmap('refresh');

});
$('#map').live("pageinit", function() {
	$('#map_canvas').gmap({'center': '39, -108'});
});
//$.each(markerData, function(){
//	$('#map_canvas').gmap('addMarker', {'position': lat,lon', 'bounds': true}).click(function() {
//		$('#map_canvas').gmap('openInfoWindow', {'content': 'Hello World!'}, this);
//	});
//	
//})

//Getting Latitude and Longitude
document.addEventListener("deviceready", deviceReady, false);
var watchID = null;
var network = null;
function deviceReady() {
    watchID = navigator.geolocation.watchPosition(success, error, { frequency: 3000 });
    //if(setting to turn on wifi on startup)
    turnOnWifi();
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


//Plugin JS
var WifiPlugin = {
		callNativeFunction: function (success, fail, native_action, resultType) {
		return cordova.exec( success, fail, "com.example.wifigeolocator", native_action, [resultType]);
		}
	}; 
	APobj = new Object();
	APobj.ssid = "NULL";
	APobj.mac="NULL";
	APobj.security="NULL";
	APobj.frequency=-999;
	APobj.signal=-999;
	APobj.lat=0;
	APobj.lon=0;


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
//		turnOnWifi();

	}
	function startButtonPressed(scanType){
		//if(latitude!=-999 && longitude!=-999){
			inter=setInterval(function(){startScanning(scanType)}, 3000);
			//startScanning();
			stat.innerHTML="Scanning...";
		//}else{
		//	alert("You need to turn on your GPS");
		//}
	}
	function stopButtonPressed(){
		clearInterval(inter);
		stat.innerHTML="Idle"; 
	}
	function turnOnWifi(){
		WifiPlugin.callNativeFunction(wifiNativePluginSuccessHandler, nativePluginErrorHandler, "TurnOn", null);
	}
	function startScanning(scanType) {
		res.innerHTML=" ";
		WifiPlugin.callNativeFunction(scanType, nativePluginErrorHandler, "Scan", null);
	}

	function captureNativePluginSuccessHandler(result) {
		// This is for debugging only. This code will change to upload or save instead of display
		var key, i=0, str;
		var arr = [];
		for(key in result.AP){
			var obj = {
			ssid: result.AP[key].SSID,
			mac: result.AP[key].MAC,
			security: result.AP[key].SECURITY,
			frequency: result.AP[key].FREQUENCY,
			signal: result.AP[key].SIGNAL,
			lat: latitude,
			lon: longitude,
			};

			arr.push(obj);
		}

		str="";
		for(i=0; i<arr.length; i++) {
			markerData[i]=arr[i];
			str+=arr[i].ssid + " " + arr[i].mac+arr[i].security + " " +arr[i].frequency + " " +arr[i].signal + " " +arr[i].lat+" "+arr[i].lon+"</br>";
		}
		res.innerHTML=str;	  
	}
	function analyzeNativePluginSuccessHandler(result){
		var key, i=0, str="<div data-role=\"collapsible-set\" data-inset=\"false\" data-theme=\"b\" data-content-theme=\"d\">";
		var arr = [];
		var previous="";
		for(key in result.AP){
			var obj = {
			ssid: result.AP[key].SSID,
			mac: result.AP[key].MAC,
			security: result.AP[key].SECURITY,
			frequency: result.AP[key].FREQUENCY,
			signal: result.AP[key].SIGNAL,
			lat: latitude,
			lon: longitude,
			};

			arr.push(obj);
		}

		for(i=0; i<arr.length; i++) {
			if(previous!=arr[i].ssid) {
				if(i!=0)
					str+="</div>";
				str+="<div data-role=\"collapsible\" data-inset=\"false\"><h3>"+arr[i].ssid+"</h3>";
					previous=arr[i].ssid;
					
			}else{
				str+="<table><tr><td>"+arr[i].ssid+"</td><td>"+ arr[i].mac+"</td><td>"+arr[i].signal+"</td></tr></table>";
				//str+="<p>"+arr[i].signal+"</p>";
				previous=arr[i].ssid;
			
			}
//			str+="<tr><td>"+ arr[i].ssid + "</td><td>"+ arr[i].mac+"</td><td>"+arr[i].signal+"</td></tr>";
		}
		str+="</div>";
		analyzeResults.innerHTML=str;	
	}
	function nativePluginErrorHandler(result) {
		alert("Error "+result);
	}
	function wifiNativePluginSuccessHandler(result){
		//alert("Wifi On: "+result);	
	}
