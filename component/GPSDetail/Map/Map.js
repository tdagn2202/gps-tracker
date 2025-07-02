import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import CustomMarker from './CustomMarker';
import DynamicIcon from '../../../shared/Icons/DynamicIcon';
import fonts from '../../../constants/fonts';

const MapScreen = () => {
  const mapRef = useRef(null);

  const [region, setRegion] = useState(null);
  const [myLocation, setMyLocation] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Bạn cần cấp quyền vị trí để sử dụng chức năng này.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setMyLocation({ latitude, longitude });
      setRegion(newRegion);
      setLoading(false);


      mapRef.current?.animateToRegion(newRegion, 1000);
    })();
  }, []);


  const focusToMyLocation = () => {
    if (myLocation) {
      const newRegion = {
        ...myLocation,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current?.animateToRegion(newRegion, 1000);
    }
  };

  if (loading || !region) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Đang lấy vị trí...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        ref={mapRef}
        showsUserLocation={true}
        showsMyLocationButton={false}
      >
      {myLocation && (
        <CustomMarker
          coordinate={myLocation}
          title="Vị trí của tôi"
          image={require('../../../assets/image/avatar.png')} 
        />
      )}
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={focusToMyLocation}>
          <View style={styles.row}>
            <DynamicIcon type="Feather" name="map-pin" size={13} color="#fff" />
            <Text style={styles.buttonText}>My Location</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

  },

  buttonContainer: {
    position: 'absolute',
    bottom: 390,
    width: '100%',
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 15,
  },

  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily:fonts.HelveticaNeueBold
  },

  row:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:5
  }

});


export default MapScreen;
