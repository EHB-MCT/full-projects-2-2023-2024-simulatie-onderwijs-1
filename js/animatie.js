window.addEventListener("scroll", function () {
	const fotoContainer = document.getElementById("photo-container");
	const animatie = fotoContainer.querySelector("::before");

	const scrollTop = window.scrollY; /* Scrollpositie ophalen */
	const afstandsGrens = 100; /* Afstand vanaf de bovenkant waar de animatie start */

	if (scrollTop >= afstandsGrens) {
		animatie.style.opacity = 1; /* Animatie tonen */
	} else {
		animatie.style.opacity = 0; /* Animatie verbergen */
	}
});
