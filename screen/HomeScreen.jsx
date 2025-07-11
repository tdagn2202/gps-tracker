import { ScrollView, StyleSheet, View } from "react-native";
import Greeting from "../component/HomeTracking/Greeting";
import DeviceList from "../component/HomeTracking/Device/DeviceList";

const HomeScreen = () => {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.greetingWrapper}>
        <Greeting />
        <DeviceList/>
      </View>
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
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "stretch",
  },
  greetingWrapper: {
    marginBottom: 16, 
    marginTop:25
  },
});

export default HomeScreen;
