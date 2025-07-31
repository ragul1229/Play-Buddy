document.getElementById("setLocationBtn").addEventListener("click", async () => {
  const locationName = document.getElementById("locationInput").value.trim();

  if (!locationName) {
    alert("Please enter your location!");
    return;
  }

  try {
    // Replace with your own Google Maps Geocoding API key
    const apiKey = "AIzaSyCpv2ztZvorS0XJCeG1mwH-LZvhxfEDAvM"; // put your actual API key here
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationName)}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.status !== "OK" || !data.results[0]) {
      alert("Location not found. Try a different one.");
      return;
    }

    const { lat, lng } = data.results[0].geometry.location;
    const teamId = localStorage.getItem("teamId");

    if (!teamId) {
      alert("Team ID missing. Please log in again.");
      return;
    }

    // Save lat/lng to MongoDB
    await fetch(`http://localhost:3000/api/teams/${teamId}/location`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lat, lng }),
    });

    // Redirect to nearby teams page
    window.location.href = "nearby-teams.html";
  } catch (err) {
    console.error(err);
    alert("Error fetching location.");
  }
});
