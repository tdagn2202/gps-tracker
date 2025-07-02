import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import styles from "./FilterBar.style";
import DynamicIcon from "../../../shared/Icons/DynamicIcon";
import fonts from "../../../constants/fonts";

const activityOptions = ["All Activities", "Driving", "Walking", "Stationary"];

const ActivityDropdown = ({ selected, onSelect }) => {
  const [visible, setVisible] = useState(false);

  const handleSelect = (item) => {
    onSelect(item);
    setVisible(false);
  };

  return (
    <View style={localStyles.wrapper}>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setVisible(!visible)}
      >
        <Text style={styles.filterText}>{selected}</Text>
        <DynamicIcon
          type="MaterialIcons"
          name={visible ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={18}
          color="#51a3fd"
        />
      </TouchableOpacity>

      {visible && (
        <View style={localStyles.dropdown}>
          {activityOptions.map((item) => {
            const isSelected = item === selected;

            return (
              <TouchableOpacity
                key={item}
                style={[
                  localStyles.dropdownItem,
                  isSelected && localStyles.selectedItem,
                ]}
                onPress={() => handleSelect(item)}
              >
                <Text
                  style={[
                    localStyles.dropdownText,
                    isSelected && localStyles.selectedText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const localStyles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },

  dropdown: {
    position: "absolute",
    top: 42,
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    zIndex: 999,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },

  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  dropdownText: {
    fontSize: 14,
    color: "#7e7e7e",
    fontFamily:fonts.HelveticaNeueMedium
  },

  selectedItem: {
    backgroundColor: "#E0F0FF", 
    borderRadius: 6,
  },

  selectedText: {
    color: "#007AFF",
    fontFamily:fonts.HelveticaNeueMedium
  },
});

export default ActivityDropdown;
