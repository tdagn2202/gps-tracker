import styles from "./Notification.style";
import { View, Text, Image } from "react-native";

const Notification = ({ title, message, time }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/image/chipIcon.png')}
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
