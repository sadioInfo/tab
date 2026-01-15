'use client'
import React from 'react'
import { RiDeleteBinLine, RiEdit2Line, RiEyeLine } from 'react-icons/ri'
import { useRouter } from 'next/navigation'
import { useProductContext } from '@/lib/hooks/product'
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
import Link from 'next/link'
import { Product } from '@/type/product'


function Actions({product}: {product : Product}) {
  
    const router = useRouter();
    const { setProduct, setIsEditing } = useProductContext();

    const handleEditClick = () => {
        setProduct(product)
        setIsEditing(true)
    }
  return (
    <div className="flex items-center justify-center space-x-2">
              <Link href={`/product/${product.id}`}>
                <RiEyeLine className="w-5 h-5 cursor-pointer text-gray-500" />
              </Link>
              <button  onClick={handleEditClick}
               >
                <RiEdit2Line className="w-5 h-5 cursor-pointer text-gray-500" />
              </button>
              <AlertDialog>
                <AlertDialogTrigger><RiDeleteBinLine className="w-5 h-5 text-red-600 cursor-pointer"  /></AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader className="flex flex-col space-y-2 items-center justify-center">
                    <AlertDialogTitle>Etes-vous absolument sûr ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Vous ne pourrez pas revenir en arrière!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-white bg-red-600">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="text-white bg-blue-900">Supprimer</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

          </div>
    
  )
}

export default Actions