import { useRef, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Animated, Dimensions, View } from "react-native";
import SearchBar from "../component/LocationHistory/SearchBar/SearchBar";
import FilterBar from "../component/LocationHistory/FilterBar/FilterBar";
import LocationList from "../component/LocationHistory/LocationList/LocationList";
import locationData from "../component/LocationHistory/LocationList/LocationHistoryData";
import MapScreen from "../component/GPSDetail/Map/Map";

const LocationHistoryScreen = () => {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const [activityFilter, setActivityFilter] = useState("All Activities");
  const [searchText, setSearchText] = useState("");
  const [dateFilter, setDateFilter] = useState(null);


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

  const filteredData = locationData.filter((item) => {
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

      {/* Container cho list + map với hiệu ứng slide */}
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
            <MapScreen />
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
  bodyContainer: {
    flex: 1,
    overflow: "hidden",
  },
  animatedRow: {
    flex: 1,
    flexDirection: "row",
  },
  scroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default LocationHistoryScreen;
