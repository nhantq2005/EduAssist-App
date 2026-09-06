import { StyleSheet } from "react-native";
import { COLORS } from "./theme";
import { GlobalStyles } from "./GlobalStyles";

export const styles = StyleSheet.create({
    ...GlobalStyles,
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 15,
    },
    loadingContainer: {
        ...GlobalStyles.centerContent,
        flex: 1, 
    },
    listContainer: {
        paddingBottom: 20,
        paddingTop: 8,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    }
});
