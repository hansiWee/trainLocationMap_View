const map = L.map('map').setView([0, 0], 2); // Initial view

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let trainMarker;

async function updateTrainLocation(trainId) {
  try {
    const response = await fetch(`http://localhost:3000/train/${trainId}/location`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const location = await response.json();
    console.log('Location data:', location); // Debugging statement

    const { latitude, longitude } = location;

    if (trainMarker) {
      trainMarker.setLatLng([latitude, longitude]);
    } else {
      trainMarker = L.marker([latitude, longitude]).addTo(map);
    }

    map.setView([latitude, longitude], 13); // Adjust the view to the train's location
  } catch (error) {
    console.error('Error fetching train location:', error);
  }
}

// Call the function with a specific train ID
updateTrainLocation(12);