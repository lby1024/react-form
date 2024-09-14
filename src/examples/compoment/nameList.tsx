import { ListConfig, useFormList } from '@by-l/react-form';
import { Button, Flex } from 'antd'
import { FullName } from './FullName';
import { ListItem } from './ListItem';
import { FC, useEffect } from 'react';

export const nameListConfig: ListConfig = {
  subForm: <FullName />,
};

interface NameListProps {
  value?: any,
  onChange?: Function,
  father?: any
}

export const NameList: FC<NameListProps> = (props) => {

  const form = useFormList({
    father: props.father,
    config: nameListConfig,
    onChange: props.onChange
  })

  useEffect(() => {
    form.setFormList(props.value)
  }, [props.value])

  const formItems = form.items.map((item, i) => (
    <ListItem
      key={item.name}
      formItem={item.formItem}
      error={item.error}
      onDelete={() => form.remove(i)}
    />
  ))

  return (
    <Flex vertical gap={32} style={{ width: 300 }}>
      {formItems}
      <Button onClick={() => form.push()} >添加</Button>
    </Flex>
  )
}
