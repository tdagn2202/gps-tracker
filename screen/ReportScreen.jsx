import { ScrollView, StyleSheet } from "react-native";
import SearchBar from "../component/Report/Search/Report";
import GPSItem from "../component/Report/GPSDetail/GPSDetail";
import chipIcon from '../assets/image/chipIcon.png';

const ReportScreen = () => {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <SearchBar/>
      <GPSItem name="GPS-01" status="ACTIVE" iconSource={chipIcon} />    
      <GPSItem name="GPS-02" status="ACTIVE" iconSource={chipIcon} />    
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
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ReportScreen;
