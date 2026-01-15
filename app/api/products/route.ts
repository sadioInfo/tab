import { NextRequest, NextResponse } from "next/server";
import { addProduct, getAllProducts } from "@/lib/services/productService";
import { ProductInput } from "@/type/product";

/**
 * GET /api/products - Récupère tous les produits
 */
export async function GET() {
    try {
        const products = await getAllProducts();
        console.log("products products ::::: ", products)
        return NextResponse.json({ success: true, data: products });
    } catch (error) {
        console.error("Erreur API GET /products:", error);
        return NextResponse.json(
            { success: false, error: "Erreur lors de la récupération des produits" },
            { status: 500 }
        );
    }
}

/**
 * POST /api/products - Ajoute un nouveau produit
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log("body data from post endpoint", body);

        // Validation basique
        if (!body.nameProduct || !body.stock || body.price === undefined) {
            return NextResponse.json(
                { success: false, error: "Champs requis manquants" },
                { status: 400 }
            );
        }

        const productInput: ProductInput = {
            nameProduct: body.nameProduct,
            stock: body.stock,
            price: body.price,
            qteStock: body.qteStock || 0,
            qteMin: body.qteMin || 0,
            status: body.status !== undefined ? body.status : true
        };


        const productId = await addProduct(productInput);

        console.log("productInput emoji 🥳", productInput);
        console.log("productId emoji 🥳", productId);

        return NextResponse.json(
            { success: true, data: { id: productId } },
            { status: 201 }
        );
    } catch (error) {
        console.error("Erreur API POST /products:", error);
        return NextResponse.json(
            { success: false, error: "Erreur lors de l'ajout du produit" },
            { status: 500 }
        );
    }
}
