import { StyleSheet } from "react-native";
import fonts from "../../../constants/fonts";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 7,
    shadowColor: "#999999",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    width: 320,
    height: 100,
    paddingRight:16,
    marginTop:16
  },

  icon: {
    width: 100,
    height: 100,
    marginRight: -10,
  },

  name: {
    flex: 1,
    fontSize: 16,
    color: '#22222',
    fontFamily:fonts.HelveticaNeueBold  
},

  statusBox: {
    backgroundColor: '#E6F0FF',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },

  statusText: {
    fontSize: 12,
    color: '#007AFF',    
    fontFamily:fonts.HelveticaNeueBold
  },

  container: {
    padding: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    color: '#222222',
    fontFamily:fonts.HelveticaNeueBold
  },

  addText: {
    fontSize: 14,
    color: '#007AFF',
    fontFamily:fonts.HelveticaNeueBold

  },
});

export default styles




