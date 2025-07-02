import { View, TextInput} from 'react-native';
import DynamicIcon from '../../../shared/Icons/DynamicIcon';
import styles from './Report.style';

const SearchBar = ({value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <DynamicIcon 
        type="Feather" 
        name="search" 
        size={20} 
        color="#7e7e7e" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#ccc"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;
