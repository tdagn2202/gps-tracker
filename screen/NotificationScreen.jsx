import { ScrollView, StyleSheet } from "react-native";
import Notification from "../component/Notification/Notification";

const PaymentScreen = () => {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >

      <Notification/>
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

export default PaymentScreen;
