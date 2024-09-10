import React, { FC } from "react"
import { Button, Card } from 'antd'


interface MyCardProps {
  formItem?: any,
  onDelete: any
}

export const MyCard: FC<MyCardProps> = ({ formItem, onDelete }) => {
  return (
    <Card
      extra={<Button type='link' onClick={onDelete} >移除</Button>}>
      {formItem}
    </Card>
  )
}