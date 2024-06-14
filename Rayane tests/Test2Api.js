//console.log("hELLO")

//fetch("https://jsonplaceholder.typicode.com/users")
//.then( (res) => res.json ())
//.then( (data) => console.log(data));

//const data = {
  //  title: "This is title",
  // body: "This is post body ",
  //  userId: 2
//}

//fetch("https://jsonplaceholder.typicode.com/posts", {
 //   method: "POST",
 //   body: JSON.stringify(data),
  //  headers: {
  //      "Content-type": "application/json"
//    }
//}) .then( (res) => res.json ())
//.then( (data) => console.log(data));

//fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
//.then(response => {
    
//    if(!response.ok){
//        throw new Error ("Could not fetch resource")
//    }
  //  return response.json(); 
// })
//.then(data => console.log(data))
//.catch(error => console.error(error))
fetchData();

async function fetchData(){

    try{

        const pokemonName =document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}` )

        if(!response.ok){
            throw new Error("Could not fetch pokemon");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite")

        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";
    }
    
    catch(error){
        console.error(error);
    }   
}
