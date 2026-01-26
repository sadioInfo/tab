"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Stock } from "@/type/stock"
import StockActions from "@/components/StockActions"





export const stockColumns: ColumnDef<Stock>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "nameStock",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Nom Stock
      </Button>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <StockActions stock={row.original} />
    }
  },
]
