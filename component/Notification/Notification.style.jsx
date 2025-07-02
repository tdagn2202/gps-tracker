import { StyleSheet } from "react-native";
import fonts from "../../constants/fonts";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  icon: {
    width: 50,
    height: 50,
    marginRight: 12,
    marginTop: 4,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 14,
    marginBottom: 2,
    fontFamily:fonts.HelveticaNeueBold,
    color:'#51a3fd'
  },

  message: {
    fontSize: 13,
    color: "#7e7e7e",
    fontFamily:fonts.HelveticaNeueMedium
  },

 
  time: {
    fontSize: 12,
    color: "#51a3fd",
    marginLeft: 8,
    fontFamily:fonts.HelveticaNeueMedium
  },

});

export default styles;
