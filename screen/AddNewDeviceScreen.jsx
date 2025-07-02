import { ScrollView, StyleSheet, View } from "react-native";
import AddNewDevice from "../component/AddNewDevice";

const AddNewDeviceScreen = () => {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.addDeviceWrapper}>
        <AddNewDevice />
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
    justifyContent: "flex-end", 
    paddingHorizontal: 10,
    paddingVertical: 50,
  },

});

export default AddNewDeviceScreen;
