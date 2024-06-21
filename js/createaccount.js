const formacc = document.getElementById("formcreate");
formacc.addEventListener("submit", (e) => {
	e.preventDefault();

	const username = document.querySelector("#username").value.trim();
	const email = document.querySelector("#email").value.trim();
	const password = document.querySelector("#password").value.trim();
	const repassword = document.querySelector("#repassword").value.trim();

	if (username === "" || email === "" || password === "") {
		alert("Please fill in all fields");
		return;
	}

	if (password !== repassword) {
		alert("Passwords do not match");
		return;
	}

	const data = { username, email, password };
	const dataString = JSON.stringify(data);

	// Encrypt the password using a simple algorithm
	const encryptedPassword = password
		.split("")
		.map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
		.join("");

	fetch("submit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, email, password: encryptedPassword }),
	})
		.then((response) => response.text())
		.then((data) => {
			const pswFile = "/psw.txt";
			fetch(pswFile, {
				method: "POST",
				headers: {
					"Content-Type": "text/plain",
				},
				body: `${username}:${encryptedPassword}`,
			})
				.then((response) => response.text())
				.then((data) => alert("Account created successfully!"))
				// redirect to login page
				.then(() => (window.location.href = "login.html"))
				.catch((error) => console.error("Error:", error));
		})
		.catch((error) => console.error("Error:", error));
});
