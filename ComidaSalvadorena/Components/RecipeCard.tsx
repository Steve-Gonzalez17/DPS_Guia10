import React from "react";

import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import { Receta } from "../types/Receta";

interface RecipeCardProps {
    receta: Receta;
    onPress: () => void;
}

export default function RecipeCard({
    receta,
    onPress,
}: RecipeCardProps) {

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.8}
        >

            <Image
                source={{
                    uri: receta.imagen,
                }}
                style={styles.image}
            />

            <View style={styles.content}>

                <Text style={styles.title}>
                    {receta.nombre}
                </Text>

                <Text style={styles.category}>
                    {receta.categoria}
                </Text>

                <View style={styles.bottom}>

                    <Text style={styles.time}>
                        ⏱{" "}
                        {
                            receta.tiempoPreparacion
                        }
                    </Text>

                    <Text style={styles.rating}>
                        ⭐{" "}
                        {receta.calificacion}
                    </Text>

                </View>

            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        marginBottom: 15,
        overflow: "hidden",
        elevation: 3,
    },

    image: {
        width: "100%",
        height: 180,
        backgroundColor: "#E5E5E5",
    },

    content: {
        padding: 15,
    },

    title: {
        fontSize: 21,
        fontWeight: "bold",
        color: "#7B241C",
    },

    category: {
        color: "#C0392B",
        marginTop: 4,
        fontWeight: "600",
    },

    bottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
    },

    time: {
        color: "#666",
    },

    rating: {
        color: "#444",
        fontWeight: "600",
    },
});
