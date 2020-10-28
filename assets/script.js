$(document).ready(function () {
    // global and js variables
    var cityHistory = [];
    var cityHistoryList = $("#city-history");
    var cityInput = $("#city-search");
    var city = $("#search-city").val();
    var currentDate = moment().format("HH");
    currentWeather();

    function currentWeather() {
        $("#search").on("click", function (event) {
            var city = $("#search-city").val();
            var queryURL = "https://api.openweathermap.org/data/2.5/forecast/?q=" + city + "&appid=e2ce71516635d8291df50c096e9d84fd"
            var apiKey = "e2ce71516635d8291df50c096e9d84fd";

            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function (response) {
                // console.log(response);
                // console.log(response.city);
                // console.log(response.list[0].weather[0].description);
                // console.log(response.list[0].main.temp);
                // console.log(response.list[0].main.humidity);
                // console.log(response.list[0].wind.speed);
                // console.log(response.list[12].weather[0].icon)
                // var icon = response.list[12].weather[0].icon;
                var cityHistoryDiv = $("#city-history");
                var cityHistoryBtn = $("<button>").text(city).addClass("city-button").attr("id", city);
                cityHistoryDiv.prepend(cityHistoryBtn);
                // clears out search from the input field
                $("#search-city").val("");
                localStorage.setItem("cityName" + city, city)

                JSON.stringify(response.city.name);
                $(".city").attr("style", "<h3>").text(city);
                $(".current-day").text(moment().format("L"));
                $("#weather-icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png");
                $(".wind").text("Wind Speed: " + response.list[0].wind.speed + "mph");
                $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%");
                var tempF = (response.list[0].main.temp - 273.15) * 1.8 + 32;
                var lat = response.city.coord.lat;
                var lon = response.city.coord.lon;
                fiveDayForecast(city);
                // console.log(response.city.coord.lat, response.city.coord.lon);
                $(".tempF").text("Temperature (F) " + tempF.toFixed(2) + " F");

                var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

                $.ajax({
                    url: uvIndexURL,
                    method: "GET",
                }).then(function (responseUV) {
                    var UVindex = responseUV.value;
                    // forcing the uv index to disappear with multiple searches
                    $(".uv-index").empty();
                    var condition = $("<button>");
                    // adding color to uv index
                    condition.text("UV Index: " + UVindex).attr("class", "btn-warning");
                    $(".uv-index").prepend(condition);
                    // changed color of the UV index based on the levels
                    if (UVindex < 3) {
                        condition.attr("class", "btn-success");
                    } else if (UVindex > 7) {
                        condition.attr("class", "btn-danger");
                    }
                })
                function fiveDayForecast(city) {
                    var queryFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
                    // console.log(queryFiveDay)
                    // var apiKey = "e2ce71516635d8291df50c096e9d84fd";
                    $.ajax({
                        url: queryFiveDay,
                        method: "GET",
                    }).then(function (responseFiveDay) {
                        $("#five-day").show();
                        // console.log(responseFiveDay);
                        // First card populated with weather information
                        var dayOneDate = (moment().add(1, 'days').format("L"));
                        // console.log(dayOneDate);
                        // console.log(responseFiveDay.list[1].main.temp);
                        var tempFone = ("Temp: " + ((response.list[0].main.temp - 273.15) * 1.8 + 32).toFixed(2) + " *F");
                        var humidCityOne = ("Humidity: " + (responseFiveDay.list[0].main.humidity) + "%");
                        // console.log(tempF);
                        var weatherPicOne = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + responseFiveDay.list[1].weather[0].icon + "@2x.png");
                        // console.log(weatherPic);
                        $("#five-day-card1").append(`${dayOneDate} <img src="${"https://openweathermap.org/img/wn/" + responseFiveDay.list[1].weather[0].icon + "@2x.png"}" > ${tempFone} ${humidCityOne}`);
                        // Second card popoulated with weather information
                        var dayTwoDate = (moment().add(2, 'days').format("L"));
                        var tempFtwo = ("Temp: " + ((response.list[16].main.temp - 273.15) * 1.8 + 32).toFixed(0) + " *F");
                        var weatherPicTwo = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + responseFiveDay.list[16].weather[0].icon + "@2x.png");
                        var humidCityTwo = ("Humidity: " + responseFiveDay.list[16].main.humidity + "%");
                        $("#five-day-card2").append(`${dayTwoDate} <img src="${"https://openweathermap.org/img/wn/" + responseFiveDay.list[16].weather[0].icon + "@2x.png"}" > ${tempFtwo} ${humidCityTwo}`);
                        // Third card populated with weather information
                        var dayThreeDate = (moment().add(3, 'days').format("L"));
                        var tempFthree = ("Temp: " + ((response.list[23].main.temp - 273.15) * 1.8 + 32).toFixed(0) + " *F");
                        var weatherPicThree = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + responseFiveDay.list[23].weather[0].icon + "@2x.png");
                        var humidCityThree = ("Humidity: " + responseFiveDay.list[23].main.humidity + "%");
                        $("#five-day-card3").append(`${dayThreeDate} <img src="${"https://openweathermap.org/img/wn/" + responseFiveDay.list[23].weather[0].icon + "@2x.png"}" > ${tempFthree} ${humidCityThree}`);
                        // Fourth card populated with weather information
                        var dayFourDate = (moment().add(4, 'days').format("L"));
                        var tempFfour = ("Temp: " + ((response.list[30].main.temp - 273.15) * 1.8 + 32).toFixed(0) + " *F");
                        var weatherPicFour = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + responseFiveDay.list[30].weather[0].icon + "@2x.png");
                        var humidCityFour = ("Humidity: " + responseFiveDay.list[30].main.humidity + "%");
                        $("#five-day-card4").append(`${dayFourDate} <img src="${"https://openweathermap.org/img/wn/" + responseFiveDay.list[30].weather[0].icon + "@2x.png"}" > ${tempFfour} ${humidCityFour}`);
                        // Fifth card populated with weather information
                        var dayFiveDate = (moment().add(5, 'days').format("L"));
                        var tempFfive = ("Temp: " + ((response.list[38].main.temp - 273.15) * 1.8 + 32).toFixed(0) + " *F");
                        var weatherPicFive = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + responseFiveDay.list[38].weather[0].icon + "@2x.png");
                        var humidCityFive = ("Humidity: " + responseFiveDay.list[38].main.humidity + "%");
                        $("#five-day-card5").append(`${dayFiveDate} <img src="${"https://openweathermap.org/img/wn/" + responseFiveDay.list[38].weather[0].icon + "@2x.png"}" > ${tempFfive} ${humidCityFive}`);

                    })

                    $(".city-button").click(function (event) {
                        // console.log("1st click!");
                        cityHistoryBtn = $(".cityName" + city).attr("id");
                        localStorage.setItem("cityName" + city, city)
                        // console.log("clicked history button");
                        cityHistoryBtn = $(".city-button").attr("id", city);
                        localStorage.getItem("cityName" + city, city)
                        currentWeather(city);
                    });
                };
            });
        });
    };
});