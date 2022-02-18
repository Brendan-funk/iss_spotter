const { nextISSTimesForMyLocation } = require('./iss');
const { printPassTimes } = require('./printPassTimes');
nextISSTimesForMyLocation((err,data) => {
  if (err) {
    console.log('Error: ',err);
    return;
  }
  printPassTimes(data);
});