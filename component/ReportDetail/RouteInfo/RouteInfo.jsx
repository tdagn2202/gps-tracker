import { View, ImageBackground, Text } from "react-native";
import styles from "./RouteInfo.style";

const RouteInfo = () => {
  return (
    <View style={styles.shadowContainer}>
      <ImageBackground
        source={require("../../../assets/image/routeInfo.png")}
        style={styles.imageBackground}
        imageStyle={styles.image}
        resizeMode="cover"
      >

        <View style={styles.textContainer}>
          <Text style={styles.label}>Quãng đường đã đi</Text>
          <Text style={styles.distance}>17.6km</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RouteInfo;
