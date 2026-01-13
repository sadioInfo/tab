'use client'
import React from 'react'

const Footer = () => {
  return (
    <footer className='mt-auto w-full bg-blue-950 text-gray-300'>
        <div className='mx-auto max-w-7xl px-6 py-8'>
            {/* branding */}
            <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
                <div>
                    <h2 className='text-lg font-semibold text-white'>TAB</h2>
                    <p className='mt-2 max-w-xstext-sm text-gray-400'>Meubles & Décor -- qualité et élégance pour votre intérieur</p>
                </div>
            </div>
            {/* divider  */}
            <div className='my-4 h-px border-gray-800'></div>

            {/* bottom text  */}
            <div className='flex flex-col gap-2 text-xs text-gray-500 md:flex-row md:justify-between'>
                <span>© {new Date().getFullYear()} TAB. Tous droits réservés.</span>
                <span>Conçu avec ❤️ par Sadio Info</span>
            </div>
        </div>
    </footer>
  )
}

export default Footer