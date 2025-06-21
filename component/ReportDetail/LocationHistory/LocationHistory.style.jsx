import { StyleSheet, Dimensions } from "react-native";
import fonts from "../../../constants/fonts";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 8,
    width: width - 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    marginTop:8
  },

  time: {
    fontSize: 14,
    fontFamily: fonts.HelveticaNeueMedium,
    color: "#333",
    marginBottom: 8,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },

  place: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.HelveticaNeueBold,
    color: "#222",
    marginRight: 10,
  },

  durationTag: {
    backgroundColor: "#e5f0fd",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 6,
  },

  durationText: {
    fontSize: 12,
    color: "#007aff",
    fontFamily: fonts.HelveticaNeueMedium,
  },

  coords: {
    fontSize: 13,
    color: "#555",
    marginTop: 8,
    fontFamily: fonts.HelveticaNeueMedium,
  },

  buttons: {
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 6,
  },

  historyButton: {
    backgroundColor: "#C7E3F9",
    borderRadius: 12,
    paddingHorizontal: 19,
    paddingVertical: 6,
  },

  buttonText: {
    fontSize: 13,
    color: "#0255AF",
    fontFamily: fonts.HelveticaNeueBold,
  },

  mapButton: {
    flexDirection: "row",
    backgroundColor: "#C7E3F9",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",
  },

  mapIcon: {
    width: 14,
    height: 14,
    marginRight: 6,
  },

  mapText: {
    fontSize: 13,
    fontFamily: fonts.HelveticaNeueMedium,
    color: "#7e7e7e",
  },
  container:{
    marginTop:16, 
},

textTitle:{
    fontSize:18,
    fontFamily:fonts.HelveticaNeueBold,
    color:"#222222",
    marginLeft:10
}
});

export default styles
