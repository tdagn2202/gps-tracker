import { StyleSheet } from "react-native";
import fonts from "../../constants/fonts";

const styles =StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 18,
    color: '#333',
    fontFamily:fonts.HelveticaNeueMedium

  },
})

export default styles