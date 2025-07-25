document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const teamName = document.getElementById("teamName").value;
  const locationName = document.getElementById("location").value;

  try {
    // 1. Get coordinates from location name using Nominatim API (free)
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`);
    const data = await response.json();

    if (!data.length) {
      alert("Location not found! Try a nearby or valid name.");
      return;
    }

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);

    // 2. Save teamName and coordinates to localStorage
    localStorage.setItem("teamName", teamName);
    localStorage.setItem("location", JSON.stringify({
      type: "Point",
      coordinates: [lon, lat]
    }));

    // 3. Redirect to home
    window.location.href = "home.html";

  } catch (err) {
    console.error("Error converting location to coordinates:", err);
    alert("Failed to locate your region. Try again.");
  }
});
