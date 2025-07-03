import { Platform, StyleSheet } from "react-native";
import fonts from "../../../constants/fonts";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    color: "#222222",
    fontFamily: fonts.HelveticaNeueBold,
  },

  addText: {
    fontSize: 14,
    color: "#007AFF",
    fontFamily: fonts.HelveticaNeueBold,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 320,
    height: 100,
    paddingRight: 16,
    marginTop: 16,
    overflow: Platform.OS === "ios" ? "visible" : "hidden",

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  icon: {
    width: 100,
    height: 100,
    marginRight: -10,
  },

  name: {
    flex: 1,
    fontSize: 16,
    color: "#222222",
    fontFamily: fonts.HelveticaNeueBold,
  },

  statusBox: {
    backgroundColor: "#E6F0FF",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },

  statusText: {
    fontSize: 12,
    color: "#007AFF",
    fontFamily: fonts.HelveticaNeueBold,
  },

  deviceName: {
    fontSize: 14,
    color: "#333333",
    fontFamily: fonts.HelveticaNeueMedium,
    marginTop: 8,
    marginBottom: 4,
  },
});

export default styles;
