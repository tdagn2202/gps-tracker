import { StyleSheet } from 'react-native';
import fonts from '../../../constants/fonts';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 10,
    margin:10,
    marginTop:-10
  },

  icon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontFamily:fonts.HelveticaNeueMedium
  },
});

export default styles;
