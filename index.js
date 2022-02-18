const { nextISSTimesForMyLocation } = require('./iss');
nextISSTimesForMyLocation((err,data) => {
  if (err) {
    console.log('Error: ',err);
    return;
  }
  console.log(data);
});