import { View, TouchableOpacity, Text } from "react-native";
import DynamicIcon from "../../../shared/Icons/DynamicIcon";
import styles from "./FilterBar.style";
import FilterBarToggle from "./FilterBarToggle";
import ActivityDropdown from "./ActivityDropdown";


const FilterBar = ({ activityFilter, setActivityFilter }) => {
  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterText}>All Dates</Text>
        <DynamicIcon
          type="MaterialIcons"
          name="keyboard-arrow-down"
          size={18}
          color="#51a3fd"
        />
      </TouchableOpacity>

      <ActivityDropdown
        selected={activityFilter}
        onSelect={setActivityFilter}
      />

      <FilterBarToggle />
    </View>
  );
};

export default FilterBar;
