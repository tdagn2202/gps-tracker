import axios from 'axios';
import reverseGeocode from '../utils/reverseGeocode';

const GPS_API_URL = 'https://ct295h.tdang2202.id.vn/api/gps';

const fetchGpsFromApi = async () => {
  try {
    const response = await axios.get(GPS_API_URL);
    const data = response.data;

    if (data.lat != null && data.lng != null) {
      const address = await reverseGeocode(data.lat, data.lng);

      return {
        latitude: data.lat,
        longitude: data.lng,
        speed: 45,
        duration: '2:32',
        receivedAt: data.receivedAt,
        address: address || 'Không xác định',
      };
    }

    return null;
  } catch (err) {
    console.error('Lỗi gọi GPS API:', err);
    return null;
  }
};

export default fetchGpsFromApi;
