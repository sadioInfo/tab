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

export type Product = {
  id: string
  nameProduct: string,
  stock: string,
  price: number,
  qteStock: number,
  qteMin: number,
  status: boolean
}

export const dataProduct: Product[] = [
  {
    id: "1",
    nameProduct: "🛌 Chambre Complet",
    stock: "Matam",
    price: 8000000,
    qteStock: 100,
    qteMin: 5,
    status: true
  },
  {
    id: "2",
    nameProduct: "🍽️ Table bureau",
    stock: "Lambanyi",
    price: 5000000,
    qteStock: 2,
    qteMin: 5,
    status: false
  },
  {
    id: "3",
    nameProduct: "🏯 Salon",
    stock: "Matam",
    price: 10000000,
    qteStock: 180,
    qteMin: 5,
    status: true
  },
  {
    id: "4",
    nameProduct: "🪑Armoir",
    stock: "Dixinn",
    price: 3000000,
    qteStock: 50,
    qteMin: 5,
    status: true
  },
  {
    id: "5",
    nameProduct: " 👌Chambre Simple",
    stock: "Matam",
    price: 6000000,
    qteStock: 100,
    qteMin: 5,
    status: true
  },
]



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
        {status ? "En stock" : "Rupture"}
        </span>
      )
    }
  },
  {
    id: "actions",
    cell: ({row}) => {
      const product = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem><CiEdit /> Modifier</DropdownMenuItem>
            <DropdownMenuItem><MdDelete className="text-red-800" /> Supprimer</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointor">
              <Link href={`/product/${product.id}`}>
                <FaEye /> Voir plus
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
    
  },
]
