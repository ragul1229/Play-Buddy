document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form"); // Match the HTML ID exactly

  if (!signupForm) {
    console.error("Form not found. Make sure signup-form ID exists in HTML.");
    return;
  }

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! Please login.");
        window.location.href = "index.html";
      } else {
        alert(data.msg || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Error during signup");
    }
  });
});
