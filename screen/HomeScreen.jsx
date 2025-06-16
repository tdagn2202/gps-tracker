import { ScrollView, StyleSheet } from "react-native";
import HomeTracking from "../component/HomeTracking/HomeTracking";

const HomeScreen = () => {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <HomeTracking />
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

export default HomeScreen;
