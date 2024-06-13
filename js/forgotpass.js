function sendOTP() {
	const email = document.getElementById("email").value;
	const otpverify = document.getElementsByClassName("otpverify")[0];

	//ensure the email input is valid
	if (!email) {
		alert("Please enter a valid email address.");
		return;
	}

	let otp_val = Math.floor(1000 + Math.random() * 9000); // generates a 4-digit code
	let emailbody = `<h2>Your code is ${otp_val}</h2>`;

	Email.send({
		SecureToken: "dcced8fb-76c1-43e8-9fa1-9cfc79ef4907",
		To: email, //dont get the code in mailbox (doesn't send a mail)
		From: "meredith.lauwerens@student.ehb.be",
		Subject: "Verification code",
		Body: emailbody,
	})
		.then((message) => {
			if (message === "OK") {
				alert("Code sent to your email " + email);

				otpverify.style.display = "flex";
				const otp_inp = document.getElementById("otp_inp");
				const otp_btn = document.getElementById("otp_btn");

				otp_btn.addEventListener("click", () => {
					if (otp_inp.value == otp_val) {
						alert("Email address verified.");
					} else {
						alert("Invalid code");
					}
				});
			} else {
				alert("Failed to send the email. Please try again.");
			}
		})
		.catch((error) => {
			alert("An error occurred: " + error.message);
		});
}
