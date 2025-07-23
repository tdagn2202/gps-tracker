import { useEffect, useState } from 'react';

const getFakeGpsData = () => {
  const lat = 10.03000 + Math.random() * 0.001;
  const lng = 105.77000 + Math.random() * 0.001;

  return {
    latitude: lat,
    longitude: lng,
    speed: 45,
    duration: '2:32',
    receivedAt: new Date().toISOString()
  };
};

export default function useFakeGps(interval = 5000) {
  const [gpsData, setGpsData] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setGpsData(getFakeGpsData());
    }, interval);

    return () => clearInterval(id);
  }, [interval]);

  return gpsData;
}
