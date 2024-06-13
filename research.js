const onderzoekenList = document.getElementById('onderzoeken-list');
const onderzoekInput = document.getElementById('onderzoek-input');
const addOnderzoekBtn = document.getElementById('add-onderzoek-btn');
const clearOnderzoekenBtn = document.getElementById('clear-onderzoeken-btn');
const colorPicker = document.getElementById('color-picker');

let onderzoeken = [];

// Load onderzoeken from local storage
if (localStorage.getItem('onderzoeken')) {
    onderzoeken = JSON.parse(localStorage.getItem('onderzoeken'));
    renderOnderzoeken();
}

addOnderzoekBtn.addEventListener('click', addOnderzoek);
clearOnderzoekenBtn.addEventListener('click', clearOnderzoeken);
colorPicker.addEventListener('input', updateColor);

function addOnderzoek() {
    const onderzoek = {
        text: onderzoekInput.value,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQpJhDapFwCJRntAkbOKa1Jh1QDgw3NDB3YA&s', // add image URL or blob here
        description: '',
        color: colorPicker.value
    };
    onderzoeken.push(onderzoek);
    localStorage.setItem('onderzoeken', JSON.stringify(onderzoeken));
    renderOnderzoeken();
    onderzoekInput.value = '';
}

function clearOnderzoeken() {   
    onderzoeken = [];
    localStorage.removeItem('onderzoeken');
    renderOnderzoeken();
}

function updateColor() {
    const selectedColor = colorPicker.value;
    onderzoeken.forEach(onderzoek => {
        onderzoek.color = selectedColor;
    });
    localStorage.setItem('onderzoeken', JSON.stringify(onderzoeken));
    renderOnderzoeken();
}

function renderOnderzoeken() {
    onderzoekenList.innerHTML = '';
    onderzoeken.forEach(onderzoek => {
        const onderzoekTemplate = document.createElement('li');
        onderzoekTemplate.className = 'onderzoek';
        onderzoekTemplate.style.backgroundColor = onderzoek.color;
        onderzoekTemplate.innerHTML = `
            <img src="${onderzoek.image}" alt="Onderzoek image">
            <div class="onderzoek-text">
                <h2>${onderzoek.text}</h2>
                <p>${onderzoek.description}</p>
            </div>
            <button class="show-description" style="background-color: red; border-radius: 10px;">Show description</button>
        `;
        onderzoekTemplate.querySelector('.show-description').addEventListener('click', () => {
            // show description logic here
        });
        onderzoekenList.appendChild(onderzoekTemplate);
    });
}