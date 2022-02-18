const request = require('request');
const fetchMyIp = function(callback) {
  request(`https://api.ipify.org?format=json`,(error,response,body) => {
    if (error) {
      callback(error,null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg),null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(error,ip);
  });
};

const fetchCoordsByIP = function(string, callback) {
  request(`https://api.freegeoip.app/json/${string}?apikey=c9083aa0-904e-11ec-91cf-0563d7c7d098`,(error,response,body) => {
    if (error) {
      callback(error,null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg),null);
      return;
    }

    const bodyObject = JSON.parse(body);
    const coords = {};
    coords['latitude'] = bodyObject.latitude;
    coords['longitude'] = bodyObject.longitude;
    callback(error,coords);
  });
};
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error,response,body) => {
    if (error) {
      callback(error,null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg),null);
      return;
    }
    const flyOver = JSON.parse(body).response;
    callback(error,flyOver);
  });
};
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIp((error,ip) => {
    if (error) {
      const msg = ('IP error:  ' + error);
      callback(Error(msg),null);
      return;
    }
    fetchCoordsByIP(ip,(error,coords) => {
      if (error) {
        const msg = ('Coordinate error: ' + error);
        callback(Error(msg),null);
        return;
      }
      fetchISSFlyOverTimes(coords, (error,flyOvers) => {
        if (error) {
          const msg = ('FlyOverTimeError: ' + error);
          callback(Error(msg),null);
          return;
        }
        callback(error,flyOvers);
      });
    });
  });
};
module.exports = {nextISSTimesForMyLocation};