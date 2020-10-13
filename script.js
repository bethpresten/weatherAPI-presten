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
            // console.log(response.list[12].weather[0].icon)
            // var icon = response.list[12].weather[0].icon;
            JSON.stringify(response.city.name);
            $(".city").attr("style", "<h3>").text(city);
            $(".current-day").text(moment().format("L"));
            $("#weather-icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png");
            $(".wind").text("Wind Speed: " + response.list[0].wind.speed + "mph");
            $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%");
            var tempF = (response.list[0].main.temp - 273.15) * 1.8 + 32;
            var lat = response.city.coord.lat;
            var lon = response.city.coord.lon;

            // console.log(response.city.coord.lat, response.city.coord.lon);



            // $(".temp").text("Temperature (K) " + response.list[0].main.temp);
            $(".tempF").text("Temperature (F) " + tempF.toFixed(2) + " F");

            var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

            $.ajax({
                url: uvIndexURL,
                method: "GET",
            }).then(function (responseUV) {
                // var UVindex = responseUV[0].value;
                var UVindex = responseUV.value;
                console.log(response);
                console.log(UVindex)
                // $(".uv-index").text("UV Index: " + UVindex);
                var uvIndexDiv = $(".uv-index").text("UVIndex " + UVindex);

            })
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

    function fiveDayForecast(data) {
        queryFiveDay = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
        $.ajax({
            url: queryFiveDay,
            method: "GET",
        }).then(function (data) {
            console.log(data)

            // var fiveCard = <div class="col-sm-2 card text-white bg-primary mb-3" id="card">

            // </div >
        });

    });