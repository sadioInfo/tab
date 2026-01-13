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

export const dataStock: Stock[] = [
  {
    id: "m5gr84i9",
    nameStock: "Matam",
    location: "Centre",
  },
  {
    id: "m5gr84i9",
    nameStock: "Matam",
    location: "Centre",
  },
  {
    id: "m5gr84i9",
    nameStock: "Matam",
    location: "Centre",
  },
  {
    id: "m5gr84i9",
    nameStock: "Matam",
    location: "Centre",
  },
  {
    id: "m5gr84i9",
    nameStock: "Matam",
    location: "Centre",
  },
]

export type Stock = {
  id: string
  nameStock: string
  location: string
 
}

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
        <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Modifier</DropdownMenuItem>
          <DropdownMenuItem>Supprimer</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
