import { DataTable } from '@/components/DataTable'
import React from 'react'
import { dataStock, stockColumns } from './columns'
import { StockForm } from '@/components/StockForm'
import DataSheetStock from '@/components/DataSheetStock'



const Stock = () => {
  return (
    <div className='my-10 w-full px-10'>
        <div className='flex items-center justify-between mb-6'>
            <h2 className='mt-4 font-bold text-xl text-gray-900'>Listes des Stocks</h2>  
            <DataSheetStock
              title='Ajouter un nouveau Stock'
              triggerLabel='Nouveau Stock'
            >
              <StockForm />
            </DataSheetStock>
        </div>
        <div className='mt-8 w-full'>
            <DataTable 
              columns={stockColumns}
              data={dataStock}
              filterColumn='nameStock'
            />
        </div>

    </div>
  )
}

export default Stock