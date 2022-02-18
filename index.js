/*
const { fetchmyIp,fetchCoordsByIP,fetchISSFlyOverTimes } = require('./iss');
const coords = {latitude: 49.0754, longitude: -122.178};
fetchISSFlyOverTimes(coords,(err,data) => {
  if(err) {
    console.log('error: ',error);
    return;
  }
  console.log(data);

})

fetchCoordsByIP ('64.180.139.245', (error,data) => {
  if (error) {
    console.log('error :',error);
    return;
  }
  console.log(data);
})
/*
fetchMyIp((error,ip) => {
  if (error) {
    console.log('It did not work ',error);
    return;
  }
  console.log('It worked, ip: ',ip);
});
*/