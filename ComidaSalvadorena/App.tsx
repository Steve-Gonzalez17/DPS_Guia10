import React from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreens";
import CategoriesScreen from "./screens/CategoriesScreen";
import SearchScreen from "./screens/SearchScreen";
import RecipeDetailScreen from "./screens/RecipeDetailScreen";

import { RootStackParamList } from "./types/Navigation";

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Inicio"
      >

        <Stack.Screen
          name="Inicio"
          component={HomeScreen}
          options={{
            title: "Comida Salvadoreña",
          }}
        />

        <Stack.Screen
          name="Categorias"
          component={CategoriesScreen}
          options={{
            title: "Categorías",
          }}
        />

        <Stack.Screen
          name="Buscar"
          component={SearchScreen}
          options={{
            title: "Buscar",
          }}
        />

        <Stack.Screen
          name="Detalle"
          component={RecipeDetailScreen}
          options={{
            title: "Receta",
          }}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}
