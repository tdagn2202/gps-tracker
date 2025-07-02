import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import SearchBar from "../component/LocationHistory/SearchBar/SearchBar";
import FilterBar from "../component/LocationHistory/FilterBar/FilterBar";
import LocationList from "../component/LocationHistory/LocationList/LocationList";
import locationData from "../component/LocationHistory/LocationList/LocationHistoryData";

const LocationHistoryScreen = () => {
  const [activityFilter, setActivityFilter] = useState("All Activities");
  const [searchText, setSearchText] = useState("");

  const filteredData = locationData.filter((item) => {
    const matchesSearch =
      item.location.toLowerCase().includes(searchText.toLowerCase()) ||
      item.city.toLowerCase().includes(searchText.toLowerCase());

    const matchesActivity =
      activityFilter === "All Activities" || item.type === activityFilter;

    return matchesSearch && matchesActivity;
  });

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <FilterBar
        activityFilter={activityFilter}
        setActivityFilter={setActivityFilter}
      />
      <LocationList data={filteredData} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
