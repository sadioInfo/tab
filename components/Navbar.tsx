import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type MenuItem = {
    label: string;
    href: string;
}

const menuItems: MenuItem[] = [
    {label: 'Accueil', href: '/'},
    {label: 'Produit', href: '/produit'},
    {label: 'A Propos', href: '/about'},
];

const Navbar = () => {
  return (
    <nav>
       <Image 
            src={'/'}
            alt='Logo'
            width={40}
            height={40}
            priority
       />
       <span>TAB</span>
       <ul>
        {menuItems.map((item) => (
            <li key={item.href}>
                <Link href={item.href} >{item.label} </Link>
            </li>
        ))}
       </ul>
    </nav>
  )
}

export default Navbar