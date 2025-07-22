import { View, Text, TouchableOpacity } from 'react-native';
import DynamicIcon from '../../shared/Icons/DynamicIcon';
import styles from './styles';

const SensorCard = ({ sensor, sensorInfo, onPress }) => {
  return (
    <TouchableOpacity style={styles.sensorCard} onPress={onPress}>
      <View style={styles.sensorHeader}>
        <View style={styles.sensorIconContainer}>
          <DynamicIcon 
            type="EvilIcons" 
            name="location" 
            size={24} 
            color="#007AFF" 
        />
        </View>
        <View style={styles.sensorMainInfo}>
          <Text style={styles.sensorTitle}>Sensor #{sensor.sensorId}</Text>
          <Text style={styles.sensorSubtitle}>
            {sensorInfo.totalLocations} positions recorded
          </Text>
        </View>
        <View style={styles.arrowContainer}>
          <DynamicIcon 
            type="EvilIcons" 
            name="chevron-right" 
            size={24} 
            color="#7e7e7e" 
        />
        </View>
      </View>

      <View style={styles.sensorDetails}>
        <View style={styles.detailRow}>
          <DynamicIcon 
            type="EvilIcons" 
            name="location" 
            size={18} 
            color="#8E8E93" 
        />
          <Text style={styles.detailText}>Nearest location: {sensorInfo.latestLocation}</Text>
        </View>
        <View style={styles.detailRow}>
          <DynamicIcon 
            type="EvilIcons" 
            name="clock" 
            size={18} 
            color="#8E8E93" 
        />
          <Text style={styles.detailText}>Updated: {sensorInfo.latestDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <DynamicIcon 
            type="EvilIcons" 
            name="location" 
            size={18} 
            color="#8E8E93" 
        />
          <Text style={styles.detailText}>Area: {sensorInfo.latestCity}</Text>
        </View>
      </View>

      <View style={styles.statusIndicator}>
        <View style={[styles.statusDot, { backgroundColor: '#34C759' }]} />
        <Text style={styles.statusText}>Active</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SensorCard;
