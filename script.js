// console.log("This is connected!");
$(document).ready(function () {

    var cityHistory = [];
    var cityHistoryList = $("#city-history");
    var cityInput = $("#city-search");
    var city = $("#search-city").val();
    var weatherImg = $("#weather-icon");

    var currentDate = moment().format("HH");
    // var date = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
    // var lat = $(response.list[0].main.city.coord.lat)


    // function getWeather(city) {
    $("#search").on("click", function (event) {
        var city = $("#search-city").val();
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast/?q=" + city + "&appid=e2ce71516635d8291df50c096e9d84fd"
        var apiKey = "e2ce71516635d8291df50c096e9d84fd";
        // var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid=" + apiKey);

        // console.log(city);
        // console.log(response.city.coord.lat); NOT WORKING; RESPONSE NOT DEFINED?

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            // console.log(response.city);
            // console.log(response.list[0].weather[0].description);
            // console.log(response.list[0].main.temp);
            // console.log(response.list[0].main.humidity);
            // console.log(response.list[0].wind.speed);
            console.log(response.list[12].weather[0].icon)
            // var icon = response.list[12].weather[0].icon;
            JSON.stringify(response.city.name);
            $(".city").attr("style", "<h3>").text(city);
            $(".current-day").text(moment().format("L"));
            $("#weather-icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png");
            $(".wind").text("Wind Speed: " + response.list[0].wind.speed + "mph");
            $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%");

            // $(".uv-index").text("UV Index: " + );
            var tempF = (response.list[0].main.temp - 273.15) * 1.8 + 32;
            // $(".temp").text("Temperature (K) " + response.list[0].main.temp);
            $(".tempF").text("Temperature (F) " + tempF.toFixed(2) + " F");
        })

        getCityHistory(city);

    })
    // }


    function getCityHistory(city) {
        var cityHistoryDiv = $("#city-history");
        var cityHistoryBtn = $("<button>").text(city).addClass("city-button");
        cityHistoryDiv.prepend(cityHistoryBtn);
        $("#search-city").val("");
    }




});