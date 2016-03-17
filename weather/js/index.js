$(document).ready(function () {
    var celsius;
    var fahrenheit;
    var longitude;
    var latitude;
    var temp;
  
//get location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            getWeather(latitude,longitude);
        });
    }

});

//get weather API
function getWeather(lati,long) {
  var keycode = "c8f1c53da2526c2a2092adedc266f8d8";  
  var weather = "http://api.openweathermap.org/data/2.5/weather?lat=" + lati + "&lon=" + long + "&units=metric&APPID=" + keycode;
    $.ajax({
        dataType: "jsonp",
        url: weather,
        success: callback
    });
}


//change to fahrenheit
function fahFunction() {
    fahrenheit = Math.round(temp * 1.8 + 32);
    $("#weather").html(fahrenheit);
  
}
//change to celsius
function celFunction() {
    celsius = (fahrenheit - 32) / 1.8;
    $("#weather").html(temp);
}

  function callback(data){
    console.log(data);
    temp=Math.round(data.main.temp);
  //get individual data from object
  $("#city").html(data.name);
  $("#weather").html(Math.round(data.main.temp));
  $("#condition").html(data.weather[0].description)
  //get icon
  $("#icon").html("<img src='http://openweathermap.org/img/w/" +        data.weather[0].icon + ".png'>");
   //change units
    $("#celsius").click(function () {
        celFunction();
    });
     $("#fahrenheit").click(function () {
        fahFunction();
    });


}