// DateDropdown.jsx
import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions,
    Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import fonts from "../../../constants/fonts";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const today = new Date();

const formatDate = (date) => {
    const d = new Date(date);
    const dd = `${d.getDate()}`.padStart(2, "0");
    const mm = `${d.getMonth() + 1}`.padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
};

const DateDropdown = ({ selectedRange, onSelect }) => {
    const [visible, setVisible] = useState(false);

    const [fromDate, _setFromDate] = useState(today);
    const [toDate, _setToDate] = useState(today);

    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);

    const toggleDropdown = () => setVisible((v) => !v);

    const setFromDate = (date) => {
        _setFromDate(date);
        if (date > toDate) {
            _setToDate(date);
        }
    };
    
    const setToDate = (date) => {
        _setToDate(date);
        if (date < fromDate) {
            _setFromDate(date);
        }
    };

    const applyFilter = () => {
        onSelect({ from: fromDate, to: toDate });
        setVisible(false);
    };

    const clearFilter = () => {
        onSelect(null);
        setVisible(false);
        _setFromDate(today);
        _setToDate(today);
    };

    const handleFromDateChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            setShowFromPicker(false);
        }
        
        if (event.type === 'dismissed') {
            setShowFromPicker(false);
            return;
        }
        
        if (selectedDate) {
            setFromDate(selectedDate);
        }
    };

    const handleToDateChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            setShowToPicker(false);
        }
        
        if (event.type === 'dismissed') {
            setShowToPicker(false);
            return;
        }
        
        if (selectedDate) {
            setToDate(selectedDate);
        }
    };

    const handleOverlayPress = () => {
        // Đóng picker và dropdown
        setShowFromPicker(false);
        setShowToPicker(false);
        setVisible(false);
    };

    const handleDropdownPress = () => {
        // Ngăn không cho overlay đóng khi nhấn vào dropdown
    };

    const closePickers = () => {
        setShowFromPicker(false);
        setShowToPicker(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
                <Text style={styles.buttonText}>
                    {selectedRange
                        ? `${formatDate(selectedRange.from)} – ${formatDate(
                            selectedRange.to
                        )}`
                        : "Select Date"}
                </Text>
            </TouchableOpacity>

            {visible && (
                <TouchableWithoutFeedback onPress={handleOverlayPress}>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback onPress={handleDropdownPress}>
                            <View style={[
                                styles.dropdownBox,
                                (showFromPicker || showToPicker) && Platform.OS === 'ios' && styles.expandedDropdown
                            ]}>
                                <TouchableOpacity
                                    style={styles.dateRow}
                                    onPress={() => {
                                        setShowToPicker(false);
                                        setShowFromPicker(true);
                                    }}
                                >
                                    <Text style={styles.label}>From:</Text>
                                    <Text style={styles.dateText}>
                                        {formatDate(fromDate)}
                                    </Text>
                                </TouchableOpacity>

                                {Platform.OS === 'ios' && showFromPicker && (
                                    <View style={styles.pickerContainer}>
                                        <DateTimePicker
                                            value={fromDate}
                                            mode="date"
                                            display="compact"
                                            maximumDate={toDate < today ? toDate : today}
                                            onChange={handleFromDateChange}
                                        />
                                        <TouchableOpacity
                                            style={styles.doneButton}
                                            onPress={() => setShowFromPicker(false)}
                                        >
                                            <Text style={styles.doneText}>Done</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}

                                <TouchableOpacity
                                    style={styles.dateRow}
                                    onPress={() => {
                                        setShowFromPicker(false);
                                        setShowToPicker(true);
                                    }}
                                >
                                    <Text style={styles.label}>To:</Text>
                                    <Text style={styles.dateText}>
                                        {formatDate(toDate)}
                                    </Text>
                                </TouchableOpacity>

                                {Platform.OS === 'ios' && showToPicker && (
                                    <View style={styles.pickerContainer}>
                                        <DateTimePicker
                                            value={toDate}
                                            mode="date"
                                            display="compact"
                                            minimumDate={fromDate}
                                            maximumDate={today}
                                            onChange={handleToDateChange}
                                        />
                                        <TouchableOpacity
                                            style={styles.doneButton}
                                            onPress={() => setShowToPicker(false)}
                                        >
                                            <Text style={styles.doneText}>Done</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}

                                <TouchableOpacity 
                                    style={styles.applyBtn} 
                                    onPress={applyFilter}
                                >
                                    <Text style={styles.applyText}>
                                        Apply
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.clearBtn} 
                                    onPress={clearFilter}
                                >
                                    <Text style={styles.clearText}>
                                        Clear
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            )}

            {/* Android DateTimePicker */}
            {Platform.OS === 'android' && showFromPicker && (
                <DateTimePicker
                    value={fromDate}
                    mode="date"
                    display="default"
                    maximumDate={toDate < today ? toDate : today}
                    onChange={handleFromDateChange}
                />
            )}

            {Platform.OS === 'android' && showToPicker && (
                <DateTimePicker
                    value={toDate}
                    mode="date"
                    display="default"
                    minimumDate={fromDate}
                    maximumDate={today}
                    onChange={handleToDateChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        zIndex: 10,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#E5E5EA",
        flexDirection: "row",
    },
    buttonText: {
        color: "#51a3fd",
        fontFamily:fonts.HelveticaNeueMedium,
        fontSize:14
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 15,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    dropdownBox: {
        position: "absolute",
        top: 40,
        left: 0,
        width: 200,
        backgroundColor: "#fff",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#E5E5EA",
        padding: 12,
        zIndex: 20,
        elevation: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    expandedDropdown: {
        width: 280,
        minHeight: 200,
    },
    dateRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
    },
    label: {
        fontSize: 14,
        color: "#7e7e7e",
    },
    dateText: {
        fontSize: 14,
        color: "#000",
    },
    pickerContainer: {
        marginVertical: 8,
        alignItems: "center",
    },
    doneButton: {
        marginTop: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: "#007AFF",
        borderRadius: 4,
    },
    doneText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
    applyBtn: {
        marginTop: 12,
        paddingVertical: 8,
        alignItems: "center",
        backgroundColor: "#007AFF",
        borderRadius: 6,
    },
    applyText: {
        color: "#fff",
        fontWeight: "600",
    },
    clearBtn: {
        marginTop: 8,
        paddingVertical: 8,
        alignItems: "center",
        backgroundColor: "#FF3B30",
        borderRadius: 6,
    },
    clearText: {
        color: "#fff",
        fontWeight: "600",
    },
});

export default DateDropdown;