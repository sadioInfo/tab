import { DataTable } from '@/components/DataTable'
import React from 'react'
import DataSheet from '@/components/DataSheet'
import { ProductForm } from '@/components/ProductForm'
import { dataProduct } from './data'
import { productColumns } from './columns'



const Product = () => {
  return (
    <div className='my-10 w-full px-10'>
        <div className='flex items-center justify-between mb-6'>
            <h2 className='mt-4 font-bold text-xl text-gray-900'>Listes des Articles</h2>  
            <DataSheet
              title='Ajouter un nouveau article '
              triggerLabel='Nouveau Article'
            >
              <ProductForm />
            </DataSheet>
        </div>
        <div className='mt-8 w-full'>
            <DataTable 
              columns={productColumns}
              data={dataProduct}
              filterColumn='nameProduct'
            />
        </div>

    </div>
  )
}

export default Product