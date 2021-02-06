window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDegree = document.querySelector(".temperature_degree");
  let temperatureDescription = document.querySelector(
    ".temperature_description"
  );
  let locationTimezone = document.querySelector(".location_timezone");
  let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(".temperature_form");
  let currentTime = document.querySelector(".current_time");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/d474d11c3f56c053e40f6ce721b22c36/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon, time } = data.currently;

          //set DOM elements from API

          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // currentTime.textContent = time;
          //set icons

          setIcons(icon, document.querySelector(".icon"));

          // time conversion formula
          var d = new Date();
          document.getElementById("current_time").innerHTML = d;
          // formula for celcious

          let celsius = (temperature - 32) * (5 / 9);
          // change temperature scale celsious/farenhight

          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
