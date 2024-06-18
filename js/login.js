// script.js
const form = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", (event) => {
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	if (username === "" || password === "") {
		event.preventDefault(); // Prevent form submission
		errorMessage.textContent = "Please fill in both username and password.";
	}
});
