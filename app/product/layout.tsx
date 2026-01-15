import { ProductProvider } from '@/lib/hooks/product'
import React from 'react'

export default function Layout({children} : {children : React.ReactNode}){
    return (
        <ProductProvider>
            <div>
                {children}
            </div>
        </ProductProvider>
    )
}