import { NextRequest, NextResponse } from "next/server";
import { addStock, getAllStocks } from "@/lib/services/stockService";
import { StockInput } from "@/type/stock";

/**
 * GET /api/stocks - Récupère tous les stocks
 */
export async function GET() {
    try {
        const stocks = await getAllStocks();
        return NextResponse.json({ success: true, data: stocks });
    } catch (error) {
        console.error("Erreur API GET /stocks:", error);
        return NextResponse.json(
            { success: false, error: "Erreur lors de la récupération des stocks" },
            { status: 500 }
        );
    }
}

/**
 * POST /api/stocks - Ajoute un nouveau stock
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validation basique
        if (!body.nameStock || !body.location) {
            return NextResponse.json(
                { success: false, error: "Champs requis manquants" },
                { status: 400 }
            );
        }

        const stockInput: StockInput = {
            nameStock: body.nameStock,
            location: body.location
        };

        const stockId = await addStock(stockInput);

        return NextResponse.json(
            { success: true, data: { id: stockId } },
            { status: 201 }
        );
    } catch (error) {
        console.error("Erreur API POST /stocks:", error);
        return NextResponse.json(
            { success: false, error: "Erreur lors de l'ajout du stock" },
            { status: 500 }
        );
    }
}
