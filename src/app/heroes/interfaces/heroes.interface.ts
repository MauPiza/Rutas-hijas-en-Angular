export interface RESTHeroeResponse {
  id?: string;
  superhero: string;
  publisher: Publisher;
  alter_ego: string;
  first_appearance: string;
  characters: string;
  alt_img?: string; //https://hostinget.com/imagen.jpg
}

export enum Publisher {
  DCComics = 'DC Comics',
  MarvelComics = 'Marvel Comics',
}
