import { View, TouchableOpacity, Text } from "react-native";
import styles from "./FilterBar.style";
import FilterBarToggle from "./FilterBarToggle";
import ActivityDropdown from "./ActivityDropdown";
import DateDropdown from "./DateDropdown";


const FilterBar = ({ activityFilter, setActivityFilter, dateFilter, setDateFilter, viewMode, onToggleViewMode}) => {
  return (
    <View style={styles.filterContainer}>
      <DateDropdown
        selected={dateFilter}
        onSelect={setDateFilter}
      />

      <ActivityDropdown
        selected={activityFilter}
        onSelect={setActivityFilter}
      />

      <FilterBarToggle
        viewMode={viewMode}
        onToggle={onToggleViewMode}
      />
    </View>
  );
};

export default FilterBar;
