export interface Product {
  id: string
  nameProduct: string,
  stock: string,
  price: number,
  qteStock: number,
  qteMin: number,
  status: boolean
}

// Type pour l'insertion d'un produit (sans ID, généré par Firestore)
export type ProductInput = Omit<Product, 'id'>;

// Type pour la mise à jour partielle d'un produit
export type ProductUpdate = Partial<ProductInput>;