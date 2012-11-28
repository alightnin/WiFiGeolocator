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
		if(latitude!=-999 && longitude!=-999){
			inter=setInterval(function(){startScanning(scanType)}, 3000);
			//startScanning();
//			stat.innerHTML="Scanning...";
		}else{
			alert("You need to turn on your GPS");
		}
		$('#startButton').hide();
		$('#stopButton').show();
		$('#analyzeStartButton').hide();
		$('#analyzeStopButton').show();
	}
	function stopButtonPressed(){
		clearInterval(inter);
//		stat.innerHTML="Idle"; 
		$('#stopButton').hide();
		$('#startButton').show();
		$('#analyzeStopButton').hide();
		$('#analyzeStartButton').show();
	}
	function turnOnWifi(){
		WifiPlugin.callNativeFunction(wifiNativePluginSuccessHandler, nativePluginErrorHandler, "TurnOn", null);
	}
	function startScanning(scanType) {
		//res.innerHTML=" ";
		WifiPlugin.callNativeFunction(scanType, nativePluginErrorHandler, "Scan", null);
	}

	function captureNativePluginSuccessHandler(result) {



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
		var key, i=0, str=" ";
		var arr = [], ids=[];
		var previous="", next="", identity="";
		
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
			identity=arr[i].ssid;
			identity = identity.replace(/\s+/g, '');
			if(i!=arr.length-1) next=arr[i+1].ssid;

			if(arr[i].ssid!=previous) {

					ids.push(identity);
					str+="<div onclick=\"showDiv(\'listdiv"+identity+"\')\" id=\"maindiv"+arr[i].ssid+"\" data-role=\"listview\" data-inset=\"true\"><h3>SSID: "+arr[i].ssid+" SIGNAL: "+arr[i].signal+"</div>";

				if(arr[i].ssid==next)
				{ 
				str+="<div id=\"listdiv"+identity+"\" class=\"sublists\" data-role=\"listview\" data-inset=\"true\">";
				}
				previous=arr[i].ssid;
				
			}else{
				
				str+="<li class =\"aps"+arr[i].ssid+"\" data-role=\"listview\" data-inset=\"true\"><h3>"+arr[i].ssid+" "+arr[i].signal+"dB </h3>This area displays more info</li>";
				if(next!=arr[i].ssid)
					str+="</div>";
					
				previous=arr[i].ssid;
			
			}
		}
		$(".aps").trigger("create");
		$('#analyzeResults').html(str);
		$("#analyzeResults").trigger("create");
		$(".sublists").hide();
	}
	function nativePluginErrorHandler(result) {
		alert("Error "+result);
	}
	function wifiNativePluginSuccessHandler(result){
		//alert("Wifi On: "+result);	
	}
	
	function showDiv(divToShow) {
		$("#"+divToShow).toggle();
		//console.log("here");
	}
	
	
