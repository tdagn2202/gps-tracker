import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "visible", 
    justifyContent: "center",
    alignItems: "center",
    underlayColor: "transparent",
  },

  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    position: "relative",
    zIndex: 1,
  },

  label: {
    fontSize: 11,
    marginTop: 3,
  },
});

export default styles;
