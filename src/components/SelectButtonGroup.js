import { COLORS } from "../styles/theme";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

const SelectButtonGroup = ({ options, selectedValue, onSelect }) => (
    <View style={styles.buttonGroup}>
        {options.map((opt) => {
            const isSelected = selectedValue === opt.value;
            return (
                <TouchableOpacity
                    key={opt.value}
                    style={[styles.groupButton, isSelected && styles.groupButtonSelected]}
                    onPress={() => onSelect(opt.value)}
                >
                    <Text style={[styles.groupButtonText, isSelected && styles.groupButtonTextSelected]}>
                        {opt.label}
                    </Text>
                </TouchableOpacity>
            );
        })}
    </View>
);

export default SelectButtonGroup;

const styles = StyleSheet.create({
        groupButton: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.white,
        alignItems: 'center',
    },
        groupButtonTextSelected: {
        color: '#2563eb',
        fontWeight: '600',
    },
        groupButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.subText,
    },
        groupButtonSelected: {
        backgroundColor: '#eff6ff',
        borderColor: '#3b82f6',
    },
})