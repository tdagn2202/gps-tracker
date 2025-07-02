import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Notification from "../component/Notification/Notification";
import { Ionicons } from "@expo/vector-icons";

const notifications = [
  {
    id: "1",
    title: "GPS-02",
    message: "hiện đang ở gần [Địa điểm] lúc [giờ]",
    time: "18m ago",
  },
  {
    id: "2",
    title: "GPS-02",
    message: "đã không gửi dữ liệu trong 60 phút. Vui lòng kiểm tra kết nối",
    time: "19m ago",
  },
  {
    id: "3",
    title: "GPS-02",
    message: "đã di chuyển tổng cộng 12.3km, thời gian hoạt động: 6 giờ 30...",
    time: "18m ago",
  },
  {
    id: "4",
    title: "GPS-01",
    message: "hiện đang ở gần [Địa điểm] lúc [giờ]",
    time: "now",
  },
  {
    id: "5",
    title: "GPS-01",
    message: "đã không gửi dữ liệu trong 60 phút. Vui lòng kiểm tra kết nối",
    time: "now",
  },
  {
    id: "6",
    title: "GPS-01",
    message: "đã di chuyển tổng cộng 12.3km, thời gian hoạt động: 6 giờ 30...",
    time: "now",
  },
];

const PaymentScreen = () => {
  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Notification
          title={item.title}
          message={item.message}
          time={item.time}
        />
      )}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <>
          <View style={styles.header}>
            <TouchableOpacity>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>Notification</Text>
            <View style={{ width: 24 }} />
          </View>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    backgroundColor: "#f7f7f7",
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
