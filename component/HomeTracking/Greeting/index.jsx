import { Image, Text, View } from 'react-native';
import DynamicIcon from '../../../shared/Icons/DynamicIcon';
import styles from './Greeting.style';


const Greeting = () => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.column}>
          <Text style={styles.welcomeText}>Hello</Text>
          <Text style={styles.userText}>Hải Đăng</Text>
        </View>

        <View style={styles.row}>
          <DynamicIcon 
            type="FontAwesome" 
            name="bell-o" 
            size={18} 
            color="#222222" 
          />

          <Image
            source={require('../../../assets/image/avatar.png')}
            style={styles.image}
          />
        </View>
      </View>
    </View>
  );
};

export default Greeting;
