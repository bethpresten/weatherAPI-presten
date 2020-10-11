console.log("This is connected!")
$(document).ready(function () {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid=e2ce71516635d8291df50c096e9d84fd"

    $("search").on("click", function (event) {
        var city = $("search-city").val();
    })




});