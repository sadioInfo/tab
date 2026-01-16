'use client'
import React, { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useStockContext } from '@/lib/hooks/stock'


type DataSheetStockProps = {
  triggerLabel: string
  title: string
  children: React.ReactNode
}

// Type pour les composants qui peuvent recevoir onClose
interface WithOnCloseProps {
  onClose?: () => void
}

const DataSheetStock = ({triggerLabel, title, children}: DataSheetStockProps) => {
  const [open, setOpen] = useState(false);
  const {stock, isEditing, setIsEditing} = useStockContext()


  useEffect(()=>{
    if(isEditing){
      setOpen(true)
    }
  }, [isEditing])

  //fonction pour fermer le sheet
  const handleClose = () => {
    setOpen(false)
    setIsEditing(false)
  }

  //clonage des childrens pour leur passer la prop onClose
  const childrenWithProps = React.Children.map(children, child =>{
    if(React.isValidElement<WithOnCloseProps>(child)){
      return React.cloneElement(child, {onClose: handleClose})
    }
    return child
  })

  return (
    <div>
        <Sheet open={open} onOpenChange={(openState) =>{
          setOpen(openState)
          if(!openState){
            setIsEditing(false)
          }
        }}>
          {!isEditing && (

            <SheetTrigger className='bg-blue-900 text-xs font-bold uppercase text-gray-200 px-6 py-3 rounded-md hover:bg-blue-800'>
              {triggerLabel}
            </SheetTrigger>
          )}
            <SheetContent>
                <SheetHeader>
                <SheetTitle>
                  {isEditing && stock ? `Modifier ${stock.nameStock}`: title}
                </SheetTitle>
                </SheetHeader>
                {childrenWithProps}
            </SheetContent>
        </Sheet>
    </div>
  )
}

export default DataSheetStock