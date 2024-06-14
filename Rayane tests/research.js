const apiUrl = 'http://localhost:3000';

const postList = document.getElementById('post-list');
const newPostForm = document.getElementById('new-post-form');
const submitBtn = document.getElementById('submit-btn');

fetch(`${apiUrl}/posts`)
   .then(response => response.json())
   .then(posts => {
        posts.forEach(post => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <h2>${post.title}</h2>
                <p>Image: <a href="${post.image}" target="_blank">${post.image}</a></p>
                <p>Date: ${post.date}</p>
                <p>Content: ${post.content}</p>
            `;
            postList.appendChild(listItem);
        });
    });

newPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const image = document.getElementById('image').value;
    const date = document.getElementById('date').value;
    const content = document.getElementById('content').value;

    fetch(`${apiUrl}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, image, date, content })
    })
       .then(response => response.json())
       .then(post => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <h2>${post.title}</h2>
                <p>Image: <a href="${post.image}" target="_blank">${post.image}</a></p>
                <p>Date: ${post.date}</p>
                <p>Content: ${post.content}</p>
            `;
            postList.appendChild(listItem);
        });
});