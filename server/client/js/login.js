document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
if (response.ok) {
  // Save team in localStorage
  localStorage.setItem("team", JSON.stringify(data.team));  // <-- ✅ Important
  window.location.href = "home.html"; // or nearby.html based on your flow
} else {
  alert(data.msg || "Login failed");
}

  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred. Please try again later.');
  }
});
