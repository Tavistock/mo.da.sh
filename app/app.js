/**
 * @jsx React.DOM
 */
var App = App || {};

(function init () {
'use strict';
  var Weather = App.Weather;


  getCoords
  .then(getWoeid)
    .then(function(value) {
      /* jshint ignore:start */
      React.renderComponent(
        <div>
          <Weather
            pollInterval = {1* 60* 1000}
            location = {parseWoeid(value)}
          />
        </div>,
        document.getElementById('weather')
      );
      /* jshint ignore:end */
    });


})();
