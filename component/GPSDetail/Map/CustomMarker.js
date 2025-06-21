import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Marker, Callout } from 'react-native-maps';

export default function CustomMarker({ coordinate, title, image }) {
  if (!coordinate?.latitude || !coordinate?.longitude) return null;

  return (
    <Marker coordinate={coordinate}>
      <View style={styles.markerContainer}>
        <Image source={image} style={styles.markerImage} />
      </View>
      <Callout tooltip>
        <View style={styles.callout}>
          <Text style={styles.calloutText}>{title}</Text>
        </View>
      </Callout>
    </Marker>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    width: 30,              
    height: 30,
    borderRadius: 25,        
    borderWidth: 3,
    borderColor: '#007AFF',  
    backgroundColor: '#fff',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  callout: {
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 6,
    elevation: 4,
  },
  calloutText: {
    fontSize: 14,
    color: '#333',
  },
});

