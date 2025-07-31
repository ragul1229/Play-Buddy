let map;

window.initMap = async function () {
  const storedTeam = localStorage.getItem("team");

  if (!storedTeam) {
    alert("You must be logged in.");
    return;
  }

  const parsedTeam = JSON.parse(storedTeam);
  const _id = parsedTeam._id;

  // Validate coordinates
  if (
    !parsedTeam.location ||
    !parsedTeam.location.coordinates ||
    !Array.isArray(parsedTeam.location.coordinates) ||
    parsedTeam.location.coordinates.length !== 2
  ) {
    alert("Invalid coordinates.");
    return;
  }

  const [lng, lat] = parsedTeam.location.coordinates;

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat, lng },
    zoom: 14,
  });

  new google.maps.Marker({
    position: { lat, lng },
    map,
    title: "Your Team Location",
    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  });

  try {
    const response = await fetch("http://localhost:3000/api/teams/nearby", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        teamId: _id,
        coordinates: { latitude: lat, longitude: lng },
      }),
    });

    const result = await response.json();

    if (!Array.isArray(result)) {
      throw new Error(result.msg || "Invalid response from server");
    }

    const container = document.getElementById("teamsContainer");
    container.innerHTML = "";
    

    result.forEach((team) => {
      const [teamLng, teamLat] = team.location.coordinates;

      const marker = new google.maps.Marker({
        position: { lat: teamLat, lng: teamLng },
        map,
        title: team.teamName,
        icon: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="color:#000;">
            <strong>${team.teamName}</strong><br/>
            <button onclick="alert('Match request sent!')">Request Match</button>
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      const card = document.createElement("div");
      card.className = "team-card";
      card.innerHTML = `
        <h3>${team.teamName}</h3>
        <p>Region: ${team.region || "N/A"}</p>
        <p>Phone: ${team.phoneNumber || "N/A"}</p>
        <button onclick="alert('Match request sent!')">Send Match Request</button>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading nearby teams:", err);
    document.getElementById("teamsContainer").innerHTML =
      "<p style='color:red;'>Failed to load nearby teams.</p>";
  }
};
