import {
    collection,
    addDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp,
    serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase/firestore";
import { Product, ProductInput, ProductUpdate } from "@/type/product";

// Nom de la collection dans Firestore
const COLLECTION_NAME = "products";

/**
 * Ajoute un nouveau produit dans Firestore
 * @param product - Les données du produit à ajouter (sans ID)
 * @returns L'ID du produit créé
 */
export async function addProduct(product: ProductInput): Promise<string> {
    try {
        console.log("🔥 Tentative d'ajout du produit dans Firestore...");
        console.log("📦 Données du produit:", product);
        console.log("🗂️ Collection:", COLLECTION_NAME);

        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...product,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        console.log("✅ Produit ajouté avec l'ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("❌ Erreur lors de l'ajout du produit:", error);
        console.error("📋 Détails de l'erreur:", JSON.stringify(error, null, 2));
        throw new Error(`Impossible d'ajouter le produit: ${error}`);
    }
}

/**
 * Récupère un produit par son ID
 * @param id - L'ID du produit
 * @returns Le produit ou null s'il n'existe pas
 */
export async function getProduct(id: string): Promise<Product | null> {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                nameProduct: data.nameProduct,
                stock: data.stock,
                price: data.price,
                qteStock: data.qteStock,
                qteMin: data.qteMin,
                status: data.status
            } as Product;
        } else {
            console.log("Aucun produit trouvé avec cet ID");
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du produit:", error);
        throw new Error("Impossible de récupérer le produit");
    }
}

/**
 * Récupère tous les produits
 * @returns Un tableau de tous les produits
 */
export async function getAllProducts(): Promise<Product[]> {
    try {
        console.log("🔍 Récupération de tous les produits...");
        const q = query(collection(db, COLLECTION_NAME), orderBy("nameProduct", "asc"))
        const querySnapshot = await getDocs(q);
        const products: Product[] = [];

        // enlever le timestamp
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            products.push({
                id: doc.id,
                nameProduct: data.nameProduct,
                stock: data.stock,
                price: data.price,
                qteStock: data.qteStock,
                qteMin: data.qteMin,
                status: data.status
            } as Product);
        });

        console.log(`✅ ${products.length} produit(s) récupéré(s)`);
        return products;
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des produits:", error);
        throw new Error("Impossible de récupérer les produits");
    }
}

/**
 * Récupère les produits actifs uniquement
 * @returns Un tableau des produits actifs
 */
export async function getActiveProducts(): Promise<Product[]> {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where("status", "==", true)
        );
        const querySnapshot = await getDocs(q);
        const products: Product[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            products.push({
                id: doc.id,
                nameProduct: data.nameProduct,
                stock: data.stock,
                price: data.price,
                qteStock: data.qteStock,
                qteMin: data.qteMin,
                status: data.status
            } as Product);
        });

        return products;
    } catch (error) {
        console.error("Erreur lors de la récupération des produits actifs:", error);
        throw new Error("Impossible de récupérer les produits actifs");
    }
}

/**
 * Récupère les produits avec un stock faible (qteStock <= qteMin)
 * @returns Un tableau des produits avec stock faible
 */
export async function getLowStockProducts(): Promise<Product[]> {
    try {
        const allProducts = await getAllProducts();
        return allProducts.filter(product => product.qteStock <= product.qteMin);
    } catch (error) {
        console.error("Erreur lors de la récupération des produits en stock faible:", error);
        throw new Error("Impossible de récupérer les produits en stock faible");
    }
}

/**
 * Met à jour un produit existant
 * @param id - L'ID du produit à mettre à jour
 * @param updates - Les champs à mettre à jour
 */
export async function updateProduct(id: string, updates: ProductUpdate): Promise<void> {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });

        console.log("Produit mis à jour avec succès");
    } catch (error) {
        console.error("Erreur lors de la mise à jour du produit:", error);
        throw new Error("Impossible de mettre à jour le produit");
    }
}

/**
 * Supprime un produit
 * @param id - L'ID du produit à supprimer
 */
export async function deleteProduct(id: string): Promise<void> {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await deleteDoc(docRef);

        console.log("Produit supprimé avec succès");
    } catch (error) {
        console.error("Erreur lors de la suppression du produit:", error);
        throw new Error("Impossible de supprimer le produit");
    }
}

/**
 * Met à jour le stock d'un produit
 * @param id - L'ID du produit
 * @param newQuantity - La nouvelle quantité en stock
 */
export async function updateProductStock(id: string, newQuantity: number): Promise<void> {
    try {
        await updateProduct(id, { qteStock: newQuantity });
        console.log("Stock mis à jour avec succès");
    } catch (error) {
        console.error("Erreur lors de la mise à jour du stock:", error);
        throw new Error("Impossible de mettre à jour le stock");
    }
}
