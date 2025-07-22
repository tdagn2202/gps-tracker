import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import locationData from '../component/LocationHistory/LocationList/LocationHistoryData';
import DynamicIcon from '../shared/Icons/DynamicIcon';

const SensorSelectionScreen = ({ navigation }) => {
  const handleSensorSelect = (sensorId) => {
    // Điều hướng tới LocationHistoryScreen với sensorId đã chọn
    navigation.navigate('LocationHistoryScreen', { selectedSensorId: sensorId });
  };

  const getSensorInfo = (sensor) => {
    const totalLocations = sensor.locations.length;
    const latestLocation = sensor.locations.reduce((latest, current) => {
      const latestDate = new Date(latest.date.split('/').reverse().join('-'));
      const currentDate = new Date(current.date.split('/').reverse().join('-'));
      return currentDate > latestDate ? current : latest;
    });

    return {
      totalLocations,
      latestLocation: latestLocation.location,
      latestDate: latestLocation.date,
      latestCity: latestLocation.city
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choose sensor</Text>
        <Text style={styles.headerSubtitle}>Choose sensor to view location history</Text>
      </View>

      <ScrollView style={styles.sensorList} showsVerticalScrollIndicator={false}>
        {locationData.map((sensor) => {
          const sensorInfo = getSensorInfo(sensor);
          
          return (
            <TouchableOpacity
              key={sensor.sensorId}
              style={styles.sensorCard}
              onPress={() => handleSensorSelect(sensor.sensorId)}
            >
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
                    color="#C7C7CC" 
                  />
                </View>
              </View>

              <View style={styles.sensorDetails}>
                <View style={styles.detailRow}>
                  <DynamicIcon 
                    type="EvilIcons" 
                    name="location" 
                    size={16} 
                    color="#8E8E93" 
                  />
                  <Text style={styles.detailText}>
                    Nearest location: {sensorInfo.latestLocation}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <DynamicIcon 
                    type="EvilIcons" 
                    name="clock" 
                    size={16} 
                    color="#8E8E93" 
                  />
                  <Text style={styles.detailText}>
                    Updated: {sensorInfo.latestDate}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <DynamicIcon 
                    type="EvilIcons" 
                    name="location" 
                    size={16} 
                    color="#8E8E93" 
                  />
                  <Text style={styles.detailText}>
                    Area: {sensorInfo.latestCity}
                  </Text>
                </View>
              </View>

              <View style={styles.statusIndicator}>
                <View style={[styles.statusDot, { backgroundColor: '#34C759' }]} />
                <Text style={styles.statusText}>Active</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  sensorList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sensorCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sensorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sensorIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sensorMainInfo: {
    flex: 1,
  },
  sensorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  sensorSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  arrowContainer: {
    padding: 4,
  },
  sensorDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#3C3C43',
    marginLeft: 8,
    flex: 1,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: '500',
  },
});

export default SensorSelectionScreen;