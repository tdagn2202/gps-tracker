import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './GPSItem.style';
import { useNavigation } from '@react-navigation/core';

const GPSItem = ({ name = "GPS-01", status = "ACTIVE", iconSource }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('LastUpdatedTimeScreen');
  }

  return (

    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          source={iconSource}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </TouchableOpacity>
    
    
  );
};

export default GPSItem;
