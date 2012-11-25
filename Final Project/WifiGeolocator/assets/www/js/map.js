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