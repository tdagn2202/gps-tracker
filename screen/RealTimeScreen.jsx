import { ScrollView, StyleSheet } from "react-native";
import RealTime from "../component/RealTime/RealTime";

const RealTimeScreen = () => {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >

      <RealTime/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
   scroll: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  
 content: {
    flexGrow: 1,  
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent:'center',
    alignItems:'center',
  },
});

export default RealTimeScreen;
