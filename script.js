
//USER STORY 1
// Current Time 
 
const apiUrl = "https://www.timeapi.io/api/Time/current/zone";
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const currentTime = data.datetime;
    document.getElementById("current-time").innerHTML = currentTime;
  })
  .catch(error => console.error(error));


//USER STORY 2



//USER STORY 3
//Time Conversion

function convertTime() {
    let input_datetime = new Date(document.getElementById("datetime").value);

    let from_timezone = document.getElementById("from_timezone").value;
    let to_timezone = document.getElementById("to_timezone").value;

    let input_utc = input_datetime.getTime() - (input_datetime.getTimezoneOffset() * 60000);

    let from_date = new Date(input_utc).toLocaleString("en-US", {timeZone: from_timezone});
    let to_date = new Date(input_utc).toLocaleString("en-US", {timeZone: to_timezone});

    let formatted_time = `${from_date} (${from_timezone}) is ${to_date} (${to_timezone})`;
    document.getElementById("converted_time").textContent = formatted_time;
}

//USER STORY 4
//Adding Favorites

function addFavorites() {

    let timezone = document.getElementById("timezone").value;

    let favourites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
    if (favorites.includes(timezone)) {
        alert("Time zone is already in favorites.");
        return;
}
    favorites.push(timezone);
    localStorage.setItem("favorites", JSON.stringify(favourites));

    let list = document.getElementById("favorites");
    let item = document.createElement("li");
    item.appendChild(document.createTextNode(timezone));
    list.appendChild(item);
}
 
function displayFavorites() {
    let favorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
    let list = document.getElementById("favorites");
    for (let i = 0; i < favorites.length; i++) {
        let item = document.createElement("li");
        item.appendChild(document.createTextNode(favorites[i]));
        list.appendChild(item);
    }
}

     displayFavorites();


