import  { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import styles from "../BottomNavigation/BottomNavigation.style.jsx";
import DynamicIcon from "../Icons/DynamicIcon.js";

const ICON_MAP = {
  Home: { type: "Ionicons", name: "home-outline" },
  History: { type: "MaterialCommunityIcons", name: "history" },
  Notification: { type: "Feather", name: "bell" },
  Report: { type: "Feather", name: "bar-chart" },
};

const MyTabBars = ({ state, descriptors, navigation }) => {
  const tabWidth = Dimensions.get("window").width / state.routes.length;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * tabWidth,
      useNativeDriver: false,
    }).start();
  }, [state.index]);

  const highlightSize = 60;

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <View style={[styles.tabBar, { position: "relative" }]}>
        <Animated.View
          style={{
            position: "absolute",
            top: 10,
            borderRadius: 17,
            left: translateX.interpolate({
              inputRange: [0, tabWidth * (state.routes.length - 1)],
              outputRange: [
                0 + tabWidth / 2 - highlightSize / 2,
                tabWidth * (state.routes.length - 1) +
                  tabWidth / 2 -
                  highlightSize / 2,
              ],
              extrapolate: "clamp",
            }),
            width: highlightSize,
            height: highlightSize,
            backgroundColor: "#DBEAFE",
          }}
        />

        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const iconInfo = ICON_MAP[route.name] || {
            type: "Ionicons",
            name: "help-circle-outline",
          };
          const color = isFocused ? "#51a3fd" : "#A9A9A9";

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={{
                width: tabWidth,
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 10,
                flexDirection: "column",
                paddingBottom: 37,
              }}
              activeOpacity={0.8}
            >
              <DynamicIcon
                type={iconInfo.type}
                name={iconInfo.name}
                size={20}
                color={color}
              />
              <Text style={{ color, marginTop: 4, fontSize: 12 }}>
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default MyTabBars;
