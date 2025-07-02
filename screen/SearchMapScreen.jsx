import { View, Text } from "react-native";
import DynamicIcon from "../shared/Icons/DynamicIcon";

const SearchMapScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <DynamicIcon type="Feather" name="map" size={64} color="#222222" />
      </View>
      <Text style={styles.description}>
        Hiển thị map của mấy cái vị trí bên kia
      </Text>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  iconBox: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#f5f5dc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#000",
  },
};

export default SearchMapScreen;
