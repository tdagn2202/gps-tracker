import {View, Text, TouchableOpacity} from 'react-native';
import DynamicIcon from '../../../shared/Icons/DynamicIcon';
import styles from './/LastUpdatedTime.style'

const LastUpdatedTime = () => {
  return (
    <View style={styles.container}>
         <View style={styles.row}>
            <Text style={styles.text}>Last updated</Text>
            <View style={styles.rectangleTime}>
                <Text style={styles.dayTime}>12:05AM - 09/06/2025</Text>
            </View>

            <TouchableOpacity style={styles.rectangleReload}>
                <DynamicIcon 
                    type="MaterialCommunityIcons" 
                    name="reload" 
                    size={15} 
                    color="#276FBD" 
                />
            </TouchableOpacity>
         </View>
    </View>
  )
}

export default LastUpdatedTime
