import styles from "./Notification.style";
import { View, Text, Image, StyleSheet } from "react-native";

const Notification = ({ title, message, time }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://static.vecteezy.com/system/resources/thumbnails/000/639/930/small_2x/chip.jpg",
        }}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>
          <Text style={styles.bold}>{String(title)}</Text> {String(message)}
        </Text>
      </View>
      <Text style={styles.time}>{String(time)}</Text>
    </View>
  );
};

export default Notification;
