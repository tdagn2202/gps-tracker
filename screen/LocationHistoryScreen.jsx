import { useRef, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Animated, Dimensions, View, Text, TouchableOpacity } from "react-native";
import SearchBar from "../component/LocationHistory/SearchBar/SearchBar";
import FilterBar from "../component/LocationHistory/FilterBar/FilterBar";
import LocationList from "../component/LocationHistory/LocationList/LocationList";
import locationData from "../component/LocationHistory/LocationList/LocationHistoryData";
import MapScreen from "../component/GPSDetail/Map/Map";
import MapWithHistory from "../component/GPSDetail/Map/MapWithHistory";
import fonts from "../constants/fonts";

const LocationHistoryScreen = ({ navigation, route }) => {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const [activityFilter, setActivityFilter] = useState("All Activities");
  const [searchText, setSearchText] = useState("");
  const [dateFilter, setDateFilter] = useState(null);
  
  const { selectedSensorId } = route.params || {};
  
  const [viewMode, setViewMode] = useState("list");
  const animatedX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const toValue = viewMode === "list" ? 0 : -SCREEN_WIDTH;
    Animated.timing(animatedX, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [viewMode]);

  const parseDate = (str) => {
    const [dd, mm, yyyy] = str.split("/").map(Number);
    return new Date(yyyy, mm - 1, dd);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const dd = `${d.getDate()}`.padStart(2, "0");
    const mm = `${d.getMonth() + 1}`.padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const selectedSensorData = selectedSensorId 
    ? locationData.find(sensor => sensor.sensorId === selectedSensorId)
    : null;

  const sensorLocations = selectedSensorData ? selectedSensorData.locations : [];

  const filteredData = sensorLocations.filter((item) => {
    const matchesSearch =
      item.location.toLowerCase().includes(searchText.toLowerCase()) ||
      item.city.toLowerCase().includes(searchText.toLowerCase());

    const matchesActivity =
      activityFilter === "All Activities" || item.type === activityFilter;

    const dateObj = parseDate(item.date);

    const matchesDate = !dateFilter ||
      (
        dateObj >= parseDate(formatDate(dateFilter.from)) &&
        dateObj <= parseDate(formatDate(dateFilter.to))
      );
    return matchesSearch && matchesActivity && matchesDate;
  });

  const handleBackToSensorSelection = () => {
    navigation.goBack();
  };


  if (!selectedSensorId || !selectedSensorData) {
    return (
      <View style={[styles.outerContainer, styles.errorContainer]}>
        <Text style={styles.errorText}>Không tìm thấy dữ liệu cảm biến</Text>
        <TouchableOpacity style={styles.errorButton} onPress={handleBackToSensorSelection}>
          <Text style={styles.errorButtonText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
      />
      
      <FilterBar
        activityFilter={activityFilter}
        setActivityFilter={setActivityFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        viewMode={viewMode}
        onToggleViewMode={() =>
          setViewMode(prev => (prev === "list" ? "map" : "list"))
        }
      />

      <View style={styles.bodyContainer}>
        <Animated.View
          style={[
            styles.animatedRow,
            {
              width: SCREEN_WIDTH * 2,
              transform: [{ translateX: animatedX }],
            },
          ]}
        >
          {/* Column LIST */}
          <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
            <LocationList data={filteredData} />
          </View>

          {/* Column MAP */}
          <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
            <MapWithHistory data={filteredData} />
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sensorHeader: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 4,
  },
  sensorInfo: {
    marginLeft: 4,
  },
  sensorTitle: {
    fontSize: 28,
    fontFamily:fonts.HelveticaNeueBold,
    color: '#222222',
    marginBottom: 2,
  },
  sensorSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  bodyContainer: {
    flex: 1,
    overflow: "hidden",
  },
  animatedRow: {
    flex: 1,
    flexDirection: "row",
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  errorButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily:fonts.HelveticaNeueBold
  },
});

export default LocationHistoryScreen;