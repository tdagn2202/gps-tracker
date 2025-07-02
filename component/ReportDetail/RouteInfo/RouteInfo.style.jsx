import { StyleSheet, Dimensions } from "react-native";
import fonts from "../../../constants/fonts";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 32;
const CARD_HEIGHT = 120;
const BORDER_RADIUS = 20;

const styles = StyleSheet.create({
  shadowContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginHorizontal: 16,
    marginVertical: 10,
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: BORDER_RADIUS,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    overflow: "hidden",
  },

  gradient: {
    flex: 1,
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
    overflow: "hidden",
  },

  imageBackground: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20,
  },

  image: {
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
  },

  textContainer: {
    padding: 10,
    borderRadius: 12,
    alignSelf: "flex-start",
  },

  label: {
    fontSize: 13,
    color: "#7e7e7e",
    marginBottom: 4,
    fontFamily: fonts.HelveticaNeueMedium,
  },

  distance: {
    fontSize: 24,
    color: "#222222",
    fontFamily: fonts.HelveticaNeueBold,
  },
});

export default styles;
