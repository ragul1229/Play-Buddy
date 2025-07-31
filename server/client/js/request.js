// ✅ request.js (Final Version)

let map;

window.initMap = async function () {
  const storedTeam = JSON.parse(localStorage.getItem("team"));
  if (!storedTeam) {
    alert("You must be logged in.");
    return;
  }

  const { teamId, coordinates } = storedTeam;

  if (!coordinates || coordinates.length !== 2) {
    alert("Invalid or missing coordinates.");
    return;
  }

  const [lng, lat] = coordinates;

  // Initialize map
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat, lng },
    zoom: 14,
  });

  // Marker for current team
  new google.maps.Marker({
    position: { lat, lng },
    map,
    title: "Your Team Location",
    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  });

  try {
    const response = await fetch("http://localhost:3000/api/teams/nearby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamId,
        coordinates: { latitude: lat, longitude: lng },
      }),
    });

    const nearbyTeams = await response.json();

    if (!response.ok || !Array.isArray(nearbyTeams)) {
      throw new Error(nearbyTeams.msg || "Failed to load nearby teams.");
    }

    const container = document.getElementById("teamsContainer");
    container.innerHTML = "";

    nearbyTeams.forEach((team) => {
      const card = document.createElement("div");
      card.className = "team-card";
      card.innerHTML = `
        <h3>${team.teamName}</h3>
        <p>Region: ${team.region || "N/A"}</p>
        <p>Phone: ${team.phoneNumber || "N/A"}</p>
        <button onclick="sendMatchRequest('${team._id}')">Send Match Request</button>
      `;
      container.appendChild(card);

      if (team.location && team.location.coordinates.length === 2) {
        const [tLng, tLat] = team.location.coordinates;
        new google.maps.Marker({
          position: { lat: tLat, lng: tLng },
          map,
          title: team.teamName,
          icon: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
        });
      }
    });
  } catch (error) {
    console.error("Error loading teams:", error);
    document.getElementById("teamsContainer").innerHTML =
      "<p style='color:red;'>Could not load nearby teams.</p>";
  }
};

async function sendMatchRequest(opponentTeamId) {
  const storedTeam = JSON.parse(localStorage.getItem("team"));
  if (!storedTeam || !storedTeam.teamId) {
    alert("Login required");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/match-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromTeamId: storedTeam.teamId,
        toTeamId: opponentTeamId,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Match request sent!");
    } else {
      alert(result.msg || "Request failed.");
    }
  } catch (err) {
    console.error("Match request error:", err);
    alert("Server error.");
  }
}
