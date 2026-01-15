'use client'

import { Product } from "@/type/product"
import { createContext, useContext, useState } from "react"

interface ProductContextValue {
    product: Product | null
    setProduct: React.Dispatch<React.SetStateAction<Product | null>>
    isEditing: boolean
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
       
}

const ProductContext = createContext<ProductContextValue | undefined>(undefined)

export const useProductContext = (): ProductContextValue => {
    const context = useContext(ProductContext)
    if(!context){
        throw new Error("ProductContext doit être utiliser dans un ProductContextProvider")
    }
    return context
}

interface ProductProviderProps{
    children: React.ReactNode
}

export const ProductProvider: React.FC<ProductProviderProps> = ({children}) =>{
    const [product, setProduct] = useState<Product | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    return <ProductContext.Provider value={{
        product: product,
        isEditing: isEditing,
        setProduct: setProduct,
        setIsEditing: setIsEditing,
    }}>
        {children}
    </ProductContext.Provider>
}


