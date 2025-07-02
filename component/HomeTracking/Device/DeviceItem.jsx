import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './Device.style';

const DeviceItem = ({ name, status, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={require('../../../assets/image/chipIcon.png')} 
        style={styles.icon}
      />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.statusBox}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DeviceItem;
