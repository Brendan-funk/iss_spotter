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
    const bodyObject = JSON.parse(body);
    const ip = bodyObject.ip;
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
module.exports = {fetchMyIp,fetchCoordsByIP,};