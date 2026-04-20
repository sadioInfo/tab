import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

interface StatCardProps {
    title: string
    description: string
    content: string | number
    icon?: React.ReactNode
    classNameCard?: string
    classNameContent?: string
    classNameDes?: string
}

const StatCard = ({
    title, description, content, icon, classNameCard, classNameContent, classNameDes
}: StatCardProps) => {
  return (
    <Card className={`w-full ${classNameCard ?? ""}`}>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription className={`${classNameDes ?? ""}`}>{description}</CardDescription>
            {icon && <CardAction>{icon} </CardAction>}
        </CardHeader>
        <CardContent className={`${classNameContent ?? ""}`}>
            {content}
        </CardContent>
    </Card>
  )
}

export default StatCard