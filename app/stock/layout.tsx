import { StockProvider } from '@/lib/hooks/stock'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <StockProvider>
            <div>
                {children}
            </div>
        </StockProvider>
    )
}
