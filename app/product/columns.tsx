"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Product } from "@/type/product"
import ProductActions from "@/components/ProductActions"


export const productColumns: ColumnDef<Product>[] = [
  {
    id: "index",
    header: "N°",
    cell: ({row}) => row.index + 1
  },
 
  {
    accessorKey: "nameProduct",
    header: "Articles",
  },
  {
    accessorKey: "price",
    header: "Prix",
    cell: ({row}) => {
      const price = row.getValue<number>("price")
      const formattedPrice = new Intl.NumberFormat("fr-FR", {
        minimumFractionDigits: 0,
      }).format(price)
      return <span className="font-semibold">
        {formattedPrice} GNF
      </span>
    }
  },
  {
    accessorKey: "stock",
    header: "Nom Stock",
  },
  {
    accessorKey: "qteStock",
    header: "Quantité Total",
  },
  {
    accessorKey: "qteMin",
    header: "Quantité Minimal",
  },
  {
    accessorKey: "status",
    header: "Etat",
    cell: ({row}) =>{
      const status = row.getValue<boolean>("status")
      return (
        <span className={`px-2 py-1 rounded-md text-sm font-medium ${status ? "bg-green-300 text-green-900" : "bg-red-300 text-red-900"}`}>
        {status ? "En Stock" : "Rupture"}
        </span>
      )
    }
  },
  {
    id: "actions",
    cell: ({row}) => {
      return <ProductActions product={row.original} />   
    }
    
  },
]
