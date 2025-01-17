export interface BeerInterface {
  id_beer: number;
  id_brewerie: number;
  id_category: number;
  id_picture: number;
  name: string;
  description: string;
  abv: number;
  color: string;
  price: number;
  created_at: Date;
  updated_at: Date;
  type: string;
}
