export interface Ingrediente {
    ingrediente: string;
    cantidad: string;
}

export interface Receta {
    id: string;

    nombre: string;
    categoria: string;

    ingredientes: Ingrediente[];

    instrucciones: string[];

    imagen: string;

    tiempoPreparacion: string;

    valorNutricional: string;

    calificacion: number;
}
