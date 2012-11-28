//Map JS
var serviceURL = "http://jmellor.net/wardriveapp/";
$(function() {
	var yourStartLatLng = new google.maps.LatLng(39, -108);
		$('#map_canvas').gmap({'center': yourStartLatLng});
		$('#map_canvas').gmap('option', 'zoom', 17);
});
$('#map').live("pageshow", function() {
	$('#map_canvas').gmap('refresh');

});
$('#map').live("pageinit", function() {
	//alert(latitude+ " "+longitude); 
	$('#map_canvas').gmap('option', 'zoom', 17);
//	$.getJSON(serviceURL+'/json.php?lat='+latitude+'&long='+longitude, function(data) { 
//		$.each( data.aps, function(i, marker) {
//			$('#map_canvas').gmap('addMarker', { 
//				'position': new google.maps.LatLng(marker.latitude, marker.longitude), 
//				'bounds': true 
//			}).click(function() {
//				var str="<p style=\"color:black;\"><b>" + marker.ssid + "</b> <br/> Mac Address: <i>" + marker.mac + "</i><br/> Security: <i>" + marker.security + "</i><br/> Channel: <i>" + marker.channel + "</i><br/>Signal Strength: <i>" + marker.signal + "</i></p>";
//
//				$('#map_canvas').gmap('openInfoWindow', { 'content': str }, this);
//			});
//		});
//	});
});
//$.each(markerData, function(){
//	$('#map_canvas').gmap('addMarker', {'position': lat,lon', 'bounds': true}).click(function() {
//		$('#map_canvas').gmap('openInfoWindow', {'content': 'Hello World!'}, this);
//	});
//	
//})


function showMarkers(){
//	alert("Showing Markers"+ latitude );
	$.getJSON(serviceURL+'/json.php?lat='+latitude+'&long='+longitude, function(data) { 
		$.each( data.aps, function(i, marker) {
			$('#map_canvas').gmap('addMarker', { 
				'position': new google.maps.LatLng(marker.latitude, marker.longitude), 
				'bounds': true 
			}).click(function() {
				var str="<p style=\"color:black;\"><b>" + marker.ssid + "</b> <br/> Mac Address: <i>" + marker.mac + "</i><br/> Security: <i>" + marker.security + "</i><br/> Channel: <i>" + marker.channel + "</i><br/>Signal Strength: <i>" + marker.signal + "</i></p>";

				$('#map_canvas').gmap('openInfoWindow', { 'content': str }, this);
			});
		});
	});
}

