import { View, ScrollView } from 'react-native';
import locationData from '../component/LocationHistory/LocationList/LocationHistoryData'; 
import getSensorInfo from '../component/SensorSelection/sensorUtils'; 
import SensorCard from '../component/SensorSelection/SensorCard'; 
import styles from '../component/SensorSelection/styles'; 

const SensorSelectionScreen = ({ navigation }) => {
  const handleSensorSelect = (sensorId) => {
    navigation.navigate('LocationHistoryScreen', 
      { selectedSensorId: sensorId });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.sensorList} showsVerticalScrollIndicator={false}>
        {locationData.map((sensor) => (
          <SensorCard
            key={sensor.sensorId}
            sensor={sensor}
            sensorInfo={getSensorInfo(sensor)}
            onPress={() => handleSensorSelect(sensor.sensorId)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default SensorSelectionScreen;
