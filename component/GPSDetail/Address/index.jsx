import { Text, View } from 'react-native';
import DynamicIcon from '../../../shared/Icons/DynamicIcon';
import styles from './Address.style';

const Address = ({ deviceName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.deviceName}>{deviceName}</Text>

      <View style={styles.column}>
        <View style={styles.row}>
          <View style={styles.squareColumn}>
            <View style={styles.squareIconCompass}>
              <DynamicIcon 
                type="Entypo" 
                name="compass" 
                size={18} 
                color="#B0CB94" 
              />
            </View>
            <Text style={styles.journeyText}>1.2km</Text>
            <Text style={styles.compassText}>từ bạn</Text>
          </View>

          <View style={styles.squareColumn}>
            <View style={styles.squareIconWifi}>
              <DynamicIcon 
                type="Feather" 
                name="wifi" 
                size={18} 
                color="#D3B270" 
              />
            </View>
            <Text style={styles.journeyText}>2:32p</Text>
            <Text style={styles.compassText}>đã chạy</Text>
          </View>

          <View style={styles.squareColumn}>
            <View style={styles.squareIconSpeed}>
              <DynamicIcon 
                type="MaterialIcons" 
                name="keyboard-double-arrow-right" 
                size={18} 
                color="#7A6FBE" 
              />
            </View>
            <Text style={styles.journeyText}>45km/h</Text>
            <Text style={styles.compassText}>vận tốc</Text>
          </View>
        </View>
      </View>

      <View style={styles.rectangleAddress}> 
        <View style={styles.rowText}>
          <Text style={styles.address}>Số 73, đường 3/2, Ninh Kiều, Cần Thơ</Text>
          <Text style={styles.time}>Lần cập nhật cuối: 17:31PM - 08-06-25</Text>
        </View>
      </View>
    </View>
  );
};

export default Address;
