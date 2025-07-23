import axios from 'axios';

const GEOCODING_API_URL = 'https://api.opencagedata.com/geocode/v1/json';
const API_KEY = '476ed313138f4799b22cb746efccf0a0';  

const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await axios.get(GEOCODING_API_URL, {
      params: {
        q: `${latitude},${longitude}`,
        key: API_KEY,
        language: 'vi',
      },
    });

    const results = response.data.results;

    if (results.length > 0) {
      const { components, formatted } = results[0];
      
      const road = components.road || components.neighborhood || components.suburb || components.village || 'Hẻm chưa có tên';
      const ward = components.city_district || components.town || components.county || '';
      const city = components.city || components.state || '';
      const country = components.country || '';

      const customAddress = `${road}, ${ward}, ${city}, ${country}`;
      return customAddress;
    }

    return 'Không xác định địa chỉ';
  } catch (err) {
    console.error('Lỗi reverse geocode:', err);
    return 'Lỗi lấy địa chỉ';
  }
};

export default reverseGeocode;
