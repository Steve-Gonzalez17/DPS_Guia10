import React, {
    useEffect,
    useState,
} from "react";

import {
    View,
    Text,
    FlatList,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
} from "react-native";

import RecipeCard from "../Components/RecipeCard";
import { getRecetas } from "../services/api";
import { Receta } from "../types/Receta";

interface HomeScreenProps {
    navigation: any;
}

const categories = [
    "Todas",
    "Desayuno",
    "Almuerzo",
    "Cena",
    "Postres",
];

export default function HomeScreen({
    navigation,
}: HomeScreenProps) {

    const [recipes, setRecipes] =
        useState<Receta[]>([]);

    const [search, setSearch] =
        useState("");

    const [category, setCategory] =
        useState("Todas");

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        loadRecipes();
    }, []);

    const loadRecipes = async () => {

        try {

            setLoading(true);

            const data = await getRecetas();

            console.log(
                "RECETAS:",
                data
            );

            setRecipes(data);

        } catch (error) {

            console.error(error);

            Alert.alert(
                "Error",
                "No se pudieron cargar las recetas."
            );

        } finally {

            setLoading(false);
        }
    };

    const filteredRecipes =
        recipes.filter((recipe) => {

            const text =
                search
                    .toLowerCase()
                    .trim();

            const name =
                (recipe.nombre || "")
                    .toLowerCase();

            const recipeCategory =
                (recipe.categoria || "")
                    .toLowerCase();

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

            const matchesSearch =
                name.includes(text) ||
                recipeCategory.includes(text) ||
                ingredients.includes(text);

            const matchesCategory =
                category === "Todas" ||
                recipe.categoria === category;

            return (
                matchesSearch &&
                matchesCategory
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
                🍴 Comida Salvadoreña
            </Text>

            <Text style={styles.subtitle}>
                Descubre los sabores tradicionales
                de El Salvador
            </Text>

            <TextInput
                style={styles.search}
                placeholder="🔎 Buscar receta o ingrediente..."
                value={search}
                onChangeText={setSearch}
            />

            <View style={styles.sectionHeader}>

                <Text style={styles.sectionTitle}>
                    Categorías
                </Text>

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate(
                            "Categorias"
                        )
                    }
                >
                    <Text style={styles.seeAll}>
                        Ver todas
                    </Text>
                </TouchableOpacity>

            </View>

            <FlatList
                horizontal
                data={categories}
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
                style={styles.categoryList}
                renderItem={({ item }) => (

                    <TouchableOpacity
                        onPress={() =>
                            setCategory(item)
                        }
                        style={[
                            styles.categoryButton,
                            category === item &&
                            styles.selectedCategory,
                        ]}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                category === item &&
                                styles.selectedCategoryText,
                            ]}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>

                )}
            />

            <Text style={styles.sectionTitle}>
                Recetas
            </Text>

            <FlatList
                data={filteredRecipes}
                keyExtractor={(item) =>
                    item.id
                }
                showsVerticalScrollIndicator={
                    false
                }
                contentContainerStyle={
                    styles.list
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
                        No se encontraron recetas.
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
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#7B241C",
    },

    subtitle: {
        color: "#666",
        marginTop: 5,
        marginBottom: 18,
    },

    search: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: "#DDD",
        fontSize: 15,
    },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#7B241C",
        marginTop: 20,
        marginBottom: 12,
    },

    seeAll: {
        color: "#C0392B",
        fontWeight: "600",
    },

    categoryList: {
        flexGrow: 0,
    },

    categoryButton: {
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


    selectedCategory: {
        backgroundColor: "#7B241C",
    },

    categoryText: {
        color: "#555",
    },

    selectedCategoryText: {
        color: "#FFF",
    },

    list: {
        paddingBottom: 30,
    },

    empty: {
        textAlign: "center",
        color: "#777",
        marginTop: 30,
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
