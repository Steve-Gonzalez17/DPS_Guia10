import React, {
    useEffect,
    useState,
} from "react";

import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
} from "react-native";

import RecipeCard from "../Components/RecipeCard";
import { getRecetas } from "../services/api";
import { Receta } from "../types/Receta";

interface SearchScreenProps {
    navigation: any;
}

export default function SearchScreen({
    navigation,
}: SearchScreenProps) {

    const [recipes, setRecipes] =
        useState<Receta[]>([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        const loadRecipes =
            async () => {

                try {

                    const data =
                        await getRecetas();

                    setRecipes(data);

                } catch (error) {

                    console.error(
                        "Error:",
                        error
                    );
                }
            };

        loadRecipes();

    }, []);

    const results =
        recipes.filter((recipe) => {

            const text =
                search
                    .toLowerCase()
                    .trim();

            const ingredients =
                Array.isArray(
                    recipe.ingredientes
                )
                    ? recipe.ingredientes
                        .map(
                            (item) =>
                                `${item.ingrediente} ${item.cantidad}`
                        )
                        .join(" ")
                        .toLowerCase()
                    : "";

            return (
                recipe.nombre
                    .toLowerCase()
                    .includes(text) ||

                recipe.categoria
                    .toLowerCase()
                    .includes(text) ||

                ingredients.includes(text)
            );
        });

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Buscar recetas
            </Text>

            <Text style={styles.description}>
                Busca por nombre, ingrediente
                o categoría.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="🔎 Ej. pupusas, queso..."
                value={search}
                onChangeText={setSearch}
                autoCapitalize="none"
            />

            <Text style={styles.results}>
                {results.length} resultado(s)
            </Text>

            <FlatList
                data={results}
                keyExtractor={(item) =>
                    item.id
                }
                showsVerticalScrollIndicator={
                    false
                }
                renderItem={({ item }) => (

                    <RecipeCard
                        receta={item}
                        onPress={() =>
                            navigation.navigate(
                                "Detalle",
                                {
                                    recipeId:
                                        item.id,
                                }
                            )
                        }
                    />

                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>
                        No encontramos recetas.
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
    },

    description: {
        color: "#666",
        marginTop: 5,
        marginBottom: 18,
    },

    input: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 15,
        borderWidth: 1,
        borderColor: "#DDD",
        fontSize: 16,
    },

    results: {
        marginVertical: 15,
        color: "#666",
        fontWeight: "600",
    },

    empty: {
        textAlign: "center",
        marginTop: 40,
        color: "#777",
    },
});
