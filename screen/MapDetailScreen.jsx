import { StyleSheet, View } from "react-native";
import Map from "../component/GPSDetail/Map/Map";
import Address from "../component/GPSDetail/Address";

const MapDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Map />
      <View style={styles.addressOverlay}>
        <Address />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative", 
  },
  
  addressOverlay: {
    position: "absolute",
    bottom: 40,
    left: 16,
    right: 16,
    zIndex: 10,
    borderRadius: 10,
    padding: 10,
  },
});

export default MapDetailScreen;
