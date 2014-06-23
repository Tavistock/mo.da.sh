
var App = App || {};

dumpBookmarks();

$(document).ready(function (){
  var $asideOpener = $('.aside-opener'),
      $aside = $('.aside'),
      $html = $("html"),
      $clock = $(".clock");
      $bg = $(".bg");

  $asideOpener.click(function(e){
    e.preventDefault();
    if ($asideOpener.css("left") === "0px") {
      $asideOpener.css({left: $aside.width()});
      $aside.css({left: "0px"});
    } else {
      asideDefault();
    }
    });

  function asideDefault() {
    $aside.css({left:-$aside.width()});
    $asideOpener.css({left: "0px"});
  }

  function updateClock (){
    var currentTime = moment();
    $clock.text(currentTime.format("h:mm"));
    $clock.append($("<span>",
      {
        class: "format",
        text: currentTime.format("a")
      }
    ));
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });

  $bg.prepend($("<img>", {src: picUrls[getOrRandomUrl()]}));

  asideDefault();
  updateClock();
  setInterval(updateClock, 3000);
});

function loadWeather(location, woeid) {
  var $weather = $(".weather");

  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'f',
    success: function(weather) {
      newWeather = {
        temp: weather.temp+'°'+weather.units.temp,
        city: weather.city+', '+weather.region,
        cond: weather.currently
      };
      $weather.append($("<ul>", {class: "list-inline"}));
      _.map(_.pairs(newWeather), function(pair) {
        $weather.children("ul").append($("<li>",{
          class:pair[0],
          text:pair[1]
        }));
      });
    },
    error: function(error) {
      $weather.text(error);
    }
  });
}

function getOrRandomUrl() {
  if ((moment(localStorage.lastChanged).add("day", 1) > moment()) &&
    localStorage.picUrl) {
    return localStorage.picUrl;
  } else {
    localStorage.lastChanged = moment();
    localStorage.picUrl = randomUrl();
    return localStorage.picUrl;
  }
}

function randomUrl () {
  return Math.floor(Math.random()*picUrls.length);
}