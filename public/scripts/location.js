function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  fetch('/location', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ latitude, longitude })
  })
  .then(res => res.json())
  .then(data => {
   console.log('Location sent to server:', data);
    // Optionally reload to update UI
   fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
    .then(response => response.json())
    .then((geoData)=> {
      const areaName = geoData.address.city || geoData.address.town || geoData.address.village;
      console.log('Location data:', areaName);
      // You can update the UI with the location data here
    })
    .catch(error => console.error('Error fetching location data:', error));
  });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log('Geolocation not supported');
  }
}

getLocation();