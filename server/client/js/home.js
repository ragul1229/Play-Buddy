// client/js/home.js
const teamName = localStorage.getItem("teamName");

if (!teamName) {
  alert("You must login first");
  window.location.href = "login.html";
} else {
  document.getElementById("greeting").innerText = `Welcome to PlayBuddy, ${teamName}!`;
}

document.getElementById("nearbyBtn").addEventListener("click", () => {
  window.location.href = "nearby-teams.html";
});
