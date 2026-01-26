import { NextRequest, NextResponse } from "next/server";
import { getStock, updateStock, deleteStock } from "@/lib/services/stockService";
import { StockUpdate } from "@/type/stock";

/**
 * GET /api/stocks/[id] - Récupère un stock par ID
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const stock = await getStock(id);

        if (!stock) {
            return NextResponse.json(
                { success: false, error: "Stock non trouvé" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: stock });
    } catch (error) {
        console.error("Erreur API GET /stocks/[id]:", error);
        return NextResponse.json(
            { success: false, error: "Erreur lors de la récupération du stock" },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/stocks/[id] - Met à jour un stock
 */
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const updates: StockUpdate = {};
        if (body.nameStock !== undefined) updates.nameStock = body.nameStock;
        if (body.location !== undefined) updates.location = body.location;

        await updateStock(id, updates);

        return NextResponse.json({ success: true, message: "Stock mis à jour" });
    } catch (error) {
        console.error("Erreur API PATCH /stocks/[id]:", error);
        return NextResponse.json(
            { success: false, error: "Erreur lors de la mise à jour du stock" },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/stocks/[id] - Supprime un stock
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await deleteStock(id);

        return NextResponse.json({ success: true, message: "Stock supprimé" });
    } catch (error) {
        console.error("Erreur API DELETE /stocks/[id]:", error);
        return NextResponse.json(
            { success: false, error: "Erreur lors de la suppression du stock" },
            { status: 500 }
        );
    }
}
