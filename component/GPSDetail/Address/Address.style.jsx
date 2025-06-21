import { StyleSheet } from "react-native";
import fonts from "../../../constants/fonts";

const styles = StyleSheet.create({
  container: {
    padding: 10
  },

  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  squareColumn: {
    alignItems: 'center',
    width: 85,
    height:90,
    backgroundColor:'#e9e8e3',
    justifyContent:'center',
    borderRadius:20
  },
  journeyText: {
    fontSize: 16,
    marginTop: 4,
    fontFamily:fonts.HelveticaNeueBold
  },

  compassText: {
    fontSize: 12,
    color: '#7e7e7e',
    fontFamily:fonts.HelveticaNeueMedium
  },

  rectangleAddress: {
    backgroundColor: '#f8f5f0',
    padding: 15,
    borderRadius: 15,
  },

  rowText: {
    flexDirection: 'column',
  },

  address: {
    fontSize: 16,
    marginBottom: 6,
    fontFamily:fonts.HelveticaNeueBold
  },

  time: {
    fontSize: 12,
    color: '#7e7e7e',
    fontFamily:fonts.HelveticaNeueMedium
  },

  squareIconCompass:{
    width:30,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#F3F8E6',
    borderRadius:100
  },

    squareIconWifi:{
    width:30,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#FEF1E9',
    borderRadius:100
  },

    squareIconSpeed:{
    width:30,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#F0EDFD',
    borderRadius:100
  }


});

export default styles