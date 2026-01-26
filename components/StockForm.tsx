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
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useStockContext } from "@/lib/hooks/stock"
import toast from "react-hot-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit avoir au moyen 2 caractere.",
  }),
  location: z.string().min(2, {
    message: "L adresse doit avoir au moyen 2 caractere.",
  }),
})

interface StockFormProps {
  onClose?: () => void
}

export function StockForm({ onClose }: StockFormProps) {
  const router = useRouter()
  const { stock, isEditing } = useStockContext()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: ""
    },
  })

  // Effet pour pré-remplir le formulaire en mode édition
  useEffect(() => {
    if (stock && isEditing) {
      form.reset({
        name: stock.nameStock,
        location: stock.location
      })
    } else {
      form.reset({
        name: "",
        location: ""
      })
    }
  }, [stock, isEditing, form])

  // 2. fonction enregistrer.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const stockData = {
        nameStock: values.name,
        location: values.location
      }

      if (isEditing && stock) {
        // Mode ÉDITION - Appel API PATCH
        const response = await fetch(`/api/stocks/${stock.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(stockData)
        })

        const result = await response.json()

        if (result.success) {
          toast.success('✅ Stock modifié avec succès!')
          form.reset()
          if (onClose) onClose()
          router.refresh()
        } else {
          toast.error('❌ Erreur lors de la modification')
        }
      } else {
        // Mode CRÉATION - Appel API POST
        const response = await fetch('/api/stocks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(stockData)
        })

        const result = await response.json()

        if (result.success) {
          toast.success('✅ Stock créé avec succès!')
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
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    form.reset()
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className="mx-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          {isEditing ? "Modifier le Stock" : "Nouveau Stock"}
        </h2>
        {isEditing && stock && (
          <p className="text-sm text-gray-500 mt-1">ID: {stock.id}</p>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom Stock</FormLabel>
                <FormControl>
                  <Input placeholder="entrer le nom ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse Stock</FormLabel>
                <FormControl>
                  <Input placeholder="entrer l'adresse ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-x-3 flex justify-end">
            <Button type="button" variant="outline" onClick={handleCancel}>Annuler</Button>
            <Button
              className="bg-blue-900"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}