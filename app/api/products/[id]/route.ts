import { NextRequest, NextResponse } from "next/server";
import { getProduct, updateProduct, deleteProduct } from "@/lib/services/productService";
import { ProductUpdate } from "@/type/product";

/**
 * GET /api/products/[id] - Récupère un produit par ID
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const product = await getProduct(id);

        if (!product) {
            return NextResponse.json(
                { success: false, error: "Produit non trouvé" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: product });
    } catch (error) {
        console.error("Erreur API GET /products/[id]:", error);
        return NextResponse.json(
            { success: false, error: "Erreur lors de la récupération du produit" },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/products/[id] - Met à jour un produit
 */
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const updates: ProductUpdate = {};
        if (body.nameProduct !== undefined) updates.nameProduct = body.nameProduct;
        if (body.stock !== undefined) updates.stock = body.stock;
        if (body.price !== undefined) updates.price = body.price;
        if (body.qteStock !== undefined) updates.qteStock = body.qteStock;
        if (body.qteMin !== undefined) updates.qteMin = body.qteMin;
        if (body.status !== undefined) updates.status = body.status;

        await updateProduct(id, updates);

        return NextResponse.json({ success: true, message: "Produit mis à jour" });
    } catch (error) {
        console.error("Erreur API PATCH /products/[id]:", error);
        return NextResponse.json(
            { success: false, error: "Erreur lors de la mise à jour du produit" },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/products/[id] - Supprime un produit
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await deleteProduct(id);

        return NextResponse.json({ success: true, message: "Produit supprimé" });
    } catch (error) {
        console.error("Erreur API DELETE /products/[id]:", error);
        return NextResponse.json(
            { success: false, error: "Erreur lors de la suppression du produit" },
            { status: 500 }
        );
    }
}
