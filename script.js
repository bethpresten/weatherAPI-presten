// console.log("This is connected!");
$(document).ready(function () {

    var cityHistory = [];
    var cityHistoryList = $("#city-history");
    var cityInput = $("#city-search");
    var city = $("#search-city").val();
    var weatherImg = $("#weather-icon");

    var currentDate = moment().format("HH");
    currentWeather();

    function currentWeather() {

        $("#search").on("click", function (event) {

            var city = $("#search-city").val();
            var queryURL = "http://api.openweathermap.org/data/2.5/forecast/?q=" + city + "&appid=e2ce71516635d8291df50c096e9d84fd"
            var apiKey = "e2ce71516635d8291df50c096e9d84fd";
            // console.log(city);
            // var cityHistoryDiv = $("#city-history");
            // var cityHistoryBtn = $("<button>").text(city).attr("id", "city-button");
            // cityHistoryDiv.prepend(cityHistoryBtn);
            // console.log("1st click!");
            // $("#search-city").val("");
            // localStorage.setItem("cityName" + city, city)

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
                JSON.stringify(response.city.name);
                $(".city").attr("style", "<h3>").text(city);
                $(".current-day").text(moment().format("L"));
                $("#weather-icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png");
                $(".wind").text("Wind Speed: " + response.list[0].wind.speed + "mph");
                $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%");
                var tempF = (response.list[0].main.temp - 273.15) * 1.8 + 32;
                var lat = response.city.coord.lat;
                var lon = response.city.coord.lon;

                fiveDayForecast(city);

                // console.log(response.city.coord.lat, response.city.coord.lon);

                // $(".temp").text("Temperature (K) " + response.list[0].main.temp);
                $(".tempF").text("Temperature (F) " + tempF.toFixed(2) + " F");

                var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

                $.ajax({
                    url: uvIndexURL,
                    method: "GET",
                }).then(function (responseUV) {
                    var UVindex = responseUV.value;
                    $(".uv-index").empty();
                    var condition = $("<button>");
                    condition.text("UV Index: " + UVindex).attr("class", "btn-warning");
                    $(".uv-index").prepend(condition);
                    if (UVindex < 3) {
                        condition.attr("class", "btn-success");
                    } else if (UVindex > 7) {
                        condition.attr("class", "btn-danger");
                    }

                })

                function fiveDayForecast(city) {

                    var queryFiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
                    // console.log(queryFiveDay)
                    // var apiKey = "e2ce71516635d8291df50c096e9d84fd";
                    $.ajax({
                        url: queryFiveDay,
                        method: "GET",
                    }).then(function (responseFiveDay) {
                        console.log(responseFiveDay);
                        var dayOneDate = (moment().add(1, 'days').format("L"));
                        console.log(dayOneDate);
                        // console.log(responseFiveDay.list[1].main.temp);
                        var tempFone = ("Temp: " + ((response.list[0].main.temp - 273.15) * 1.8 + 32).toFixed(2)) + " F";
                        // console.log(tempF);
                        var weatherPicOne = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + responseFiveDay.list[1].weather[0].icon + "@2x.png");
                        // console.log(weatherPic);
                        var humidCityOne = ("Humidity: " + responseFiveDay.list[1].main.humidity);
                        // console.log(humidCity);
                        // console.log(responseFiveDay.list[1].main.humidity);
                        // console.log(responseFiveDay.list[1].weather[0].icon);
                        $("#five-day-card1").text(dayOneDate, weatherPicOne, tempFone, humidCityOne).append(tempFone, weatherPicOne, humidCityOne);

                        var dayTwoDate = (moment().add(2, 'days').format("L"));
                        var tempFtwo = ("Temp: " + ((response.list[16].main.temp - 273.15) * 1.8 + 32).toFixed(2)) + " F";
                        var weatherPicTwo = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + responseFiveDay.list[16].weather[0].icon + "@2x.png");
                        var humidCityTwo = ("Humidity: " + responseFiveDay.list[16].main.humidity);
                        $("#five-day-card2").text(dayTwoDate, weatherPicTwo, tempFtwo, humidCityTwo).append(tempFtwo, weatherPicTwo, humidCityTwo);

                        var dayThreeDate = (moment().add(3, 'days').format("L"));
                        var tempFthree = ("Temp: " + ((response.list[23].main.temp - 273.15) * 1.8 + 32).toFixed(2)) + " F";
                        var weatherPicThree = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + responseFiveDay.list[23].weather[0].icon + "@2x.png");
                        var humidCityThree = ("Humidity: " + responseFiveDay.list[23].main.humidity);
                        $("#five-day-card3").text(dayThreeDate, weatherPicThree, tempFthree, humidCityThree).append(tempFthree, weatherPicThree, humidCityThree);

                        var dayFourDate = (moment().add(4, 'days').format("L"));
                        var tempFfour = ("Temp: " + ((response.list[30].main.temp - 273.15) * 1.8 + 32).toFixed(2)) + " F";
                        var weatherPicFour = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + responseFiveDay.list[30].weather[0].icon + "@2x.png");
                        var humidCityFour = ("Humidity: " + responseFiveDay.list[30].main.humidity);
                        $("#five-day-card4").text(dayFourDate, weatherPicFour, tempFfour, humidCityFour).append(tempFfour, weatherPicFour, humidCityFour);

                        var dayFiveDate = (moment().add(5, 'days').format("L"));
                        var tempFfive = ("Temp: " + ((response.list[38].main.temp - 273.15) * 1.8 + 32).toFixed(2)) + " F";
                        var weatherPicFive = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + responseFiveDay.list[38].weather[0].icon + "@2x.png");
                        var humidCityFive = ("Humidity: " + responseFiveDay.list[38].main.humidity);
                        $("#five-day-card5").text(dayFiveDate, weatherPicFive, tempFfive, humidCityFive).append(tempFfive, weatherPicFive, humidCityFive);

                    });

                }
            })

            // getCityHistory(city);

            // fiveDayForecast(city);


        })

        // function getCityHistory(city) {

        // }
        $("#search").on("click", function () {
            city = $("#search-city").val();
            var cityHistoryDiv = $("#city-history");
            var cityHistoryBtn = $("<button>").text(city).addClass("city-button").attr("id", city);
            cityHistoryDiv.prepend(cityHistoryBtn);
            // console.log("1st click!");
            $("#search-city").val("");
            localStorage.setItem("id", city);
        })

        // $(document).on("click", ".city-button", function (e) {
        //     $(".city-button").click(function (e)
        //     console.log("city click");
        //     localStorage.getItem("id", city);
        //     currentWeather();
        // })
        $(document).on("click", ".city-button", function (event) {
            $(".city-button").click(function (event) {
                cityHistoryBtn = $(".city-button").attr("id");
                localStorage.getItem("id", city);
                currentWeather(city);
            });
        });
    }
});