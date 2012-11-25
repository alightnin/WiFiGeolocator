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
//	$('#map_canvas').gmap('addMarker', {'position': '39,-108', 'bounds': true}).click(function() {
//		$('#map_canvas').gmap('openInfoWindow', {'content': 'Hello World!'}, this);
//	});
	//alert("hi");
		$.getJSON( 'http://www.jmellor.net/wardriveapp/json.php?callback=?', function(data) { 
			console.log(data);
			$.each( data.markers, function(i, marker) {
				console.log(marker.latitude);
				$('#map_canvas').gmap('addMarker', { 
					'position': new google.maps.LatLng(marker.latitude, marker.longitude), 
					'bounds': true 
				}).click(function() {
					$('#map_canvas').gmap('openInfoWindow', { 'content': marker.content }, this);
				});
			});
		});
	});
//$.each(markerData, function(){
//	$('#map_canvas').gmap('addMarker', {'position': lat,lon', 'bounds': true}).click(function() {
//		$('#map_canvas').gmap('openInfoWindow', {'content': 'Hello World!'}, this);
//	});
//	
//})