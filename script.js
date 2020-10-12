// console.log("This is connected!");
$(document).ready(function () {

    var cityHistory = [];
    var cityHistoryList = $("#city-history");
    var cityInput = $("#city-search");
    var city = $("#search-city").val();


    $("#search").on("click", function (event) {
        var city = $("#search-city").val();
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast/?q=" + city + "&appid=e2ce71516635d8291df50c096e9d84fd"
        var apiKey = "e2ce71516635d8291df50c096e9d84fd";
        // var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid=" + apiKey);

        // console.log(city);


        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            console.log(response.city);
            // console.log(response.list[0].weather[0].description);
            // console.log(response.list[0].main.temp);
            // console.log(response.list[0].main.humidity);
            // console.log(response.list[0].wind.speed);
            JSON.stringify(response.city.name);
            $(".city").html("<h3>Current Conditions: " + (city) + "</h3>");
            $(".wind").text("Wind Speed: " + response.list[0].wind.speed + "mph");
            $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%");
            $(".description").text("Description: " + response.list[0].weather[0].description);
            // $(".uv-index").text("UV Index: " + );
            var tempF = (response.list[0].main.temp - 273.15) * 1.8 + 32;
            // $(".temp").text("Temperature (K) " + response.list[0].main.temp);
            $(".tempF").text("Temperature (F) " + tempF.toFixed(2) + " F");
        })

        // var currentCity = response;
        $("current-conditions").text(city.name);
        getCityHistory();

    })

    function getCityHistory() {
        var cityHistoryDiv = $("#city-history");
        var cityHistoryBtn = $("<button class='list-item></button>")
        cityHistoryBtn.text(city);
        cityHistoryDiv.prepend(cityHistoryBtn);
    }



});