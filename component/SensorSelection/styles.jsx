import { StyleSheet } from "react-native";
import fonts from "../../constants/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "#222222",
    marginBottom: 4,
    fontFamily: fonts.HelveticaNeueBold,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#8E8E93",
  },
  sensorList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sensorCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sensorHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sensorIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  sensorMainInfo: {
    flex: 1,
  },
  sensorTitle: {
    fontSize: 18,
    color: "#222222",
    marginBottom: 2,
    fontFamily: fonts.HelveticaNeueBold,
  },
  sensorSubtitle: {
    fontSize: 12,
    color: "#8E8E93",
    fontFamily: fonts.HelveticaNeueMedium,
    marginTop: -5,
  },
  arrowContainer: {
    padding: 4,
  },
  sensorDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: "#3C3C43",
    marginLeft: 8,
    flex: 1,
    fontFamily: fonts.HelveticaNeueMedium,
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: "#34C759",
    fontFamily: fonts.HelveticaNeueBold,
  },
});

export default styles;
