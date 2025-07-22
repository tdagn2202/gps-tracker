import axios from 'axios';

const GPS_API_URL = 'https://ct295h.tdang2202.id.vn/api/gps';

 const fetchGpsFromApi = async () => {
  try {
    const response = await axios.get(GPS_API_URL);
    const data = response.data;

    if (data.lat != null && data.lng != null) {
      return {
        latitude: data.lat,
        longitude: data.lng,
        speed: 45, // bạn có thể lấy thật nếu API có
        duration: '2:32',
        receivedAt: data.receivedAt,
      };
    }

    return null;
  } catch (err) {
    console.error('Lỗi gọi GPS API:', err);
    return null;
  }
};

export default fetchGpsFromApi