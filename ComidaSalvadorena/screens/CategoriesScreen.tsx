import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
} from "react-native";

import { getRecetas } from "../services/api";
import { Receta } from "../types/Receta";
import RecipeCard from "../Components/RecipeCard";

interface CategoriesScreenProps {
    navigation: any;
}

const categories: string[] = [
    "Todas",
    "Desayuno",
    "Almuerzo",
    "Cena",
    "Postres",
];

export default function CategoriesScreen({
    navigation,
}: CategoriesScreenProps) {

    const [selectedCategory, setSelectedCategory] =
        useState<string>("Todas");

    const [recipes, setRecipes] =
        useState<Receta[]>([]);

    const [loading, setLoading] =
        useState<boolean>(true);

    useEffect(() => {
        loadRecipes();
    }, []);

    const loadRecipes = async () => {
        try {
            setLoading(true);

            const data = await getRecetas();

            console.log("RECETAS CATEGORIAS:", data);

            setRecipes(data);

        } catch (error) {
            console.error(
                "Error cargando categorías:",
                error
            );

            Alert.alert(
                "Error",
                "No se pudieron cargar las recetas."
            );

        } finally {
            setLoading(false);
        }
    };

    const filteredRecipes = recipes.filter((recipe: Receta) => {

        if (selectedCategory === "Todas") {
            return true;
        }

        return (
            recipe.categoria?.toLowerCase() ===
            selectedCategory.toLowerCase()
        );
    });

    if (loading) {
        return (
            <View style={styles.loading}>

                <ActivityIndicator
                    size="large"
                    color="#7B241C"
                />

                <Text style={styles.loadingText}>
                    Cargando recetas...
                </Text>

            </View>
        );
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Categorías
            </Text>

            <FlatList
                horizontal
                data={categories}
                keyExtractor={(item: string) => item}
                showsHorizontalScrollIndicator={false}
                style={styles.categories}
                renderItem={({ item }: { item: string }) => (

                    <TouchableOpacity
                        onPress={() =>
                            setSelectedCategory(item)
                        }
                        style={[
                            styles.category,
                            selectedCategory === item &&
                            styles.selected,
                        ]}
                    >

                        <Text
                            style={[
                                styles.categoryText,
                                selectedCategory === item &&
                                styles.selectedText,
                            ]}
                        >
                            {item}
                        </Text>

                    </TouchableOpacity>

                )}
            />

            <Text style={styles.resultTitle}>
                {selectedCategory}
            </Text>

            <FlatList
                data={filteredRecipes}
                keyExtractor={(item: Receta, index: number) =>
                    item.id
                        ? String(item.id)
                        : `${item.nombre}-${index}`
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                    filteredRecipes.length === 0
                        ? styles.emptyContainer
                        : styles.list
                }
                renderItem={({ item }: { item: Receta }) => (

                    <RecipeCard
                        receta={item}
                        onPress={() =>
                            navigation.navigate(
                                "Detalle",
                                {
                                    recipeId: item.id,
                                }
                            )
                        }
                    />

                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>
                        No hay recetas en esta categoría.
                    </Text>
                }
            />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F8F5F0",
        padding: 20,
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#7B241C",
        marginBottom: 15,
    },

    categories: {
        flexGrow: 0,
        marginBottom: 10,
    },

    category: {
        backgroundColor: "#FFFFFF",
        height: 42,
        minWidth: 90,
        borderRadius: 21,
        borderWidth: 1,
        borderColor: "#DDDDDD",
        marginRight: 10,
        marginBottom: 30,
        justifyContent: "center",
        alignItems: "center",
    },

    categoryText: {
        color: "#555",
        fontSize: 16,
        fontWeight: "500",
    },

    selected: {
        backgroundColor: "#7B241C",
    },

    selectedText: {
        color: "#FFFFFF",
    },

    resultTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#7B241C",
        marginVertical: 15,
    },

    list: {
        paddingBottom: 30,
    },

    emptyContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    empty: {
        textAlign: "center",
        color: "#777",
        fontSize: 16,
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

});