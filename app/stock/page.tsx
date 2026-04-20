import { DataTable } from '@/components/DataTable'
import React from 'react'
import { stockColumns } from './columns'
import { StockForm } from '@/components/StockForm'
import DataSheetStock from '@/components/DataSheetStock'
import { getAllStocks } from '@/lib/services/stockService'
import { BsFillPrinterFill } from "react-icons/bs";



const Stock = async () => {
  const stocks = await getAllStocks()

  return (
    <div className='my-10 w-full px-10'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='mt-4 font-bold text-xl text-gray-900'>Listes des Stocks</h2>
        <div className='flex flex-row gap-2'>
          <button className='px-4 py-2 flex hover:cursor-pointer hover:bg-gray-200 uppercase font-semibold text-xs flex-row items-center gap-2 text-red-600 border-1 border-red-600 rounded-md'>
            <BsFillPrinterFill /> <span>Imprimer</span>
          </button>
          <DataSheetStock
            title='Ajouter un nouveau Stock'
            triggerLabel='Nouveau Stock'
          >
            <StockForm />
          </DataSheetStock>
        </div>
      </div>
      <div className='mt-8 w-full'>
        <DataTable
          columns={stockColumns}
          data={stocks}
          filterColumn='nameStock'
        />
      </div>

    </div>
  )
}

export default Stock