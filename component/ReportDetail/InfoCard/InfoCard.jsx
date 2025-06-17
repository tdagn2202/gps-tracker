
import { View, Text } from "react-native";
import styles from "./InfoCard.style";

const InfoCard = ({ label, value }) => {
  return (
        <View style={styles.card}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
  );
};

export default InfoCard;
