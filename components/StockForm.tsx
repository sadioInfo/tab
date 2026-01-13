"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit avoir au moyen 2 caractere.",
  }),
  location: z.string().min(2, {
    message: "L adresse doit avoir au moyen 2 caractere.",
  }),
})

// type StockFormProps = {
//     onClose: () => void
// }
// {onClose}: StockFormProps

export function StockForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: ""
    },
  })

  const router = useRouter();


  // 2. fonction enregistrer.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    
    console.log(values)
    await new Promise((r) => setTimeout(r, 500))
    // onClose()
    router.push("/stock")


  }

  

return (
    <div className="mx-6">
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
        <div className="space-x-3">
          {/* onClick={onClose} */}
        <Button type="reset" >Annuler</Button>
        <Button className="bg-blue-900" type="submit">Enregistrer</Button>
        </div>
      </form>
    </Form>
    </div>
  )
}