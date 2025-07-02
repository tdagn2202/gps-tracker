import { View, Text } from "react-native";
import styles from "./LocationList.style";
import DynamicIcon from "../../../shared/Icons/DynamicIcon";

const LocationItem = ({ item }) => (
  <View style={[styles.locationItem, { borderLeftColor: item.color }]}>
    <View style={styles.locationHeader}>
      <Text style={styles.locationTitle}>{item.location}</Text>
      <View style={[styles.typeTag, { backgroundColor: item.color }]}>
        <Text style={styles.typeText}>{item.type}</Text>
      </View>
    </View>
    <Text style={styles.locationSubtitle}>{item.city}</Text>

    <View style={styles.locationDetails}>
      <View style={styles.detailItem}>
        <Text style={styles.detailIcon}>
          <DynamicIcon 
            type= "EvilIcons" 
            name="clock" 
            size={18} 
            color="black" 
        />
        </Text>
        <Text style={styles.detailText}>{item.date}</Text>
        <Text style={styles.detailText}>{item.time}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.detailIcon}>
          <DynamicIcon 
            type= "EvilIcons" 
            name="location" 
            size={20} 
            color="black" 
        />
        </Text>
        <Text style={styles.detailText}>{item.coordinates}</Text>
      </View>
    </View>

    <Text style={styles.speedText}>Speed: {item.speed}</Text>
  </View>
);

export default LocationItem;
