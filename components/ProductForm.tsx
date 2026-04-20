"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useProductContext } from "@/lib/hooks/product"
import toast from "react-hot-toast"
import { Stock } from "@/type/stock"



const formSchema = z.object({
  nameProduct: z.string().min(2, {
    message: "Le nom du produit doit contenir au moins 2 caractères.",
  }),

  nameStock: z.string().nonempty({
    message: "Veuillez sélectionner un stock.",
  }),

  price: z.string().min(1, {
    message: "Le prix est requis.",
  }).refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Le prix doit être supérieur à 0.",
  }),
  qteStock: z.string().refine((val) => val === "" || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0), {
    message: "La quantité doit être un nombre valide.",
  }),
  qteMin: z.string().refine((val) => val === "" || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0), {
    message: "La quantité minimale doit être un nombre valide.",
  }),
})

interface ProductFormProps {
  onClose?: () => void

}


export function ProductForm({onClose}: ProductFormProps) {
  const router = useRouter()
  const {product, isEditing} = useProductContext()
  const [isSubmitting, setIsSubmittiong] = useState(false)
  const [stocks, setStocks] = useState<Stock[]>([])
  const [loadingStocks, setLoadingStocks] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameProduct: "",
      nameStock: "",
      price: "",
      qteStock: "",
      qteMin: "",
    },
  })

  // recuperation de tout les stock
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await fetch("/api/stocks")
        const result = await res.json()
        if(result.success){
          setStocks(result.data)
        }
      } catch (error) {
        console.error("Erreur chargement stocks", error)
        
      }finally{
        setLoadingStocks(false)
      }
    }
    fetchStocks()
  },[])
  console.log("Stocks", stocks)


  

  // Effet pour remplir le formulaire avec les données du produit
  useEffect(() =>{
    if(product && isEditing){
      form.reset({
        nameProduct: product.nameProduct,
        nameStock: product.stock,
        price: product.price.toString(),
        qteStock: product.qteStock.toString(),
        qteMin: product.qteMin.toString(),

      })
    }else{
      form.reset({
        nameProduct: "",
        nameStock: "",
        price: "",
        qteStock: "",
        qteMin: "",
      })
    }
  }, [product, isEditing, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmittiong(true)
    console.log("en cours d ajout")
    

    try {
      const productData = {
        nameProduct: values.nameProduct,
        stock: values.nameStock,
        price: parseFloat(values.price),
        qteStock: values.qteStock ? parseFloat(values.qteStock) : 0,
        qteMin: values.qteMin ? parseFloat(values.qteMin) : 0,
        status: true
      }

      if (isEditing && product) {
        // Mode ÉDITION - Appel API PATCH
        const response = await fetch(`/api/products/${product.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData)
        })

        const result = await response.json()

        if (result.success) {
          toast.success('✅ Produit modifié avec succès!')
          form.reset()
          if (onClose) onClose()
          router.refresh()
        } else {
          toast.error('❌ Erreur lors de la modification')
        }
      } else {
        // Mode CRÉATION - Appel API POST
        console.log("mode ajout")
        
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData)
        })

        const result = await response.json()
        console.log("result: ", result)
        

        if (result.success) {
          toast.success('✅ Produit créé avec succès!')
          form.reset()
          if (onClose) onClose()
          router.refresh()
        } else {
          toast.error('❌ Erreur lors de la création')
        }
      }
    } catch (error) {
      console.error('Erreur:', error)
      toast.error('❌ Une erreur est survenue')
    } finally {
      setIsSubmittiong(false)
    }
  }

  // gestion de l'annulation
  const handleCancel = () =>{
    form.reset()
    if(onClose){
      onClose()
    }
  } 

  return (
    <div className="mx-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              {isEditing ? "Modifier le produit" : "Nouveau produit"}
            </h2>
            {product && (
              <p className="text-sm text-gray-500 mt-1">
                ID: {product.id}
              </p>
            )}
          </div>
          {/* Nom produit */}
          <FormField
            control={form.control}
            name="nameProduct"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l&apos;Article</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: chambre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Select Stock */}
          <FormField
            control={form.control}
            name="nameStock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un stock" />
                    </SelectTrigger>
                  </FormControl>
                    <SelectContent>
                      {loadingStocks ? (
                        <SelectItem value="loading" disabled>
                          Chargement...
                        </SelectItem>
                      ) : stocks.length === 0 ? (
                        <SelectItem value="empty" disabled>
                          Aucun stock disponible
                        </SelectItem>
                      ) : (
                        stocks.map((stock) => (
                          <SelectItem key={stock.id} value={stock.nameStock}>
                            {stock.nameStock}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Prix */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Ex: 10 000 000"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Quantité en stock */}
          <FormField
            control={form.control}
            name="qteStock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantité en stock</FormLabel>
                <FormControl>
                 <Input
                    type="number"
                    min="0"
                    placeholder="Ex: 100"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Quantité minimale */}
          <FormField
            control={form.control}
            name="qteMin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantité minimale</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Ex: 5 "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Actions */}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Annuler
            </Button>
            <Button type="submit" className="bg-blue-900" disabled={isSubmitting}>
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>

        </form>
      </Form>
    </div>
  )
}
