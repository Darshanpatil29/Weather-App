let weather = {
    apiKey: "7770e2d0961df6d6f7707ea49e90a890",
    fetchWeather: async function (city,lat,long) {
        if(city){
      var response= await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        }
        else{
            var response= await fetch(
                "https://api.openweathermap.org/data/2.5/weather?lat=" +
                  lat +
                  "&lon=" + long +
                  "&units=metric&appid=" +
                  this.apiKey
              )
              this.backgroundImage();
        }
    const result= await response.json();
    console.log(result);
    this.displayWeather(result);
    },
    backgroundImage: function(){
      document.body.style.backgroundImage =
      "url('https://source.unsplash.com/random/nature')";
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/random/nature')";
    },
    search: function () {
        const city = document.querySelector(".search-bar input[name='search']").value;
        this.fetchWeather(city);
      },
  };
  
//   document.querySelector(".search button").addEventListener("click", function () {
//     weather.search();
//   });
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document.querySelector(".search-bar").addEventListener("submit", function (event) {
    event.preventDefault();
    weather.search();
  });
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
        long = position.coords.longitude; // Use longitude for 'long' and latitude for 'lat'
        lat = position.coords.latitude;
        weather.fetchWeather(null,lat,long);
    });
}
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
