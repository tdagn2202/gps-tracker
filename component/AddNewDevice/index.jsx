
import { View, Text,TouchableOpacity } from 'react-native';
import styles from "./AddNewDevice.style"

const AddNewDevice = () => {
  const handleAdd = () => {
    console.log('Add Device button pressed');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add Device</Text>
      </TouchableOpacity>
    </View>
  );
};



export default AddNewDevice;
