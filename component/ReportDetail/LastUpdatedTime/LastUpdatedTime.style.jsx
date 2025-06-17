import { StyleSheet } from 'react-native';
import fonts from '../../../constants/fonts';
const styles = StyleSheet.create({
    container: {
    alignSelf: 'flex-end',     
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginTop:-15
},

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  text: {
    fontSize: 11,
    color: '#7e7e7e',
    marginRight: 8,
    fontFamily:fonts.HelveticaNeueMedium
  },

  rectangleTime: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C7E3F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 8,
  },

  dayTime: {
    fontSize: 12,
    color: '#276FBD',
    marginHorizontal: 4,
    fontFamily:fonts.HelveticaNeueBold
  },

  rectangleReload: {
    backgroundColor: '#C7E3F9',
    padding: 4,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles
