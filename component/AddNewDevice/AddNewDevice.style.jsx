import { StyleSheet } from "react-native";
import fonts from "../../constants/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily:fonts.HelveticaNeueBold
  },
});

export default styles