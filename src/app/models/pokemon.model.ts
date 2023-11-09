export interface Pokemon {
  id: number,
  name: string,
  height: number,
  weight: number,
  order: number,
  base_experience: number,
  abilities: [],
  url: string,
  image: string,
  sprites: { front_default: '' },
  types: [{ type: { name: '' } }],
  favorite: boolean
}
