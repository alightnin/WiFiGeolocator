//Plugin JS
var workingSet=[];
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
		//WE NEED TO UPLOAD/SAVE EVERYTHING IN workingSet now
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
//		var temp= 'ap={"AP":[{"FREQUENCY":9,"SECURITY":"[WPA2-PSK-CCMP]","MAC":"00:26:f2:99:ea:e0","SSID":"ACM","SIGNAL":-45},{"FREQUENCY":11,"SECURITY":"[OPEN]","MAC":"00:25:84:93:a9:a3","SSID":"CMU Visitor","SIGNAL":-90},{"FREQUENCY":1,"SECURITY":"[OPEN]","MAC":"00:25:84:90:99:03","SSID":"CMU Visitor","SIGNAL":-89},{"FREQUENCY":1,"SECURITY":"[OPEN]","MAC":"00:25:84:90:23:73","SSID":"CMU Visitor","SIGNAL":-89},{"FREQUENCY":1,"SECURITY":"[OPEN]","MAC":"00:25:84:90:19:13","SSID":"CMU Visitor","SIGNAL":-89},{"FREQUENCY":6,"SECURITY":"[OPEN]","MAC":"00:25:84:90:22:23","SSID":"CMU Visitor","SIGNAL":-88},{"FREQUENCY":6,"SECURITY":"[OPEN]","MAC":"00:25:84:90:86:03","SSID":"CMU Visitor","SIGNAL":-86},{"FREQUENCY":6,"SECURITY":"[OPEN]","MAC":"00:25:84:93:a6:a3","SSID":"CMU Visitor","SIGNAL":-84},{"FREQUENCY":1,"SECURITY":"[OPEN]","MAC":"00:25:84:37:56:43","SSID":"CMU Visitor","SIGNAL":-83},{"FREQUENCY":11,"SECURITY":"[OPEN]","MAC":"00:25:84:94:67:53","SSID":"CMU Visitor","SIGNAL":-81},{"FREQUENCY":6,"SECURITY":"[OPEN]","MAC":"00:25:84:91:9e:13","SSID":"CMU Visitor","SIGNAL":-81},{"FREQUENCY":1,"SECURITY":"[OPEN]","MAC":"00:25:84:91:96:33","SSID":"CMU Visitor","SIGNAL":-71},{"FREQUENCY":6,"SECURITY":"[OPEN]","MAC":"00:25:84:93:a7:83","SSID":"CMU Visitor","SIGNAL":-60},{"FREQUENCY":1,"SECURITY":"[OPEN]","MAC":"00:25:84:90:a8:b3","SSID":"CMU Visitor","SIGNAL":-56},{"FREQUENCY":11,"SECURITY":"[OPEN]","MAC":"00:25:84:90:a4:b3","SSID":"CMU Visitor","SIGNAL":-56},{"FREQUENCY":1,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:90:23:71","SSID":"CMU WLAN","SIGNAL":-89},{"FREQUENCY":1,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:90:19:11","SSID":"CMU WLAN","SIGNAL":-89},{"FREQUENCY":1,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:90:99:01","SSID":"CMU WLAN","SIGNAL":-88},{"FREQUENCY":6,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:90:22:21","SSID":"CMU WLAN","SIGNAL":-88},{"FREQUENCY":6,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:90:86:01","SSID":"CMU WLAN","SIGNAL":-86},{"FREQUENCY":1,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:37:56:41","SSID":"CMU WLAN","SIGNAL":-84},{"FREQUENCY":6,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:93:a6:a1","SSID":"CMU WLAN","SIGNAL":-84},{"FREQUENCY":11,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:94:67:51","SSID":"CMU WLAN","SIGNAL":-81},{"FREQUENCY":6,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:91:9e:11","SSID":"CMU WLAN","SIGNAL":-81},{"FREQUENCY":1,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:91:96:31","SSID":"CMU WLAN","SIGNAL":-71},{"FREQUENCY":6,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:93:a7:81","SSID":"CMU WLAN","SIGNAL":-60},{"FREQUENCY":1,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:90:a8:b1","SSID":"CMU WLAN","SIGNAL":-56},{"FREQUENCY":11,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:90:a4:b1","SSID":"CMU WLAN","SIGNAL":-45}]})';
		var xmlhttp=new XMLHttpRequest();
//		xmlhttp.open("POST","http://jmellor.net/wardrivingapp/post.php",true);
//		xmlhttp.send(temp);
//		xmlHttp = new XMLHttpRequest();
//	    xmlHttp.open( "GET", theUrl, false );
//	    xmlHttp.send( null );

		
		
		// This is for debugging only. This code will change to upload or save instead of display
		var key, i=0, str;
		var newRes = [];
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

			newRes.push(obj);
		}

		url="http://jmellor.net/wardriveapp/post.php?";
		var matches = false;
		//console.log("Length "+ workingSet.length);
		if(workingSet.length==0){
			for(var q=0; q<newRes.length; q++){
				workingSet.push(newRes[q]);
				//console.log("workingset "+workingSet[q].ssid);
			}
		} else {
		//console.log("Length "+ workingSet.length);

		for(var i=0; i< workingSet.length; i++){
			matches=false;
			for(var j=0; j<newRes.length; j++){
				if(workingSet[i].mac==newRes[j].mac && workingSet[i].ssid==newRes[j].ssid){
					// the ap exists in workingSet and newRes
//					console.log(workingSet[i].ssid+" IN newRES and workingSet");
					if(newRes[j].signal>workingSet[i].signal){
						//The Signal went up
//						console.log(workingSet.ssid+" signal++");
						workingSet[i]=newRes[j];
						matches=true;
					} else if (newRes[j].signal<workingSet[i].signal){
						//We are getting further away so we should upload what we have
						//upload workingSet[i]
//						console.log(workingSet.ssid+" Is getting further away");
						url="http://jmellor.net/wardriveapp/post.php?";
						url+="lat="+workingSet[i].latitude+"&long="+workingSet[i].longitude+"&ssid="+workingSet[i].ssid+"&mac="+workingSet[i].mac+"&freq="+workingSet[i].frequency+"&sec="+workingSet[i].security+"&signal="+workingSet[i].signal;
						xmlhttp.open("GET",url,true);
						xmlhttp.send(null);
//						console.log(xmlhttp.responseText);
						url="";
						matches=true;
					}
				}else{

					workingSet.push(newRes[i]);
					//the new ap is in newRes but not in working set
//					console.log(workingSet[i].ssid+" added to WorkingSet");
					matches=true;
				}
			}
			//If matches==false, We lost the ap.
			if(matches==false){
//				console.log(workingSet.ssid+" ap is lost");
				url="http://jmellor.net/wardriveapp/post.php?";
				url+="lat="+workingSet[i].latitude+"&long="+workingSet[i].longitude+"&ssid="+workingSet[i].ssid+"&mac="+workingSet[i].mac+"&freq="+workingSet[i].frequency+"&sec="+workingSet[i].security+"&signal="+workingSet[i].signal;
				xmlhttp.open("GET",url,true);
				xmlhttp.send(null);
				//console.log(xmlhttp.responseText);
				console.log(url);
				url="";
			}
		}
					
		//UPLOAD URL http://jmellor.net/wardriveapp/post.php?lat=00&long=00&ssid=%22NULLSSID%22&mac=NULLMAC&freq=0&sec=SOME&signal=11		
//		for(i=0; i<arr.length; i++) {
//			markerData[i]=arr[i];
//			str+=arr[i].ssid + " " + arr[i].mac+arr[i].security + " " +arr[i].frequency + " " +arr[i].signal + " " +arr[i].lat+" "+arr[i].lon+"</br>";
//		}
		}
		res.innerHTML=url;	

	}
    function storeToDB(tx) {
       // console.log("inserted "+tx.ssid);
        tx.executeSql('INSERT INTO wifi (mac, ssid, security, signal, channel, latitude, longitude) VALUES (tx.mac, tx.ssid, tx.security, tx.signal, tx.frequency, tx.latitude, tx.longitude)');

    }
	function analyzeNativePluginSuccessHandler(result){
		var key, i=0, str=" ";//"<div id=\"analyzeResultsDiv\" data-role=\"collapsible-set\" data-inset=\"false\" data-theme=\"b\" data-content-theme=\"d\">";
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
					str+="<div onclick=\"showDiv(\'listdiv"+identity+"\')\" id=\"maindiv"+arr[i].ssid+"\" data-role=\"listview\" data-inset=\"true\"><h3>SSID: "+arr[i].ssid+" MAC: "+ arr[i].mac+" SIGNAL: "+arr[i].signal+"</div>";

				if(arr[i].ssid==next)
				{ 
				str+="<div id=\"listdiv"+identity+"\" class=\"sublists\" data-role=\"listview\" data-inset=\"true\">";
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
	
	
