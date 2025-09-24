
// Returns if visitor is within ~25 miles of downtown Kansas City
function toRad(d){return d*Math.PI/180;}
function haversine(lat1, lon1, lat2, lon2){
  const R = 3958.8; // miles
  const dLat = toRad(lat2-lat1), dLon = toRad(lon2-lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  return 2*R*Math.asin(Math.sqrt(a));
}
export async function onRequestGet({ request }){
  const cf = request.cf || {};
  const city = cf.city || null;
  const lat = cf.latitude, lon = cf.longitude;
  const KC_LAT = 39.0997, KC_LON = -94.5786;
  let in_radius = false, dist = null;
  if(lat && lon){ dist = haversine(KC_LAT, KC_LON, Number(lat), Number(lon)); in_radius = dist <= 25; }
  return new Response(JSON.stringify({ city, region: cf.region||null, in_radius, dist }), { headers: { 'Content-Type':'application/json' }});
}
