var theScroll;
function scroll(){
    theScroll = new iScroll('wrapper');
}
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
function init() {
	var mapOptions ={
		center: new google.maps.LatLng(39.08, -108.52),
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map= new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
}