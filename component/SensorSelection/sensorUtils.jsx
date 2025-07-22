const getSensorInfo = (sensor) => {
  const totalLocations = sensor.locations.length;

  const latestLocation = sensor.locations.reduce((latest, current) => {
    const latestDate = new Date(latest.date.split('/').reverse().join('-'));
    const currentDate = new Date(current.date.split('/').reverse().join('-'));
    return currentDate > latestDate ? current : latest;
  });

  return {
    totalLocations,
    latestLocation: latestLocation.location,
    latestDate: latestLocation.date,
    latestCity: latestLocation.city,
  };
};

export default getSensorInfo;
