import { View, Text } from 'react-native';
import styles from './Address.style';
import DynamicIcon from '../../../shared/Icons/DynamicIcon';

const Address = ({ deviceName, addressInfo }) => {
  const {
    address = 'Không xác định',
    speed = 0,
    distance = 0,
    duration = '--:--',
    time = '--:--',
  } = addressInfo;

  return (
    <View style={styles.container}>
      <Text style={styles.deviceName}>{deviceName}</Text>

      {/* <View style={styles.column}>
        <View style={styles.row}>
    
          <View style={styles.squareColumn}>
            <View style={styles.squareIconCompass}>
              <DynamicIcon type="Entypo" name="compass" size={18} color="#B0CB94" />
            </View>
            <Text style={styles.journeyText}>{distance} km</Text>
            <Text style={styles.compassText}>từ bạn</Text>
          </View>

 
          <View style={styles.squareColumn}>
            <View style={styles.squareIconWifi}>
              <DynamicIcon type="Feather" name="wifi" size={18} color="#D3B270" />
            </View>
            <Text style={styles.journeyText}>{duration}</Text>
            <Text style={styles.compassText}>đã chạy</Text>
          </View>


          <View style={styles.squareColumn}>
            <View style={styles.squareIconSpeed}>
              <DynamicIcon type="MaterialIcons" name="keyboard-double-arrow-right" size={18} color="#7A6FBE" />
            </View>
            <Text style={styles.journeyText}>{speed} km/h</Text>
            <Text style={styles.compassText}>vận tốc</Text>
          </View>
        </View>
      </View> */}

      {/* Address box */}
      {/* <View style={styles.rectangleAddress}>
        <View style={styles.rowText}>
          <Text style={styles.address}>{address}</Text>
          <Text style={styles.time}>Lần cập nhật cuối: {time}</Text>
        </View>
      </View> */}
    </View>
  );
};

export default Address;
