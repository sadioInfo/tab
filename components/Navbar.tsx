'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type MenuItem = {
    label: string;
    href: string;
}

const menuItems: MenuItem[] = [
    {label: 'Accueil', href: '/'},
    {label: 'Articles', href: '/product'},
    {label: 'Stock', href: '/stock'},
];

const Navbar = () => {
  return (
    <header className='w-full bg-white shadow-md'>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href={'/'} className='flex items-center gap-2'>
            <Image
                  src={'/images/logo.png'}
                  alt='Logo'
                  width={60}
                  height={60}
                  priority
            />
            <span className='text-lg font-semibold text-gray-900'>TAB</span>
          </Link>
          <ul className='flex items-center gap-6 uppercase font-semibold'>
            {menuItems.map((item) => (
                <li 
                key={item.href}
                className='text-sm font-medium text-gray-700 hover:text-gray-900'>
                    <Link href={item.href} >{item.label} </Link>
                </li>
            ))}
          </ul>
          
      </nav>
    </header>
  )
}

export default Navbar