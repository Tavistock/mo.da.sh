/**
 * @jsx React.DOM
 */
var App = App || {};

App.Weather = React.createClass({
    // make url using state: unit, woeid, urlMaker
  getInitialState: function() {
    return {
      woeid: this.props.location.woeid,
      city: this.props.location.city,
      data: {
        code: 25,
        temp: '...'
      },
      unit: "f"
    };
  },
  componentWillMount: function() {
    this.loadWeatherFromServer();
    setInterval(this.loadWeatherFromServer, this.props.pollInterval);
  },
  loadWeatherFromServer: function() {
    $.ajax({
      url: urlWeather(this.state.woeid),
      dataType: 'json',
      success: function(data) {
        var newData = parseWeather(data);
        this.setState({data: newData});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  loadWoeidFromServer: function() {
    console.log(urlWoeid(this.state.location));
    $.ajax({
      url: urlWoeid(this.state.location),
      dataType: 'json',
      success: function(data) {
        var newData = parseWoeid(data);
        this.setState({data: newData});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var cx = React.addons.classSet;
    temp = this.state.data.temp + "°";
    code = "wi " + this.mapWeather[this.state.data.code];
    return(
      /* jshint ignore:start */
      <div className="weather">
        <div>
          <i className={code}></i>{temp}
        </div>
        <span>{this.state.city}</span>
      </div>
      /* jshint ignore:end */
    );
  },
  mapWeather: {
    0: 'wi-thunderstorm',
    1: 'wi-thunderstorm',
    2: 'wi-thunderstorm',
    3: 'wi-thunderstorm',
    4: 'wi-thunderstorm',
    5: 'wi-snow',
    6: 'wi-snow',
    7: 'wi-snow',
    8: 'wi-snow',
    9: 'wi-sprinkle',
    10: 'wi-snow',
    11: 'wi-showers',
    12: 'wi-showers',
    13: 'wi-snow',
    14: 'wi-snow',
    15: 'wi-snow',
    16: 'wi-snow',
    17: 'wi-hail',
    18: 'wi-snow',
    19: 'wi-cloudy-gusts',
    20: 'wi-foggy',
    21: 'wi-fog',
    22: 'wi-fog',
    23: 'wi-cloudy-gusts',
    24: 'wi-cloudy-gusts',
    25: 'wi-cloudy',
    26: 'wi-cloudy',
    27: 'wi-night-cloudy',
    28: 'wi-cloudy',
    29: 'wi-night-cloudy',
    30: 'wi-cloudy',
    31: 'wi-night-clear',
    32: 'wi-day-sunny',
    33: 'wi-night-clear',
    34: 'wi-day-sunny',
    35: 'wi-hail',
    36: 'wi-day-sunny',
    37: 'wi-thunderstorm',
    38: 'wi-thunderstorm',
    39: 'wi-thunderstorm',
    40: 'wi-showers',
    41: 'wi-snow',
    42: 'wi-snow',
    43: 'wi-snow',
    44: 'wi-cloudy',
    45: 'wi-thunderstorm',
    46: 'wi-snow',
    47: 'wi-thunderstorm',
    3200: 'wi-cloudy'
  }

});