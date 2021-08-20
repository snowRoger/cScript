function getDistance(lng1,lat1,  lng2,lat2){
	
	var radLat1 = lat1*Math.PI / 180.0;
	var radLat2 = lat2*Math.PI / 180.0;
	var a = radLat1 - radLat2;
	var b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
	Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
	s = s *6378.137 ;// EARTH_RADIUS;
	s = Math.round(s * 10000) / 10000;
	return s;
}

// getDistance(123.909071,41.869161,123.922383,41.869913);
getDistance(123.89740699999791,41.86211399999928,123.91025164615333,41.86232548433837);