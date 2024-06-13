fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'User 1'
    })
})
.then(res => {
    if (res.ok) {
        return res.json(); // Parse the response body as JSON
    } else {
        console.log("FAILED");
    }
})
.then(data => console.log(data)) // Handle the parsed JSON data
.catch(error => console.log('ERROR', error)); // Log the error with the error message
