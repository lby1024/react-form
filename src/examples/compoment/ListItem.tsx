import { Button, Flex } from "antd"
import { FC } from "react"

interface ListItemProps {
  formItem?: any,
  error?: any,
  onDelete: any
}

export const ListItem: FC<ListItemProps> = ({ formItem, error, onDelete }) => {
  return (
    <Flex className='item' data-err={error} align='center' gap={3} >
      {formItem}
      <Button onClick={onDelete} size='small' style={{ color: '#999' }} type='text' >删除</Button>
    </Flex>
  )
}