import { View, TextInput, Text } from "react-native";
import styles from "./SearchBar.style";
import DynamicIcon from "../../../shared/Icons/DynamicIcon";

const SearchBar = ({ searchText, setSearchText }) => {

  return (
    <View style={styles.searchContainer}>
      <DynamicIcon
        type="Feather"
        name="search"
        size={18}
        color="#7e7e7e"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search locations..."
        placeholderTextColor="#999"
        returnKeyType="search"
      />
    </View>
  );
};

export default SearchBar;
