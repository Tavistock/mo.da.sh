var App = App || {};

getCoords = new Promise(function (resolve, reject) {
  navigator.geolocation.getCurrentPosition(
    function (data) {
      var coords = data.coords.latitude + ',' + data.coords.longitude;
      resolve(coords);
    }, function (error) {
      //error.message is what you wany
      resolve(error);
    }
  );
});


function getWoeid (location) {
  return new Promise(function (resolve, reject) {
    var url = ('http://query.yahooapis.com'+
    '/v1/public/yql?q=select%20*%20from%20geo.placefinder%20where%20text%3D%22'+
    encodeURIComponent(location)+
    '%22%20and%20gflags%3D%22R%22&format=json&diagnostics=true&callback=');
    $.getJSON(url)
    .done(resolve)
    .error(reject);
  });
}

function parseWoeid(data) {
  var results;
    var count = data.query.count;
    if (count > 1) {
      results = data.query.results.Result[0];
    } else if (count == 1) {
      results = data.query.results.Result;
    } else {results = '';}
    return {
      woeid: results.woeid,
      city: results.city
    };
}

function getWeather(woeid) {
  var url = urlWeather();
  $.getJSON(url)
  .done(function(data) {
    parseWeather(data);
  }).error( function(error) {
    console.log("Error getting weather data: " + error);
  });
}

function urlWoeid (location) {
  return ('http://query.yahooapis.com'+
  '/v1/public/yql?q=select%20*%20from%20geo.placefinder%20where%20text%3D%22'+
  encodeURIComponent(location)+
  '%22%20and%20gflags%3D%22R%22&format=json&diagnostics=true&callback=');
}

function urlWeather (woeid) {
  return('https://query.yahooapis.com/v1/public/yql?q='+
   encodeURIComponent('select * from weather.forecast where woeid='+
    woeid + ' and u="f"')+
  '&format=json&callback=?');
}


function parseWeather (data) {
  if(data.query.count == 1){
      var weather = data.query.results.channel.item.condition;
      return {
        temp: weather.temp,
        code: weather.code
      };
    }
    else {
      console.log("Error getting weather data: Result count not equal to one");
    }
}
