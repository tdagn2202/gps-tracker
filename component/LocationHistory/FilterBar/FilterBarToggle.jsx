import  { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import DynamicIcon from "../../../shared/Icons/DynamicIcon";

const FilterBarToggle = () => {
  const [active, setActive] = useState("menu");
  const translateX = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    const toValue = active === "menu" ? 1 : 0;
    Animated.timing(translateX, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setActive(active === "menu" ? "map" : "menu");
  };

  const circleTranslate = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 44], 
  });

  return (
    <TouchableOpacity style={styles.toggleContainer} onPress={toggle}>
      <Animated.View
        style={[
          styles.activeIndicator,
          {
            transform: [{ translateX: circleTranslate }],
          },
        ]}
      />
      <View style={styles.iconWrapper}>
        <DynamicIcon
          type="Feather"
          name="menu"
          size={15}
          color={active === "menu" ? "#51a3fd" : "#7e7e7e"}
        />
      </View>

      <View style={styles.iconWrapper}>
        <DynamicIcon
          type="Feather"
          name="map"
          size={15}
          color={active === "map" ? "#51a3fd" : "#7e7e7e"}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    width: 80,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    backgroundColor: "#fff",
    position: "relative",
    overflow: "hidden",
  },
  activeIndicator: {
    position: "absolute",
    top: 4,
    left: 0,
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#DBEAFE",
    zIndex: 0,
    justifyContent:'center',
    alignContent:''
  },
  iconWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});

export default FilterBarToggle;
