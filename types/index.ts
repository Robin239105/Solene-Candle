export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice: number | null;
  images: string[];
  scent: string;
  size: string[];
  burnTime: string;
  ingredients: string;
  howToUse: string;
  stock: number;
  featured: boolean;
  bestseller: boolean;
  isNew: boolean;
  collectionId: string | null;
  collection?: Collection | null;
  createdAt: Date;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  products?: Product[];
}

export interface CartItem {
  id: string; // unique cart item id (e.g. productId-size)
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
}
