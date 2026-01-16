'use client'

import { Stock } from "@/type/stock"
import { createContext, useContext, useState } from "react"

interface StockContextValue {
    stock: Stock | null
    setStock: React.Dispatch<React.SetStateAction<Stock | null>>
    isEditing: boolean
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
       
}

const StockContext = createContext<StockContextValue | undefined>(undefined)

export const useStockContext = (): StockContextValue => {
    const context = useContext(StockContext)
    if(!context){
        throw new Error("StockContext doit être utiliser dans un StockContextProvider")
    }
    return context
}

interface StockProviderProps{
    children: React.ReactNode
}

export const StockProvider: React.FC<StockProviderProps> = ({children}) =>{
    const [stock, setStock] = useState<Stock | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    return <StockContext.Provider value={{
        stock: stock,
        isEditing: isEditing,
        setStock: setStock,
        setIsEditing: setIsEditing,
    }}>
        {children}
    </StockContext.Provider>
}


