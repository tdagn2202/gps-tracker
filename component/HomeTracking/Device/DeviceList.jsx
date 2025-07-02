import { View, Text, TouchableOpacity } from 'react-native';
import DeviceItem from './DeviceItem';
import styles from './Device.style';
import { useNavigation } from '@react-navigation/native';

const devices = [
  { id: '1', name: 'GPS-01', status: 'ACTIVE' },
  { id: '2', name: 'GPS-02', status: 'ACTIVE' },
];

const DeviceList = () => {
  const navigation = useNavigation();

  const handleAddNew = () => {
    navigation.navigate('AddNewDeviceScreen');
  };

  const handlePressDevice = (name) => {
    navigation.navigate('MapDetailScreen', { name }); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Device List</Text>
        <TouchableOpacity onPress={handleAddNew}>
          <Text style={styles.addText}>Add New</Text>
        </TouchableOpacity>
      </View>

      {devices.map((device) => (
        <DeviceItem
          key={device.id}
          name={device.name}
          status={device.status}
          onPress={() => handlePressDevice(device.name)} 
        />
      ))}
    </View>
  );
};

export default DeviceList;
