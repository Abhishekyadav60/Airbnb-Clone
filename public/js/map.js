  //   mapboxgl.accessToken = mapToken;
  //   const map = new mapboxgl.Map({
  //  container: 'map', // container ID
  //    center: listing.geometry.coordinates, // starting position [lng, lat]
  //    style: 'mapbox://styles/mapbox/streets-v9', 
  //    zoom: 9 // starting zoom
  //   });

   
  //   // Create a new marker.
  //   const marker = new mapboxgl.Marker({color : "red"})
  //   .setLngLat(listing.geometry.coordinates) //listing/geomertyu / coordinatre
  //   .setPopup(new mapboxgl.Popup({offset: 25})
    
  //   .setHTML(`<h4>${listing.title}</h4><p>Exact location provided after booking!</p>`))
  //   .addTo(map);
    
    

mapboxgl.accessToken = mapToken;

const coordinates = listing?.geometry?.coordinates;

if (
  Array.isArray(coordinates) &&
  coordinates.length === 2 &&
  typeof coordinates[0] === 'number' &&
  typeof coordinates[1] === 'number'
) {
  const map = new mapboxgl.Map({
    container: 'map',
    center: coordinates,
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 9
  });

  new mapboxgl.Marker({ color: 'red' })
    .setLngLat(coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h4>${listing.title}</h4><p>Exact location provided after booking!</p>`)
    )
    .addTo(map);
} else {
  console.error('Invalid or missing coordinates:', coordinates);

  // Optional fallback:
  const fallbackCoordinates = [77.5946, 12.9716]; // Example: Bangalore
  const map = new mapboxgl.Map({
    container: 'map',
    center: fallbackCoordinates,
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 5
  });

   new mapboxgl.Marker({ color: 'gray' })
    .setLngLat(fallbackCoordinates)
     .setPopup(
     new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h4>${listing?.title || 'Unknown Listing'}</h4><p>Location not available</p>`)
     )
    .addTo(map);
 }
