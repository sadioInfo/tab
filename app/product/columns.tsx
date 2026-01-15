"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Product } from "@/type/product"
import Actions from "@/components/Actions"


export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
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
      return <Actions product={row.original} />   
    }
    
  },
]
