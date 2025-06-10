export interface ApiItem {
  id: number;
  store_id: number;
  name: string;
  brand: string;
  price: number;
  original_price: number;
  tags: string;
  image_url: string;
  description: string;
}

export interface ApiStore {
  id: number;
  name: string;
  address: string;
  hours: string;
} 