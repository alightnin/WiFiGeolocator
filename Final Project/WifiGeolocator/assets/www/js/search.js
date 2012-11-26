function startSearch() {
	var str= "/json.php?lat="+latitude+"&long="+longitude;
	var tbl="<table>";
	console.log(str);
	$.getJSON(serviceURL+str, function(data) { 
		$.each( data.aps, function(i, ap) {
			tbl+="<tr><td>"+ap.ssid+"  </td><td>"+ap.security+"  </td><td>latitude: "+ap.latitude+"  </td><td>longitude: "+ ap.longitude+"  </td></tr>";
			console.log(tbl);
			document.getElementById("searchRes").innerHTML="";
			document.getElementById("searchRes").innerHTML=tbl+"</table>";

		});
});
//	alert("yay");
	//tbl+="</table>";
//	console.log(tbl);
	//document.getElementById("searchRes").innerHTML=tbl;
}