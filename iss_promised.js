const request = require('request-promise-native');
const fetchMyIp = function () {
  return request('https://api.ipify.org?format=json');
};
const fetchChoordsByIp = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://api.freegeoip.app/json/${ip}?apikey=c9083aa0-904e-11ec-91cf-0563d7c7d098`);
}
const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
}
const nextISSTimesForMyLocation = function () {
  return fetchMyIp()
    .then(fetchChoordsByIp)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    })
}
module.exports = { nextISSTimesForMyLocation }