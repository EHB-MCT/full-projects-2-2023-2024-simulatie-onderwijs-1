// Het formulier voor inloggen
const form = document.getElementById("login-form");

// Het element waarin een foutmelding wordt weergegeven
const errorMessage = document.getElementById("error-message");

//cookie
const cookieConsent = document.querySelector(".cookie-consent");

// De "Inloggen" knop
const loginButton = document.getElementById("inloggen");

// Controleer of de gebruiker is ingelogd
let loggedIn = localStorage.getItem("loggedIn");

// De "Uitloggen" knop
const logoutbutton = document.getElementById("uitloggen");

// Controleer of de gebruiker op de pagina is die inloggen vereist
if (window.location.href.endsWith("login.html")) {
	// Voeg een event listener toe aan het formulier om de inlogactie te controleren
	form.addEventListener("submit", (event) => {
		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;

		const lines = require("fs").readFileSync("psw.txt", "utf-8").split("\n");
		const validCredentials = lines.some((line) => {
			const [user, pass] = line.split(",");
			return user === username && decryptPassword(pass) === password;
		});

		if (validCredentials) {
			localStorage.setItem("loggedIn", true);
			loggedIn = "true";
			window.location.href = "index.html";
			console.log("Inloggen gelukt");
		} else {
			localStorage.setItem("loggedIn", false);
			loggedIn = "false";
			// Voorkom dat het formulier wordt verzonden
			event.preventDefault();
			errorMessage.textContent =
				"Vul a.u.b. de juiste gebruikersnaam en wachtwoord in.";
			console.log("Inloggen mislukt");
		}
	});
}

// Controleer of de gebruiker is ingelogd en pas de weergave van de login/logout knoppen aan
window.onload = function () {
	// Vraag de gebruiker toestemming om cookies te gebruiken
	if (cookieConsent) {
		cookieConsent.addEventListener("click", () => {
			document.cookie = `cookieAccepted=true; path=/`;
			cookieConsent.style.display = "none";
		});
	}

	// Controleer of de gebruiker is ingelogd
	if (loggedIn === "true") {
		loginButton.style.display = "none";
		logoutbutton.style.display = "block";
	} else {
		loginButton.style.display = "block";
		logoutbutton.style.display = "none";
	}
	//indien gebruiker zich op de pagina research of forum zit en niet ingelogt is, ga naar inlogpagina
	if (
		window.location.href.endsWith("research.html") ||
		window.location.href.endsWith("tips-en-tricks.html")
	) {
		if (loggedIn !== "true") {
			window.location.href = "login.html";
		}
	}
};

logoutbutton.addEventListener("click", () => {
	localStorage.setItem("loggedIn", false);
	location.reload();
});

loginButton.addEventListener("click", () => {
	window.location.href = "login.html";
});

//functie om wachtwoord te encrypteren
function encryptPassword(password) {
	const encoder = new TextEncoder();
	const data = encoder.encode(password);
	return crypto.subtle.digest("SHA-256", data).then((arrayBuffer) => {
		const hashArray = Array.from(new Uint8Array(arrayBuffer));
		const hashHex = hashArray
			.map((b) => b.toString(16).padStart(2, "0"))
			.join("");
		return hashHex;
	});
}

// functie om de wachtwoord te decrypten
function decryptPassword(password) {
	const encoder = new TextEncoder();
	const data = encoder.encode(password);
	return crypto.subtle.digest("SHA-256", data).then((arrayBuffer) => {
		const hashArray = Array.from(new Uint8Array(arrayBuffer));
		const hashHex = hashArray
			.map((b) => b.toString(16).padStart(2, "0"))
			.join("");
		return hashHex;
	});
}

//bij laden van de website de cookieconsent aanmaken als de gebruiker niet ze heeft geaccepteerd
document.addEventListener("DOMContentLoaded", function () {
	if (!cookieConsent) {
		return;
	}
	cookieConsent.style.display = "block";
});

//bij verlaten van de website de cookieconsent verbergen
document.addEventListener("beforeunload", function () {
	if (!cookieConsent) {
		return;
	}
	cookieConsent.style.display = "none";
});
