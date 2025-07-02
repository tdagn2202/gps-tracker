import { View, TextInput, Text } from "react-native";
import  { useState } from "react";
import styles from "./SearchBar.style";
import DynamicIcon from "../../../shared/Icons/DynamicIcon";

const SearchBar = ({ searchText, setSearchText }) => {
  const [isFocused, setIsFocused] = useState(false);

  const showCustomPlaceholder = !searchText && !isFocused;

  return (
    <View style={styles.searchContainer}>
      <Text style={styles.searchIcon}>
        <DynamicIcon 
            type="Feather" 
            name="search" 
            size={18} 
            color="#7e7e7e" 
        />
      </Text>

      <View style={{ flex: 1 }}>
        {showCustomPlaceholder && (
          <Text style={styles.customPlaceholder}>Search locations...</Text>
        )}
        <TextInput
          style={[styles.searchInput, showCustomPlaceholder && { color: "transparent" }]}
          value={searchText}
          onChangeText={setSearchText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
};

export default SearchBar;
