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
import { Product } from "@/app/product/columns"
import { useEffect } from "react"



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
  product?: Product | null // pour l'edition
  isEditing?: boolean // pour savoir si on est en mode E ou A
}


export function ProductForm({onClose, product, isEditing = false}: ProductFormProps) {
  const router = useRouter()

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
    }
  }, [product, isEditing, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)

    const formattedValues = {
      ...values,
      price: parseFloat(values.price),
      qteStock: values.qteStock ? parseFloat(values.qteStock) : 0,
      qteMin: values.qteMin ? parseFloat(values.qteMin) : 0,
    }

    console.log("new valeur: ", formattedValues)
    await new Promise((r) => setTimeout(r, 500))
    
    if(onClose){
      onClose()
    }
    setTimeout(() =>{
      router.push("/product")
    },100)
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
                    <SelectItem value="stock1">Stock Matam</SelectItem>
                    <SelectItem value="stock2">Stock Lambanyi</SelectItem>
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
            <Button type="submit" className="bg-blue-900">
              Enregistrer
            </Button>
          </div>

        </form>
      </Form>
    </div>
  )
}
