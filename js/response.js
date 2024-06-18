import URL from "./research.js";
const apiUrl = URL;

//maak mijn classes aan op basis van de URL
class Research {
	constructor(title, image, date, content, link) {
		this.title = title;
		this.image = image;
		this.date = date;
		this.content = content;
		this.link = link;
	}
}
// maak de getData functie aan voor de class research
const data = [];

//get functie voor de date
export function getDate() {
	return this.date;
}

//get functie voor de image
export function getImage() {
	return this.image;
}

//get functie voor de title
export function getTitle() {
	return this.title;
}

//get functie voor de content
export function getContent() {
	return this.content;
}

//get functie voor de link
export function getLink() {
	return this.link;
}

//maak een fetch aan om de data op te halen
fetch(apiUrl)
	.then((response) => response.json())
	.then((json) => {
		json.records.forEach((json) => {
			data.push(
				new Research(
					json.title,
					json.image,
					json.date,
					json.content,
					json.link,
					json.author,
					json.tags,
					json.modified
				)
			);
		});
	})
	.catch((error) => console.log(error));

//data get functie
export default data;

//create response.research
export const Research = response.Research;

//create response.tags
export const Tags = response.Tags;

//create response.author
export const Author = response.Author;

//create response.date
export const Date = response.Date;

//create response.conten
export const Content = response.Content;

//create response.link
export const Link = response.Link;

//create response.image
export const Image = response.Image;

//create response.title
export const Title = response.Title;

//create response.modified
export const Modified = response.Modified;

//create response.author
export const Author = response.Author;
