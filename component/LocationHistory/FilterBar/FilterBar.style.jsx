import { StyleSheet } from "react-native";
import fonts from "../../../constants/fonts";


const styles=StyleSheet.create({
    filterContainer: {
      flexDirection: "row",      
      paddingHorizontal: 16,
      paddingVertical: 16,
      gap: 10,                    
    },
    

    filterButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: "#E5E5EA",
    },
    

    filterText: {
      fontSize: 14,
      color: "#51a3fd",
      marginRight: 6,
      fontFamily:fonts.HelveticaNeueMedium
    },
    

    filterArrow: {
      fontSize: 12,
      color: "#8E8E93",
    },
    

    mapButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: "#E5E5EA",
    },
    

toggleButton: {
  width: 40,
  height: 40,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#E5E5EA",
  backgroundColor: "#FFFFFF",
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
},



})

export default styles


