import * as Location from 'expo-location';

 const getAddressFromCoords = async ({ latitude, longitude }) => {
  try {
    const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (place) {
      return `${place.street || ''}, ${place.district || ''}, ${place.city || place.region || ''}`;
    }
    return 'Không tìm thấy địa chỉ';
  } catch (e) {
    return 'Không thể xác định địa chỉ';
  }
};


export default getAddressFromCoords
