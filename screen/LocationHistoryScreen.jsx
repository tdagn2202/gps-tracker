import { use, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import SearchBar from "../component/LocationHistory/SearchBar/SearchBar";
import FilterBar from "../component/LocationHistory/FilterBar/FilterBar";
import LocationList from "../component/LocationHistory/LocationList/LocationList";
import locationData from "../component/LocationHistory/LocationList/LocationHistoryData";

const LocationHistoryScreen = () => {
  const [activityFilter, setActivityFilter] = useState("All Activities");
  const [searchText, setSearchText] = useState("");
  const [dateFilter, setDateFilter] = useState(null);

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
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <FilterBar
        activityFilter={activityFilter}
        setActivityFilter={setActivityFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
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
