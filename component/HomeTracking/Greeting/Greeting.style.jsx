import { StyleSheet } from 'react-native';
import fonts from '../../../constants/fonts';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap:160
  },

  column: {
    flexDirection: 'column',
  },

  welcomeText: {
    fontSize: 14,
    color: '#7e7e7e',
    fontFamily:fonts.HelveticaNeueMedium
  },

   userText: {
    fontSize: 16,
    color: '#222222',
    fontFamily:fonts.HelveticaNeueBold
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0, 
  },

  image: {
    width: 30,
    height: 30,
    borderRadius: 18,
    marginLeft: 12,
  },
});

export default styles;
