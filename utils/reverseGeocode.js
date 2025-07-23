import axios from 'axios';

const GEOCODING_API_URL = 'https://api.opencagedata.com/geocode/v1/json';
const API_KEY = '31cf6d92650848fc8742feb932a091f3'; 


const geocodeCache = new Map();


const debounceTimers = new Map();


const roundCoordinate = (coord, precision = 4) => {
  return Math.round(coord * Math.pow(10, precision)) / Math.pow(10, precision);
};


const getCacheKey = (latitude, longitude) => {
  const roundedLat = roundCoordinate(latitude);
  const roundedLng = roundCoordinate(longitude);
  return `${roundedLat},${roundedLng}`;
};


const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c * 1000; 
};


const findNearestCachedAddress = (latitude, longitude, maxDistance = 100) => {
  let nearestAddress = null;
  let minDistance = maxDistance;

  for (const [key, cachedData] of geocodeCache.entries()) {
    const [cachedLat, cachedLng] = key.split(',').map(Number);
    const distance = getDistance(latitude, longitude, cachedLat, cachedLng);
    
    if (distance < minDistance) {
      minDistance = distance;
      nearestAddress = cachedData.address;
    }
  }

  return nearestAddress;
};

const reverseGeocode = async (latitude, longitude, options = {}) => {
  const {
    useCache = true,
    debounceMs = 300,
    maxCacheDistance = 100, 
    coordinatePrecision = 4
  } = options;

 
  const cacheKey = getCacheKey(latitude, longitude);


  if (useCache && geocodeCache.has(cacheKey)) {
    console.log('🎯 Sử dụng cache cho:', cacheKey);
    return geocodeCache.get(cacheKey).address;
  }


  if (useCache) {
    const nearestAddress = findNearestCachedAddress(latitude, longitude, maxCacheDistance);
    if (nearestAddress) {
      console.log('📍 Sử dụng địa chỉ gần nhất từ cache');
      return nearestAddress;
    }
  }


  if (debounceMs > 0) {
    const debounceKey = cacheKey;
    

    if (debounceTimers.has(debounceKey)) {
      clearTimeout(debounceTimers.get(debounceKey));
    }

    return new Promise((resolve) => {
      const timer = setTimeout(async () => {
        debounceTimers.delete(debounceKey);
        const result = await performGeocode(latitude, longitude, cacheKey, useCache);
        resolve(result);
      }, debounceMs);
      
      debounceTimers.set(debounceKey, timer);
    });
  }

  return performGeocode(latitude, longitude, cacheKey, useCache);
};

const performGeocode = async (latitude, longitude, cacheKey, useCache) => {
  try {
    console.log('🌍 Gọi API cho:', cacheKey);
    
    const response = await axios.get(GEOCODING_API_URL, {
      params: {
        q: `${latitude},${longitude}`,
        key: API_KEY,
        language: 'vi',
        limit: 1, 
      },
    });

    const results = response.data.results;

    if (results.length > 0) {
      const { components } = results[0];
      
      const road = components.road || 
                   components.neighbourhood || 
                   components.suburb || 
                   components.village || 
                   'Hẻm chưa có tên';
      
      const ward = components.city_district || 
                   components.town || 
                   components.county || '';
      
      const city = components.city || 
                   components.state || '';
      
      const country = components.country || '';

      const customAddress = `${road}, ${ward}, ${city}, ${country}`;


      if (useCache) {
        geocodeCache.set(cacheKey, {
          address: customAddress,
          timestamp: Date.now(),
          originalCoords: { latitude, longitude }
        });
        

        if (geocodeCache.size > 1000) {
          const firstKey = geocodeCache.keys().next().value;
          geocodeCache.delete(firstKey);
        }
      }

      return customAddress;
    }

    return 'Không xác định địa chỉ';
  } catch (err) {
    console.error('Lỗi reverse geocode:', err);
    

    if (err.response?.status === 429 && useCache) {
      const nearestAddress = findNearestCachedAddress(latitude, longitude, 500);
      if (nearestAddress) {
        console.log('⚠️ Rate limit - sử dụng cache gần nhất');
        return nearestAddress;
      }
    }
    
    return 'Lỗi lấy địa chỉ';
  }
};


export const clearGeocodeCache = () => {
  geocodeCache.clear();
  console.log('🗑️ Đã xóa cache');
};

export const getCacheStats = () => {
  return {
    size: geocodeCache.size,
    entries: Array.from(geocodeCache.entries()).map(([key, value]) => ({
      coordinates: key,
      address: value.address,
      cachedAt: new Date(value.timestamp).toLocaleString()
    }))
  };
};


export const getCache = () => geocodeCache;

export default reverseGeocode;