import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";

interface CategoryButtonProps {
    name: string;
    active: boolean;
    onPress: () => void;
}

export default function CategoryButton({
    name,
    active,
    onPress,
}: CategoryButtonProps) {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.button,
                active && styles.activeButton,
            ]}
        >

            <Text
                style={[
                    styles.text,
                    active && styles.activeText,
                ]}
            >
                {name}
            </Text>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingHorizontal: 17,
        paddingVertical: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#DDDDDD",
    },

    activeButton: {
        backgroundColor: "#7B241C",
        borderColor: "#7B241C",
    },

    text: {
        color: "#555",
        fontWeight: "600",
    },

    activeText: {
        color: "#FFFFFF",
    },
});
