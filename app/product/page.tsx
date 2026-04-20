import { DataTable } from '@/components/DataTable'
import React from 'react'
import { ProductForm } from '@/components/ProductForm'
import { productColumns } from './columns'
import { getAllProducts } from '@/lib/services/productService'
import DataSheetProduct from '@/components/DataSheetProduct'
import { BsFillPrinterFill } from 'react-icons/bs'



const Product = async () => {
  // Récupérer les produits depuis Firestore
  const products = await getAllProducts()

  return (
    <div className='my-10 w-full px-10'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='mt-4 font-bold text-xl text-gray-900'>Listes des Articles</h2>
        <div className='flex flex-row gap-2'>
          <button className='px-4 py-2 flex hover:cursor-pointer hover:bg-gray-200 uppercase font-semibold text-xs flex-row items-center gap-2 text-red-600 border-1 border-red-600 rounded-md'>
            <BsFillPrinterFill /> <span>Imprimer</span>
          </button>
          <DataSheetProduct
            title='Ajouter un nouveau article '
            triggerLabel='Nouveau Article'
          >
            <ProductForm />
          </DataSheetProduct>
        </div>
      </div>
      <div className='mt-8 w-full'>
        <DataTable
          columns={productColumns}
          data={products}
          filterColumn='stock'
        />
      </div>

    </div>
  )
}

export default Product