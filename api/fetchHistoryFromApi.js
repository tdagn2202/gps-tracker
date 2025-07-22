import axios from 'axios';
import reverseGeocode from '../utils/reverseGeocode';

const HISTORY_API_URL = 'https://ct295h.tdang2202.id.vn/api/history';

const fetchHistoryFromApi = async () => {
  try {
    const response = await axios.get(HISTORY_API_URL);
    const data = response.data;

    // Nếu API trả về không phải mảng, trả về mảng rỗng
    if (!Array.isArray(data)) {
      console.warn('API history trả về không phải mảng:', data);
      return [];
    }

    // Đổi mỗi phần tử thành object mong muốn, và resolve địa chỉ song song
    const historyWithAddress = await Promise.all(
      data.map(async item => {
        const { lat, lng, receivedAt } = item;
        let address = 'Không xác định';

        if (lat != null && lng != null) {
          try {
            // Gọi hàm reverse geocode
            const result = await reverseGeocode(lat, lng);
            if (result) address = result;
          } catch (err) {
            console.error(`Lỗi reverseGeocode tại [${lat}, ${lng}]:`, err);
          }
        }

        return {
          latitude: lat,
          longitude: lng,
          receivedAt,
          address,
        };
      })
    );

    return historyWithAddress;
  } catch (err) {
    console.error('Lỗi gọi History API:', err);
    return [];
  }
};

export default fetchHistoryFromApi;
