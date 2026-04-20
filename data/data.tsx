import { HiArrowCircleUp } from "react-icons/hi"
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

export const statsData = [
  {
    title: "Total Vente",
    description: "Nombre total de vente",
    content: 385,
    icon: <HiOutlineShoppingCart className="text-5xl text-white" />,
    classNameCard: "bg-blue-900 text-white",
    classNameContent: "flex item-center justify-center text-3xl font-bold uppercase",
    classNameDes: "text-gray-300 text-xs",
  },
  {
    title: "Total Solde",
    description: "entré & sortie d argent",
    content: "267 000 000 GNF",
    icon: <FaMoneyCheckAlt  className="text-5xl text-white" />,
    classNameCard: "bg-green-800 text-white",
    classNameContent: "flex item-center justify-center text-3xl font-bold uppercase",
    classNameDes: "text-gray-300 text-xs",

  },
  {
    title: "Total Article",
    description: "Nombre d'article disponible",
    content: 8957,
    icon: <FaProductHunt  className="text-5xl text-blue-900" />,
    classNameCard: "border-blue-900",
    classNameContent: "flex item-center justify-center text-3xl text-blue-900 font-bold uppercase",
    classNameDes: "",

  },
  {
    title: "Total Stock",
    description: "Nombre de stocks disponible",
    content: 12,
    icon: <HiOutlineOfficeBuilding  className="text-5xl text-green-800" />,
    classNameCard: "border-green-800",
    classNameContent: "flex item-center justify-center text-3xl text-green-800 font-bold uppercase",
    classNameDes: "",

  },
]
