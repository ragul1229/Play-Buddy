// nearby.js

const teamName = localStorage.getItem('teamName');
const location = localStorage.getItem('location');

if (!teamName || !location) {
  alert("You must login first");
  window.location.href = 'login.html';
}

const locationParts = location.split(',');
const latitude = parseFloat(locationParts[0]);
const longitude = parseFloat(locationParts[1]);

// Show current team info
document.getElementById('current-team').textContent = `Logged in as: ${teamName}`;

fetch(`/api/teams/nearby?latitude=${latitude}&longitude=${longitude}`)
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('nearby-teams');

    if (data.length === 0) {
      container.innerHTML = "<p>No nearby teams found.</p>";
      return;
    }

    data.forEach(team => {
      const card = document.createElement('div');
      card.className = 'team-card';
      card.innerHTML = `
        <h3>${team.teamName}</h3>
        <p>Lat: ${team.location.coordinates[1]}, Lng: ${team.location.coordinates[0]}</p>
        <button onclick="sendMatchRequest('${team._id}')">Send Match Request</button>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error fetching nearby teams:", error);
  });

// Dummy match request function
function sendMatchRequest(teamId) {
  alert(`Match request sent to team ID: ${teamId}`);
  // You can later update this to make a POST call to `/api/teams/request-match`
}
