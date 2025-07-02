//npm install @react-native-picker/picker
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { styles } from "./LocationHistoryStyle";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';

const LocationHistory = () => {
  const navigation = useNavigation();
  const  [searchText, setSearchText] = useState(' ');
  const [dateFilter, setDateFilter] = useState("all");
  const [activityFilter, setActivityFilter] = useState("all");
  

  const locationData = [
    {
      id: 1,
      location: 'Đại học Cần Thơ',
      city: 'Xuân Khánh, Cần Thơ',
      date: '08/06/2025',
      time: '21:42:30',
      coordinates: '10.030, 105.768',
      speed: '80 km/h',
      type: 'Driving',
      color: '#007AFF'
    },
    {
      id: 2,
      location: 'Phòng cảnh sát giao thông',
      city: 'Cái Răng, Cần Thơ',
      date: '08/06/2025',
      time: '21:42:30',
      coordinates: '10.011, 105.767',
      speed: '10 km/h',
      type: 'Walking',
      color: '#34C759'
    },
    {
      id: 3,
      location: 'Nhà riêng',
      city: 'Ô Môn, Cần Thơ',
      date: '08/06/2025',
      time: '21:42:30',
      coordinates: '10.130, 105.430',
      speed: '0 km/h',
      type: 'Stationary',
      color: '#8E8E93'
    },
    {
      id: 4,
      location: 'GO! Cần Thơ',
      city: 'Cái Răng, Cần Thơ',
      date: '08/06/2025',
      time: '21:42:30',
      coordinates: '10.014, 105.782',
      speed: '55 km/h',
      type: 'Driving',
      color: '#007AFF'
    }
  ];

  //Loc du lieu dua tren text
  const filteredLocations = locationData.filter(item => {
    const searchLower =searchText.toLowerCase();
    return (
      item.location.toLowerCase().includes(searchLower) || 
      item.city.toLowerCase().includes(searchLower)
    );
  });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>
          <EvilIcons name="search" size={24} color="black" />
        </Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search locations..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>All Dates</Text>
          <Text style={styles.filterArrow}>▼</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>All Activities</Text>
          <Text style={styles.filterArrow}>▼</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapButton}>
          <Text style={styles.mapIcon}>
            <Feather name="map" size={24} color="white" />
          </Text>
        </TouchableOpacity>
      </View>

      {/* Location List */}
      <ScrollView style={styles.locationList} showsVerticalScrollIndicator={false}>
        {filteredLocations.map((item) => (
          <View key={item.id} style={[styles.locationItem, { borderLeftColor: item.color }]}>
            <View style={styles.locationHeader}>
              <Text style={styles.locationTitle}>{item.location}</Text>
              <View style={[styles.typeTag, { backgroundColor: item.color }]}>
                <Text style={styles.typeText}>{item.type}</Text>
              </View>
            </View>
            <Text style={styles.locationSubtitle}>{item.city}</Text>
            
            <View style={styles.locationDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>
                  <EvilIcons name="clock" size={24} color="black" />
                </Text>
                <Text style={styles.detailText}>{item.date}</Text>
                <Text style={styles.detailText}>{item.time}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>
                  <EvilIcons name="location" size={24} color="black" />
                </Text>
                <Text style={styles.detailText}>{item.coordinates}</Text>
              </View>
            </View>
            
            <Text style={styles.speedText}>Speed: {item.speed}</Text>
          </View>
        ))}

        {filteredLocations.length === 0 && (
           <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>Không tìm thấy kết quả nào</Text>
            <Text style={styles.noResultsSubtext}>Thử tìm kiếm với từ khóa khác</Text>
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>4 locations</Text>
        <Text style={styles.footerText}>Last update: 2 min ago</Text>
      </View>
    </View>
  );
};

export default LocationHistory;
