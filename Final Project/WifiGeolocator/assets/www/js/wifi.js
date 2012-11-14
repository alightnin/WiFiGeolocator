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
		var key, i=0, str=" ";//"<div id=\"analyzeResultsDiv\" data-role=\"collapsible-set\" data-inset=\"false\" data-theme=\"b\" data-content-theme=\"d\">";
		var arr = [];
		var previous="", next="";
		
		//$('#analyzeResults').listview();
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
			if(i!=arr.length-1) next=arr[i+1].ssid;
//			else
//				next="";
			if(previous!=next) {
				if(arr[i].ssid!=next){
					alert("here");
//					if(i!=0)
//						str+="</div>";
					str+="<div data-role=\"listview\" data-inset=\"true\"><h3>SSID: "+arr[i].ssid+" MAC: "+ arr[i].mac+" SIGNAL: "+arr[i].signal+"</div>";
				}
				//alert("next: "+next+" current= "+arr[i].ssid);
				if(arr[i].ssid==next)
				{ //alert("here");
					//style=\"display: none\"
				str+="<div class=\"listdiv\" data-role=\"listview\" data-inset=\"true\" >";
				}
				previous=arr[i].ssid;
				
			}else{
				
				str+="<li class =\"aps"+arr[i].ssid+"\" data-role=\"listview\" data-inset=\"true\"><h3>"+arr[i].ssid+" "+ arr[i].mac+" "+arr[i].signal+"</h3>This area displays more info</li>";
				if(next!=arr[i].ssid)
					str+="</div>";
					
				previous=arr[i].ssid;
			
			}
		}
//		for(i=0; i<arr.length; i++) {
//			if(previous!=arr[i].ssid) {
//				if(i!=0)
//					str+="</div>";
//				//data-role="collapsible-set"
//				str+="<div  data-role=\"collapsible\" data-inset=\"true\"><h3>"+arr[i].ssid+"</h3>";
//				if(arr[i].ssid!=arr[i+1].ssid)
//					str+="SSID: "+arr[i].ssid+" MAC: "+ arr[i].mac+" SIGNAL: "+arr[i].signal;
//					previous=arr[i].ssid;
//				
//					
//			}else{
//				str+="<button class =\"aps\" data-role=\"listview\" data-inset=\"true\"><h3>"+arr[i].ssid+" "+ arr[i].mac+" "+arr[i].signal+"</h3>This area displays more info</button>";
//				previous=arr[i].ssid;
//			
//			}
//		}
		$(".aps").trigger("create");
		$('#analyzeResults').html(str);
		$("#analyzeResults").trigger("create");

		//$(".aps").listview("refresh");

		//$('#analyzeResults').trigger( 'updatelayout' );
	}
	function nativePluginErrorHandler(result) {
		alert("Error "+result);
	}
	function wifiNativePluginSuccessHandler(result){
		//alert("Wifi On: "+result);	
	}
