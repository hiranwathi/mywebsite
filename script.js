async function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await res.text();
  alert(data);

  document.getElementById("username").value = "";
  document.getElementById("password").value = "";

  document.getElementById("signupSection").style.display = "none";
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.message === "Login successful") {
    window.location.href = "portfolio.html";
  } else {
    alert("Invalid credentials");
  }
}