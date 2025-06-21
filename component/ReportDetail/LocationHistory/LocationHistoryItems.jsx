import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import locationHistoryData from "../LocationHistory/locationHistoryData";
import styles from "./LocationHistory.style";
import DynamicIcon from "../../../shared/Icons/DynamicIcon";

const LocationHistoryItem = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Location History</Text>

        {locationHistoryData.map((item) => (
          <View style={styles.card} key={item.id}>
            <Text style={styles.time}>{item.time}</Text>

            <View style={styles.rowBetween}>
              <Text style={styles.place}>{item.place}</Text>

              <View style={styles.buttons}>
                <TouchableOpacity style={styles.historyButton} onPress={() => {}}>
                  <Text style={styles.buttonText}>View History</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.mapButton} onPress={() => {}}>
                    <DynamicIcon 
                        type="MaterialCommunityIcons" 
                        name="google-maps" 
                        size={15} 
                        color="#7e7e7e" 
                    />
                  <Text style={styles.mapText}>Google Maps</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.durationTag}>
              <Text style={styles.durationText}>{item.duration}</Text>
            </View>

            <Text style={styles.coords}>Coordinates: {item.coords}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default LocationHistoryItem;
