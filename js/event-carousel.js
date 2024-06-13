document.addEventListener(
	"DOMContentLoaded",
	function () {
		let fadeComplete = function (e) {
			stage.appendChild(arr[0]);
		};

		let stage = document.getElementById("slider-1", "slider-2", "slider-3");
		let arr = stage.getElementsByTagName("img");

		for (const element of arr) {
			element.addEventListener("animationend", fadeComplete, false);
		}
	},
	false
);
