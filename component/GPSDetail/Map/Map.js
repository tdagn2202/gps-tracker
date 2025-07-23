import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import getAddressFromCoords from '../../../utils/reverseGeocode';
import fonts from '../../../constants/fonts';

const DEFAULT_LOCATION = {
  latitude: 10.02994,
  longitude: 105.77074,
  address: "Đại học Cần Thơ, Xuân Khánh, Ninh Kiều, Cần Thơ",
};

const MapScreen = () => {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        let latitude, longitude;

        if (status === 'granted') {
          const loc = await Location.getCurrentPositionAsync({});
          latitude = loc.coords.latitude;
          longitude = loc.coords.longitude;
        } else {
          latitude = DEFAULT_LOCATION.latitude;
          longitude = DEFAULT_LOCATION.longitude;
          setAddress(DEFAULT_LOCATION.address);
        }

        const finalLocation = { latitude, longitude };
        setLocation(finalLocation);

        if (!address) {
          const addr = await getAddressFromCoords(latitude, longitude);
          setAddress(addr);
        }

        const now = new Date();
        const formattedTime = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} - ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
        setTime(formattedTime);

        mapRef.current?.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000);
      } catch (error) {
        console.error('Lỗi lấy vị trí:', error);
        setAddress(DEFAULT_LOCATION.address);
        setLocation({
          latitude: DEFAULT_LOCATION.latitude,
          longitude: DEFAULT_LOCATION.longitude,
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading || !location) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Đang lấy vị trí...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          ...location,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
      >
        <Marker coordinate={location} title="Vị trí của tôi">
          <Image
            source={require('../../../assets/image/avatar.png')}
            style={styles.imageAvatar}
            resizeMode="contain"
          />
        </Marker>
      </MapView>

      <View style={styles.addressBox}>
        <View style={styles.rowText}>
          <Text style={styles.address}>📍 {address}</Text>
          <Text style={styles.time}>Lần cập nhật cuối: {time}</Text>
        </View>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressBox: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    backgroundColor: '#f8f5f0',
    padding: 15,
    borderRadius: 15,
  },
  rowText: {
    flexDirection: 'column',
  },
  address: {
    fontSize: 16,
    marginBottom: 6,
    fontFamily: fonts.HelveticaNeueBold,
  },
  time: {
    fontSize: 12,
    color: '#7e7e7e',
    fontFamily: fonts.HelveticaNeueMedium,
  },

  imageAvatar:{
    width: 30,
    height: 30,
    borderRadius: 24,           
    borderWidth: 3,
    borderColor: '#007AFF',       
    backgroundColor: '#eee',
  }
});
