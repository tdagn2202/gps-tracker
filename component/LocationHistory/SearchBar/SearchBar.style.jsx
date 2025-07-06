import { StyleSheet } from "react-native"
import fonts from "../../../constants/fonts"

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },

  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: "#8E8E93",
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#222222",
    paddingVertical: 4,
  },

  customPlaceholder: {
    position: "absolute",
    left: 0,
    top: 3,
    fontSize: 14,
    color: "#999",
    fontFamily: fonts.HelveticaNeueMedium
  },

  fakePlaceholder: {
    fontSize: 16,
    color: '#999',
  },
})

export default styles

