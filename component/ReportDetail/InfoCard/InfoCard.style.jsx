
import { StyleSheet, Dimensions } from "react-native";
import fonts from "../../../constants/fonts";

const CARD_WIDTH = (Dimensions.get("window").width - 48) / 2;
const CARD_HEIGHT = 100;

export default StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  label: {
    fontSize: 14,
    color: "#7e7e7e",
    marginBottom: 4,
    fontFamily:fonts.HelveticaNeueMedium
  },
  
  value: {
    fontSize: 22,
    color: "#222222",
    fontFamily:fonts.HelveticaNeueBold
  },
  
});
