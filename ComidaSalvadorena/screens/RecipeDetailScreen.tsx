import React, {
    useEffect,
    useState,
} from "react";

import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from "react-native";

import { getRecetaById } from "../services/api";
import { Receta } from "../types/Receta";

interface RecipeDetailScreenProps {
    route: {
        params: {
            recipeId: string;
        };
    };
}

export default function RecipeDetailScreen({
    route,
}: RecipeDetailScreenProps) {

    const {
        recipeId,
    } = route.params;

    const [recipe, setRecipe] =
        useState<Receta | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const loadRecipe =
            async () => {

                try {

                    setLoading(true);

                    const data =
                        await getRecetaById(
                            recipeId
                        );

                    setRecipe(data);

                } catch (error) {

                    console.error(
                        "Error cargando receta:",
                        error
                    );

                    Alert.alert(
                        "Error",
                        "No se pudo cargar la receta."
                    );

                } finally {

                    setLoading(false);
                }
            };

        loadRecipe();

    }, [recipeId]);

    if (loading) {

        return (
            <View style={styles.loading}>

                <ActivityIndicator
                    size="large"
                    color="#7B241C"
                />

                <Text style={styles.loadingText}>
                    Cargando receta...
                </Text>

            </View>
        );
    }

    if (!recipe) {

        return (
            <View style={styles.loading}>

                <Text style={styles.notFound}>
                    Receta no encontrada.
                </Text>

            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={
                false
            }
        >

            <Image
                source={{
                    uri: recipe.imagen,
                }}
                style={styles.image}
            />

            <View style={styles.content}>

                <Text style={styles.title}>
                    {recipe.nombre}
                </Text>

                <Text style={styles.category}>
                    {recipe.categoria}
                </Text>

                <View style={styles.info}>

                    <View style={styles.infoItem}>

                        <Text
                            style={styles.infoLabel}
                        >
                            Preparación
                        </Text>

                        <Text
                            style={styles.infoValue}
                        >
                            ⏱{" "}
                            {
                                recipe.tiempoPreparacion
                            }
                        </Text>

                    </View>

                    <View style={styles.infoItem}>

                        <Text
                            style={styles.infoLabel}
                        >
                            Calificación
                        </Text>

                        <Text
                            style={styles.infoValue}
                        >
                            ⭐{" "}
                            {recipe.calificacion}
                        </Text>

                    </View>

                </View>

                <Text
                    style={styles.sectionTitle}
                >
                    Ingredientes
                </Text>

                {Array.isArray(
                    recipe.ingredientes
                ) &&
                    recipe.ingredientes.map(
                        (item, index) => (

                            <View
                                key={`${recipe.id}-ingrediente-${index}`}
                                style={
                                    styles.ingredientRow
                                }
                            >

                                <Text
                                    style={
                                        styles.bullet
                                    }
                                >
                                    •
                                </Text>

                                <Text
                                    style={
                                        styles.ingredient
                                    }
                                >
                                    {
                                        item.ingrediente
                                    }
                                    :{" "}
                                    {
                                        item.cantidad
                                    }
                                </Text>

                            </View>
                        )
                    )}

                <Text
                    style={styles.sectionTitle}
                >
                    Preparación
                </Text>

                {Array.isArray(
                    recipe.instrucciones
                ) &&
                    recipe.instrucciones.map(
                        (
                            instruction,
                            index
                        ) => (

                            <View
                                key={`${recipe.id}-paso-${index}`}
                                style={
                                    styles.stepRow
                                }
                            >

                                <View
                                    style={
                                        styles.number
                                    }
                                >

                                    <Text
                                        style={
                                            styles.numberText
                                        }
                                    >
                                        {index + 1}
                                    </Text>

                                </View>

                                <Text
                                    style={
                                        styles.instruction
                                    }
                                >
                                    {instruction}
                                </Text>

                            </View>
                        )
                    )}

                <Text
                    style={styles.sectionTitle}
                >
                    Valor nutricional
                </Text>

                <View
                    style={styles.nutrition}
                >

                    <Text
                        style={
                            styles.nutritionText
                        }
                    >
                        {
                            recipe.valorNutricional
                        }
                    </Text>

                </View>

            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F8F5F0",
    },

    image: {
        width: "100%",
        height: 280,
        backgroundColor: "#E5E5E5",
    },

    content: {
        padding: 20,
    },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#7B241C",
    },

    category: {
        color: "#C0392B",
        fontSize: 16,
        fontWeight: "600",
        marginTop: 5,
    },

    info: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginTop: 20,
    },

    infoItem: {
        flex: 1,
    },

    infoLabel: {
        color: "#777",
        marginBottom: 5,
    },

    infoValue: {
        color: "#333",
        fontWeight: "bold",
    },

    sectionTitle: {
        fontSize: 23,
        fontWeight: "bold",
        color: "#7B241C",
        marginTop: 25,
        marginBottom: 12,
    },

    ingredientRow: {
        flexDirection: "row",
        marginBottom: 9,
    },

    bullet: {
        color: "#C0392B",
        fontSize: 20,
        marginRight: 8,
    },

    ingredient: {
        flex: 1,
        fontSize: 16,
        color: "#444",
        lineHeight: 22,
    },

    stepRow: {
        flexDirection: "row",
        marginBottom: 15,
    },

    number: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#7B241C",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },

    numberText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },

    instruction: {
        flex: 1,
        fontSize: 16,
        lineHeight: 24,
        color: "#444",
    },

    nutrition: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 30,
    },

    nutritionText: {
        fontSize: 16,
        color: "#444",
    },

    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8F5F0",
    },

    loadingText: {
        marginTop: 10,
        color: "#666",
    },

    notFound: {
        fontSize: 18,
        color: "#666",
    },
});
