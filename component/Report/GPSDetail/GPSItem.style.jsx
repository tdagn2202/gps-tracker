import { Platform, StyleSheet } from "react-native";
import fonts from "../../../constants/fonts";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 320,
    height: 100,
    paddingRight: 16,
    marginTop: 16,

    // Cross-platform shadow
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  icon: {
    width: 100,
    height: 100,
  },

  name: {
    fontSize: 16,
    color: "#222222",
    fontFamily: fonts.HelveticaNeueBold,
  },

  statusContainer: {
    backgroundColor: "#e1f0ff",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  statusText: {
    color: "#2c7ef5",
    fontSize: 12,
    fontFamily: fonts.HelveticaNeueBold,
  },
});

export default styles;
