export type Pokemon = {
    id: number;
    name: string;
    sprites: Sprite;
    weight: number;
}

export type Sprite = {
    front_default: string;
    back_default: string;
}