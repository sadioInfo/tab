import React from 'react'
import { HiArrowCircleUp } from "react-icons/hi";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { statsData } from '@/data/data';
import StatCard from './StatCard';

const HomeCard = () => {
  return (
    <div className='mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2'>
        {statsData.map((stat, i) =>(
            <StatCard 
                key={i}
                title={stat.title}
                description={stat.description}
                content={stat.content}
                icon={stat.icon}
                classNameCard={stat.classNameCard}
                classNameContent={stat.classNameContent}
                classNameDes={stat.classNameDes}
            />
        ))}
    </div>
  )
}

export default HomeCard