module.exports = function (marker, circle, radius) {
	let km = radius;
	let kx = Math.cos((Math.PI * circle.lat) / 180) * 111;
	let dx = Math.abs(circle.lng - marker.lng) * kx;
	let dy = Math.abs(circle.lat - marker.lat) * 111;
	return Math.sqrt(dx * dx + dy * dy) <= km;
};
