'use client'
import React, { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { StockForm } from './StockForm'


type DataSheetProps = {
  triggerLabel: string
  title: string
  children: React.ReactNode
}

// Type pour les composants qui peuvent recevoir onClose
interface WithOnCloseProps {
  onClose?: () => void
}

const DataSheet = ({triggerLabel, title, children}: DataSheetProps) => {
  const [open, setOpen] = useState(false);

  //fonction pour fermer le sheet
  const handleClose = () => {setOpen(false)}

  //clonage des childrens pour leur passer la prop onClose
  const childrenWithProps = React.Children.map(children, child =>{
    if(React.isValidElement<WithOnCloseProps>(child)){
      return React.cloneElement(child, {onClose: handleClose})
    }
    return child
  })

  return (
    <div>
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className='bg-blue-900 text-xs font-bold uppercase text-gray-200 px-6 py-3 rounded-md'>
              {triggerLabel}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                <SheetTitle>{title}</SheetTitle>
                </SheetHeader>
                {childrenWithProps}
            </SheetContent>
        </Sheet>
    </div>
  )
}

export default DataSheet