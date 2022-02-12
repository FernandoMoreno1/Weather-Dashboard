let searchform = document.querySelector("#search")



//Add an event listener to the button that runs the function sendApiRequest when it is clicked
searchform.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("button pressed")
    const recipe = event.target.elements['search'].value;
    sendApiRequest(recipe)
})


//An asynchronous function to fetch data from the API.
async function sendApiRequest(recipe) {
    let APP_ID = "f2d9105a"
    let API_KEY = "7e7ed414fbe548206f56d07e54706bea"
    
//currently you have to change what you want manualy otherwise you cant search anything new
    let response = await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${recipe}`);
    console.log(response)
    let data = await response.json()

    console.log(data)

    useApiData(data)
}


//function that does something with the data received from the API. The name of the function should be customized to whatever you are doing with the data
function useApiData(data) {
    //what this is doing is selecting the class "recipes container" and making it into a card
    //what the "${data.hits[0].recipe.image}" is doing is changing the original content to match with the recipe by optaining the property path
    document.querySelector(".recipes-container").innerHTML = `
    <div class="row">
    <div class="col s6">
      <div class="card">
        <div class="card-image">
          <img src="${data.hits[0].recipe.image}">
        </div>
        <div class="card-content">
        <span>${data.hits[0].recipe.label}</span>
        </div>
      </div>
    </div>
  
  
    <div class="col s6">
      <div class="card">
        <div class="card-image">
          <img src="${data.hits[3].recipe.image}">
        </div>
        <div class="card-content">
          <span>${data.hits[3].recipe.label}</span>
        </div>
      </div>
    </div>
  
    <div class="col s6">
      <div class="card">
        <div class="card-image">
          <img src="${data.hits[1].recipe.image}">
        </div>
        <div class="card-content">
          <span>${data.hits[1].recipe.label}</span>
        </div>
      </div>
    </div>
  
    <div class="col s6">
      <div class="card">
        <div class="card-image">
          <img src="${data.hits[4].recipe.image}">
        </div>
        <div class="card-content">
          <span>${data.hits[4].recipe.label}</span>
        </div>
      </div>
    </div>
  `
}