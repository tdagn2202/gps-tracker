import { Image, Text, View, TouchableOpacity } from 'react-native';
import DynamicIcon from '../../../shared/Icons/DynamicIcon';
import styles from './Greeting.style';
import { useNavigation } from '@react-navigation/native';

const Greeting = () => {
  const navigation = useNavigation();

  const handleBellPress = () => {
    navigation.navigate('NotificationScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.column}>
          <Text style={styles.welcomeText}>Hello</Text>
          <Text style={styles.userText}>Hải Đăng</Text>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={handleBellPress} style={{ marginRight: 12 }}>
            <DynamicIcon 
              type="FontAwesome" 
              name="bell-o" 
              size={18} 
              color="#222222" 
            />
          </TouchableOpacity>

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
