import response from "./response.js";
//Load data from response.js
document.addEventListener("DOMContentLoaded", function () {
	let Research = response.Research;
	//define response data
	console.log(Research);

	const URL =
		"https://even-camera.pockethost.io/api/collections/Research/records";

	fetch(URL)
		.then((response) => response.json())
		.then((data) => displayData(data));

	function displayData(data) {
		const researchList = document.getElementById("research-grid");
		data.forEach((Research) => {
			const listItem = document.createElement("div");
			listItem.innerHTML = `
            <div class="research-item">
                <img class="research-photo" src="${research.image}" alt="${research.title}">
                <div class="research-info">
                    <a href="${research.link}" class="research-name">${research.title}</a>
                    <p class="research-date">${research.date}</p>
                </div>
            </div>
        `;
			researchList.appendChild(listItem);
		});
	}
});
