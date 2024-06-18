// Het formulier voor inloggen
const form = document.getElementById("login-form");

// Het element waarin een foutmelding wordt weergegeven
const errorMessage = document.getElementById("error-message");

// De "Inloggen" knop
const loginButton = document.getElementById("inloggen");

// Controleer of de gebruiker is ingelogd
const loggedIn = document.cookie.includes("cookieAccepted=true")
	? localStorage.getItem("loggedIn")
	: null;

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
			window.location.href = "index.html";
		} else {
			localStorage.setItem("loggedIn", false);
			event.preventDefault(); // Voorkom dat het formulier wordt verzonden
			errorMessage.textContent =
				"Vul a.u.b. de juiste gebruikersnaam en wachtwoord in.";
		}
	});
}

// Controleer of de gebruiker is ingelogd en pas de weergave van de login/logout knoppen aan
window.onload = function () {
	// Vraag de gebruiker toestemming om cookies te gebruiken
	const cookieConsent = document.getElementById("cookieConsent");
	if (cookieConsent) {
		cookieConsent.addEventListener("click", () => {
			document.cookie = `cookieAccepted=true; path=/`;
			cookieConsent.style.display = "none";
		});
	}

	// Zorg ervoor dat cookies beschikbaar zijn voor de site
	function getCookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(";").shift();
	}

	if (getCookie("cookieAccepted") !== "true") {
		cookieConsent.style.display = "block";
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
