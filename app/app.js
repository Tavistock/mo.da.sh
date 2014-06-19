
var App = App || {};

(function init () {
'use strict';

})();

$(document).ready(function (){
  var $bSideOpener = $('.b-side-opener'),
      $bSide = $('.b-side'),
      $html = $("html"),
      $clock = $(".clock");


  $bSideOpener.click(function(e){
    e.preventDefault();
    if ($bSideOpener.css("left") === "0px") {
      $bSideOpener.css({left: $bSide.width()});
      $bSide.css({left: "0px"});
    } else {
      bSideDefault();
    }
    });

  function bSideDefault() {
    $bSide.css({left:-$bSide.width()});
    $bSideOpener.css({left: "0px"});
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

  bSideDefault();
  updateClock();
  setInterval(updateClock, 3000);
  dumpBookmarks();
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

function dumpBookmarks(query) {
  var bookmarkTreeNodes = chrome.bookmarks.getTree(
    function(bookmarkTreeNodes) {
      $('.bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query));
    });
}
function dumpTreeNodes(bookmarkNodes, query) {
  var list = $('<ul>');
  var i;
  for (i = 0; i < bookmarkNodes.length; i++) {
    list.append(dumpNode(bookmarkNodes[i], query));
  }
  return list;
}
function dumpNode(bookmarkNode, query) {
  var anchor;
  if (bookmarkNode.title) {
    if (query && !bookmarkNode.children) {
      if (String(bookmarkNode.title).indexOf(query) == -1) {
        return $('<span></span>');
      }
    }
    anchor = $('<a>');
    if (bookmarkNode.url) {
      anchor.attr('href', bookmarkNode.url);
    } else {
      anchor.attr('class', "folder");
    }
    anchor.text(bookmarkNode.title);
  }
  var li = $(bookmarkNode.title ? '<li>' : '<div>').append(anchor);
  if (bookmarkNode.children && bookmarkNode.children.length > 0) {
    li.append(dumpTreeNodes(bookmarkNode.children, query));
  }
  return li;
}
