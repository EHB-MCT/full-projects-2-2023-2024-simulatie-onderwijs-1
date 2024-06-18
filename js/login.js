const form = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");
const loggedIn = localStorage.getItem("loggedIn");
const loginButton = document.getElementById("inloggen");
const logoutbutton = document.getElementById("uitloggen");

form.addEventListener("submit", (event) => {
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	if (username === "admin" && password === "admin") {
		localStorage.setItem("loggedIn", true);
		location.reload();
		// Redirect to another page
		window.location.href = "index.html";
	} else {
		localStorage.setItem("loggedIn", false);
		event.preventDefault(); // Prevent form submission
		errorMessage.textContent =
			"Gelieve gebruikersnaam en wachtwoord correct in te voeren.";
	}
});

// Check if user is logged in and hide/show login button accordingly
window.onload = function () {
	if (loggedIn === "true") {
		loginButton.style.display = "none";
		logoutbutton.style.display = "block";
	} else {
		loginButton.style.display = "block";
		logoutbutton.style.display = "none";
	}
};

logoutbutton.addEventListener("click", () => {
	localStorage.setItem("loggedIn", false);
	location.reload();
});
