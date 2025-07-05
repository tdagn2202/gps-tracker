// DateDropdown.jsx
import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

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
                <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.dropdownBox}>
                                <TouchableOpacity
                                    style={styles.dateRow}
                                    onPress={() => setShowFromPicker(true)}
                                >
                                    <Text style={styles.label}>From:</Text>
                                    <Text style={styles.dateText}>{formatDate(fromDate)}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.dateRow}
                                    onPress={() => setShowToPicker(true)}
                                >
                                    <Text style={styles.label}>To:</Text>
                                    <Text style={styles.dateText}>{formatDate(toDate)}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.applyBtn} onPress={applyFilter}>
                                    <Text style={styles.applyText}>Apply</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.applyBtn} onPress={clearFilter}>
                                    <Text style={styles.applyText}>Clear</Text>
                                </TouchableOpacity>

                                {showFromPicker && (
                                    <DateTimePicker
                                        value={fromDate}
                                        mode="date"
                                        display="calendar"
                                        maximumDate={toDate < today ? toDate : today}
                                        onChange={(_, date) => {
                                            setShowFromPicker(false);
                                            if (date) setFromDate(date);
                                        }}
                                    />
                                )}

                                {showToPicker && (
                                    <DateTimePicker
                                        value={toDate}
                                        mode="date"
                                        display="calendar"
                                        minimumDate={fromDate}
                                        maximumDate={today}
                                        onChange={(_, date) => {
                                            setShowToPicker(false);
                                            if (date) setToDate(date);
                                        }}
                                    />
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
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
        color: "#007AFF",
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
});

export default DateDropdown;
