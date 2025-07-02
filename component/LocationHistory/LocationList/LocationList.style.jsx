import { StyleSheet } from "react-native";
import fonts from "../../../constants/fonts";

const styles = StyleSheet.create({

locationItem: {
  backgroundColor: "#fff",
  borderRadius: 16,
  padding: 16,
  marginBottom: 16,
  borderLeftWidth: 4,
  borderLeftColor: "#007AFF",
  width: 320,            
  alignSelf: "center",       
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},


  locationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },

  locationTitle: {
    fontSize: 16,
    color: "#000",
    flex: 1,
    flexWrap: "wrap",
    fontFamily:fonts.HelveticaNeueBold
  },

  typeTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#ccc",
    alignSelf: "flex-start",
  },

  typeText: {
    fontSize: 12,
    color: "#fff",
    fontFamily:fonts.HelveticaNeueBold
  },

  locationSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontFamily:fonts.HelveticaNeueBold

  },

  locationDetails: {
    gap: 4,
    marginBottom: 4,
    justifyContent:'flex-end',
    alignItems:'flex-start'
  },

  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  detailIcon: {
    marginRight: 6,
  },

  detailText: {
    fontSize: 14,
    color: "#333",
    marginRight: 12,
    fontFamily:fonts.HelveticaNeueBold

  },

  speedText: {
    fontSize: 14,
    color: "#888",
    fontFamily:fonts.HelveticaNeueMedium,
    marginTop: 6,
  },

    locationList: {
    flex: 1,
    paddingHorizontal: 16,
  },

  noResultsContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },

  noResultsText: {
    fontSize: 16,
    color: "#8E8E93",
    marginBottom: 8,
    fontFamily:fonts.HelveticaNeueMedium
  },

  noResultsSubtext: {
    fontSize: 14,
    color: "#C7C7CC",
    fontFamily:fonts.HelveticaNeueMedium

  },
});


export default styles