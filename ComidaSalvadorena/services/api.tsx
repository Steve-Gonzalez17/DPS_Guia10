import { Receta } from "../types/Receta";

const API_URL = "https://6ab6e9fbc4c7bb67b9191da7.mockapi.io/api/sv/recetas";

interface ApiResponse {
    id?: string;
    comidas_salvadoreñas: Receta[];
}

export const getRecetas = async (): Promise<Receta[]> => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(
                `Error HTTP: ${response.status}`
            );
        }

        const data: ApiResponse[] = await response.json();

        console.log("RESPUESTA API:", data);

        if (!Array.isArray(data)) {
            throw new Error("La respuesta de la API no es un array");
        }

        /*
         * MockAPI está devolviendo:
         *
         * [
         *   {
         *      comidas_salvadoreñas: [...]
         *   }
         * ]
         *
         * Extraemos el contenido.
         */

        const recetas: Receta[] =
            data.flatMap(
                (registro) =>
                    Array.isArray(
                        registro.comidas_salvadoreñas
                    )
                        ? registro.comidas_salvadoreñas
                        : []
            );

        /*
         * Creamos IDs locales porque las recetas
         * dentro del array no tienen id propio.
         */

        return recetas.map(
            (receta, index) => ({
                ...receta,
                id:
                    receta.id ||
                    `receta-${index + 1}`,
            })
        );

    } catch (error) {

        console.error(
            "Error cargando recetas:",
            error
        );

        throw error;
    }
};


/*
 * Obtener una receta por ID
 *
 * Como las recetas están dentro de un solo registro
 * de MockAPI, no podemos hacer:
 *
 * GET /endpoint/receta-1
 *
 * porque "receta-1" NO es un recurso de MockAPI.
 *
 * Primero descargamos todas las recetas y después
 * buscamos la que corresponde al ID local.
 */

export const getRecetaById = async (
    id: string
): Promise<Receta> => {

    try {

        const recetas = await getRecetas();

        const receta = recetas.find(
            (item) => item.id === id
        );

        if (!receta) {
            throw new Error(
                "Receta no encontrada"
            );
        }

        return receta;

    } catch (error) {

        console.error(
            "Error cargando receta:",
            error
        );

        throw error;
    }
};
