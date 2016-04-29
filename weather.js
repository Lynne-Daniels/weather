/* Get the weather and update the page

 * 
 * TRY http://ip-api.com/json  
 * SAMPLE DATA:
 * 
 * {"as":"AS7922 Comcast Cable Communications, Inc.","city":"Palm Beach Gardens","country":"United States","countryCode":"US","isp":"Comcast Cable","lat":26.8539,"lon":-80.1898,"org":"Comcast Cable","query":"76.110.86.173","region":"FL","regionName":"Florida","status":"success","timezone":"America/New_York","zip":"33418"}
 * 
 * API CALL:  api.openweathermap.org/data/2.5/weather?zip=33418,us&appid=9edbccf035e35ac9403515d616122550 //my API key
 * SEE CODES:  http://openweathermap.org/current#current_JSON
 * SAMPLE DATA:
 * 
 * {
    "coord": {
        "lon": -80.14,
        "lat": 26.82
    },
    "weather": [{
        "id": 801,
        "main": "Clouds",
        "description": "few clouds",
        "icon": "02n"
    }],
    "base": "cmc stations",
    "main": {
        "temp": 296.18,
        "pressure": 1015,
        "humidity": 69,
        "temp_min": 295.37,
        "temp_max": 297.15
    },
    "wind": {
        "speed": 3.1,
        "deg": 130
    },
    "clouds": {
        "all": 20
    },
    "dt": 1461817392,
    "sys": {
        "type": 1,
        "id": 734,
        "message": 0.0101,
        "country": "US",
        "sunrise": 1461840251,
        "sunset": 1461887522
    },
    "id": 4167519,
    "name": "Palm Beach Gardens",
    "cod": 200
}
 * 
 */





//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
var options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');
  
 // $("#users-coords").html("latitude: " + crd.latitude + " longitude: " + crd.longitude);
  getWeather();
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);

//https://learn.jquery.com/ajax/jquery-ajax-methods/  Get the weather data
function getWeather() {$.ajax({
 
    // The URL for the request
    url: "http://api.openweathermap.org/data/2.5/weather?lat=26.861214099999998&lon=-80.1372164&appid=9edbccf035e35ac9403515d616122550",
 
    // The data to send (will be converted to a query string)
   // data: {
    //    id: 123
  //  },
 
    // Whether this is a POST or GET request
    type: "GET",
 
    // The type of data we expect back
    dataType : "json",
})
  // Code to run if the request succeeds (is done);
  // The response is passed to the function
  .done(function( json ) {
     $("#users-coords").html(json.name);
     $( "#current-weather" ).text( json.weather[0].main + " " + json.weather[0].description);
    console.log("ajax is done"+json.coord.lon);
    console.log("length "+ json.properties);
    console.log("json" + json.data);
  })
  // Code to run if the request fails; the raw request and
  // status codes are passed to the function
  .fail(function( xhr, status, errorThrown ) {
    alert( "Sorry, there was a problem!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
  })
  // Code to run regardless of success or failure;
  .always(function( xhr, status ) {
    //alert( "The request is complete!" );
  });
}