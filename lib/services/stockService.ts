import {
    collection,
    addDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase/firestore";
import { Stock, StockInput, StockUpdate } from "@/type/stock";

// Nom de la collection dans Firestore
const COLLECTION_NAME = "stocks";

/**
 * Ajoute un nouveau stock dans Firestore
 * @param stock - Les données du stock à ajouter (sans ID)
 * @returns L'ID du stock créé
 */
export async function addStock(stock: StockInput): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...stock,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        return docRef.id;
    } catch (error) {
        console.error("Erreur lors de l'ajout du stock:", error);
        throw new Error("Impossible d'ajouter le stock");
    }
}

/**
 * Récupère un stock par son ID
 * @param id - L'ID du stock
 * @returns Le stock ou null s'il n'existe pas
 */
export async function getStock(id: string): Promise<Stock | null> {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                nameStock: data.nameStock,
                location: data.location
            } as Stock;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du stock:", error);
        throw new Error("Impossible de récupérer le stock");
    }
}

/**
 * Récupère tous les stocks
 * @returns Un tableau de tous les stocks
 */
export async function getAllStocks(): Promise<Stock[]> {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        const stocks: Stock[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            stocks.push({
                id: doc.id,
                nameStock: data.nameStock,
                location: data.location
            } as Stock);
        });

        return stocks;
    } catch (error) {
        console.error("Erreur lors de la récupération des stocks:", error);
        throw new Error("Impossible de récupérer les stocks");
    }
}

/**
 * Met à jour un stock existant
 * @param id - L'ID du stock à mettre à jour
 * @param updates - Les champs à mettre à jour
 */
export async function updateStock(id: string, updates: StockUpdate): Promise<void> {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du stock:", error);
        throw new Error("Impossible de mettre à jour le stock");
    }
}

/**
 * Supprime un stock
 * @param id - L'ID du stock à supprimer
 */
export async function deleteStock(id: string): Promise<void> {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Erreur lors de la suppression du stock:", error);
        throw new Error("Impossible de supprimer le stock");
    }
}
