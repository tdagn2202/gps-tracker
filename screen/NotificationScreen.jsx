import {
  StyleSheet,
  FlatList,
} from "react-native";
import Notification from "../component/Notification/Notification";
import notificationsData from '../component/Notification/notificationData'


const PaymentScreen = () => {
  return (
    <FlatList
      data={notificationsData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Notification
          title={item.title}
          message={item.message}
          time={item.time}
        />
      )}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    backgroundColor: "#fff",
    paddingBottom: 16,
  },
  header: {
    marginTop: 60,
    marginBottom: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
});

export default PaymentScreen;
