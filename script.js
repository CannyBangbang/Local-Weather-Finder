$(document).ready(function() {
  var pullLatitude;
  var pullLongitude;
  var finalURL;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pullLatitude = position.coords.latitude;
      pullLongitude = position.coords.longitude;
      pullWeatherAPI(pullLatitude, pullLongitude);
      console.log(pullLatitude, pullLongitude); //check for lat/long as sometimes shows default location in JP
    });
  }

  function pullWeatherAPI(pullLatitude, pullLongitude) {
    finalURL =
      "https://fcc-weather-api.glitch.me/api/current?lat=" +
      pullLatitude +
      "&lon=" +
      pullLongitude;
    console.log(finalURL); //check for URL as sometimes shows default location in JP
    $.getJSON(finalURL, function weatherFinder(response) {
      $("#weather").html(response.weather[0].main);

      var temperatureC = Math.round(response.main.temp);
      var temperatureF = Math.round(response.main.temp * 1.8 + 32);

      $("#temperature").html(temperatureF + "°");
      $("#celOrFah").html("F");

      $("#temp-CelOrFar").click(function() {
        $("#celOrFah").text($("#celOrFah").text() == "F" ? "C" : "F");
        var cOrFSwap = $("#celOrFah").text();
        if (cOrFSwap == "F") {
          $("#temperature").html(temperatureF + "°");
        } else if (cOrFSwap == "C") {
          $("#temperature").html(temperatureC + "°");
        }
      });

      console.log(temperatureF); //test as "64Â°" is showing for a current temp
      console.log(temperatureC); //test as "64Â°" is showing for a current temp

      $("#city").html(response.name);
      $("#country").html(response.sys.country);
      if (response.weather[0]) {
        var weatherCheck = response.weather[0].main;
        switch (
          weatherCheck //swaps out icons depending on weather. Images set to work with day time. Can add night specific images in the future.
        ) {
          case "Clear":
          case "Clear Sky":
            $("#icon-switch").attr(
              "src",
              "https://image.flaticon.com/icons/svg/777/777639.svg"
            );
            break;
          case "Thunderstorm":
            $("#icon-switch").attr(
              "src",
              "https://image.flaticon.com/icons/svg/777/777637.svg"
            );
            break;
          case "Mist":
          case "Smoke":
          case "Haze":
            $("#icon-switch").attr(
              "src",
              "https://image.flaticon.com/icons/svg/777/777609.svg"
            );
            break;
          case "Drizzle":
          case "Light Rain":
            $("#icon-switch").attr(
              "src",
              "https://image.flaticon.com/icons/svg/777/777634.svg"
            );
            break;
          case "Shower Rain":
          case "Rain":
            $("#icon-switch").attr(
              "src",
              "https://image.flaticon.com/icons/svg/777/777621.svg"
            );
            break;
          case "Clouds":
            $("#icon-switch").attr(
              "src",
              "https://image.flaticon.com/icons/svg/777/777591.svg"
            );
            break;
          case "Broken Clouds":
          case "Few Clouds":
          case "Scattered Clouds":
            $("#icon-switch").attr(
              "src",
              "https://image.flaticon.com/icons/svg/777/777620.svg"
            );
            break;
          case "Snow":
            $("#icon-switch").attr(
              "src",
              "https://image.flaticon.com/icons/svg/777/777629.svg"
            );
            break;
        }
      }
    });
  }
});
