import { notFound } from 'next/navigation'
import { dataProduct } from '../data'
import Link from 'next/link'

// interface ProductDetailPageProps {
//   params: {
//     id: string
//   }
// }

export default async function ProductDetailPage({ params }: {params: Promise<{slug: string}>}) {
    

  // Trouver le produit par son ID
  
    const {slug} = await params
    console.log("produit ", dataProduct)
  
    const product = dataProduct.find((p) => p.id === slug)
    console.log("produit:", product)
    
    //   Si produit non trouvé, afficher page 404
    if (!product) {
        notFound()
    }
  
//   Formater le prix
  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
  }).format(product.price)

  console.log("prix", formattedPrice)
  

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-xl font-bold mb-6">Détails du Produit {product.id} </h1>
      
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl ml-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Informations Générales</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">ID</p>
                <p className="font-medium">{product.id}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Article</p>
                <p className="font-medium text-lg">{product.nameProduct}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Prix</p>
                <p className="font-bold text-green-700">{formattedPrice} GNF</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Nom du Stock</p>
                <p className="font-medium">{product.stock}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Stock et État</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Quantité en Stock</p>
                <p className="font-medium text-blue-700">{product.qteStock}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Quantité Minimale</p>
                <p className="font-medium text-amber-700">{product.qteMin}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">État</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.status 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {product.status ? "✅ En stock" : "❌ Rupture de stock"}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Vendre le Produit
            </button>
            <Link
                href={"/product"}
             className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
             
            >
              Retour à la liste
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

