window.signup = async function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if(!username || !password) {
      alert("Please fill in both fields");
      return;
  }

  try {
    const response = await fetch("signup.php", { // Ensure path is correct
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    alert(data.message); // Informs user that details were sent
    
    // Clear fields
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred during signup.");
  }
}