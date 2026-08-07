import { useState } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { styles } from "../styles/RegisterStyle";

const FormDropdown = ({ placeholder, initialItems, value, onChangeValue, zIndex, icon: Icon }) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(initialItems);
    return (
        <View style={{ zIndex, ...(Platform.OS === 'ios' ? { zIndex } : {}) }}>
            {Icon && (
                <View style={{ position: 'absolute', left: 14, top: 16, zIndex: 1, elevation: 1 }}>
                    <Icon size={20} color="#6B7280" />
                </View>
            )}
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={(valUpdater) => {
                    const val = typeof valUpdater === 'function' ? valUpdater(value) : valUpdater;
                    onChangeValue(val);
                }}
                setItems={setItems}
                placeholder={placeholder}
                style={[
                    styles.dropdown,
                    Icon && { paddingLeft: 46 }
                ]}
                textStyle={{ fontSize: 15, color: '#111827' }}
                placeholderStyle={{ color: '#6B7280', fontSize: 15 }}
                dropDownContainerStyle={styles.dropdownContainer}
                listMode="SCROLLVIEW"
                zIndex={zIndex}
            />
        </View>
    );
};

export default FormDropdown;