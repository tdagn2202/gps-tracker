import { ScrollView, StyleSheet, View } from "react-native";
import LastUpdatedTime from '../component/ReportDetail/LastUpdatedTime/LastUpdatedTime'
import RouteInfo from "../component/ReportDetail/RouteInfo/RouteInfo";
import InfoCard from "../component/ReportDetail/InfoCard/InfoCard";
import LocationHistoryItem from "../component/ReportDetail/LocationHistory/LocationHistoryItems"

const LastUpdatedTimeScreen = () => {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <LastUpdatedTime/>
      <RouteInfo/>
      <View style={styles.row}>
        <InfoCard label="Thời gian online" value="23.4 tiếng" />
        <InfoCard label="Tốc độ di chuyển trung bình" value="55 km/h" />
      </View>
      <LocationHistoryItem/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  row:{
    flexDirection:'row',
    marginTop:10

  }
});

export default LastUpdatedTimeScreen;
