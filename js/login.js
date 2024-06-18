const form = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");
const loginButton = document.getElementById("inloggen");
const loggedIn = document.cookie.includes("cookieAccepted=true")
	? localStorage.getItem("loggedIn")
	: null;
const logoutbutton = document.getElementById("uitloggen");

if (window.location.href.endsWith("login.html")) {
	form.addEventListener("submit", (event) => {
		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;

		if (username === "admin" && password === "admin") {
			localStorage.setItem("loggedIn", true);
			window.location.href = "index.html";
		} else {
			localStorage.setItem("loggedIn", false);
			event.preventDefault(); // Prevent form submission
			errorMessage.textContent =
				"Gelieve gebruikersnaam en wachtwoord correct in te voeren.";
		}
	});
}

// Check if user is logged in and hide/show login button accordingly
window.onload = function () {
	// Prompt user to accept cookies
	const cookieConsent = document.getElementById("cookieConsent");
	if (cookieConsent) {
		cookieConsent.addEventListener("click", () => {
			document.cookie = `cookieAccepted=true; path=/`;
			cookieConsent.style.display = "none";
		});
	}

	// Make cookies available for this site
	function getCookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(";").shift();
	}

	if (getCookie("cookieAccepted") !== "true") {
		cookieConsent.style.display = "block";
	}

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

loginButton.addEventListener("click", () => {
	window.location.href = "login.html";
});
