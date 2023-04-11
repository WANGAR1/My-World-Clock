//Clock
const hour =document.getElementById("hour");
const minute =document.getElementById("minute");
const seconds =document.getElementById("seconds");

const clock = setInterval(function tie() {
    let dateToday = new Date();
    let hr = dateToday.getHours();
    let min = dateToday.getMinutes();
    let sec = dateToday.getSeconds();

    if(hr < 10) {
        hr = '0' + hr;
    }

    if(min < 10) {
        min = '0' + min;
    }

    if(sec < 10) {
        sec = '0' + sec;
    }

    hour.textContent = hr;
    minute.textContent = min;
    seconds.textContent = sec;
}, 1000);

const apiKey = "H5NDRX95BXUI";
const apiUrl = "http://api.timezonedb.com/v2.1";

// Function to get current time for a city
function getCurrentTime() {
  const cityName = document.getElementById("city-name").value;

  fetch(`${apiUrl}/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${cityName}`)
    .then(response => response.json())
    .then(data => {
      const currentTime = data.formatted;
      const timeZone = data.zoneName;
      const cityResult = document.getElementById("city-result");

      cityResult.innerHTML = `<p>Current Time in ${cityName}: ${currentTime}</p>`;
    })
    .catch(error => {
      const cityResult = document.getElementById("city-result");
      cityResult.innerHTML = `<p>Error: ${error.message}</p>`
    });
    const getCurrentTimeButton = document.getElementById("get-current-time-btn");
          getCurrentTimeButton.addEventListener("click", getCurrentTime);
}

// Function to get timezone information by IANA timezone name
function getTimezoneInfo() {
  const timeZoneName = document.getElementById("timezone-name").value;

  fetch(`${apiUrl}/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${timeZoneName}`)
    .then(response => response.json())
    .then(data => {
      const timeZoneInfo = data;
      const timezoneResult = document.getElementById("timezone-result");

      timezoneResult.innerHTML = `
        <p>Timezone: ${timeZoneInfo.zoneName}</p>
        <p>Current Time Offset: ${timeZoneInfo.gmtOffset}</p>
        <p>Abbreviation: ${timeZoneInfo.abbreviation}</p>
        <p>Available Time Changes: ${timeZoneInfo.dst}</p>
      `;
    })
    .catch(error => {
      const timezoneResult = document.getElementById("timezone-result");
      timezoneResult.innerHTML = `<p>Error: ${error.message}</p>`
    });
    const getTimezoneInfoButton = document.getElementById("get-timezone-info-btn");
          getTimezoneInfoButton.addEventListener("click", getTimezoneInfo);
}

// Function to convert time from one timezone to another
function convertTime() {
  const convertTime = document.getElementById("convert-time").value;
  const fromTimezone = document.getElementById("from-timezone").value;
  const toTimezone = document.getElementById("to-timezone").value;

  // Get timestamp in "from" timezone
  const fromTimestamp = new Date(`${convertTime} ${fromTimezone}`).getTime() / 1000;

  // Convert timestamp to "to" timezone
  fetch(`${apiUrl}/convert-time-zone?key=${apiKey}&format=json&from=UTC&to=${toTimezone}&time=${fromTimestamp}`)
    .then(response => response.json())
    .then(data => {
      const convertedTimestamp = data.toTimestamp;

      // Convert "to" timestamp to Date object in "to" timezone and format to string
      const convertedTime = new Date(convertedTimestamp * 1000).toLocaleString("en-US", {timeZone: toTimezone});
      const convertResult = document.getElementById("convert-result");
      
      convertResult.innerHTML = `<p>Converted Time: ${convertedTime}</p>`;
    })
    .catch(error => {
      const convertResult = document.getElementById("convert-result");
      convertResult.innerHTML = `<p>Error: ${error.message}</p>`;
    });
    const convertTimeButton = document.getElementById("convert-time-btn");
    convertTimeButton.addEventListener("click", convertTime);
}
 
// Function to add a city to favorite list
function addFavorite() {
  const favoriteCity = document.getElementById("favorite-city").value;
  const favoriteList = document.getElementById("favorite-list");

  const favoriteItem = document.createElement("div");
  favoriteItem.innerHTML = `
    <p>${favoriteCity}</p>
    <button onclick="getCurrentTimeForFavorite('${favoriteCity}')">Get Current Time</button>
  `;

  favoriteList.appendChild(favoriteItem);
  document.getElementById("favorite-city").value = "";
}


// Function to get current time for a favorite city
function getCurrentTimeForFavorite(cityName) {
  fetch(`${apiUrl}/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${cityName}`)
    .then(response => response.json())
    .then(data => {
      const currentTime = data.formatted;
      const timeZone = data.zoneName;

      const favoriteItems = document.querySelectorAll("#favorite-list div");
      favoriteItems.forEach(item => {
        const itemCity = item.querySelector("p").textContent;
        if (itemCity === cityName) {
          item.innerHTML = `
            <p>${cityName} - ${currentTime} (${timeZone})</p>
            <button onclick="getCurrentTimeForFavorite('${cityName}')">Get Current Time</button>
          `;
        }
      });
    })
    .catch(error => console.error(error));
}