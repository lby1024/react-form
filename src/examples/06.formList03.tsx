import { ListConfig, min, required, useFormList } from '@lby/react-form';
import { Button, Flex, Input } from 'antd'
import { msg } from './utils';
import { ListItem } from './compoment/ListItem';

const config: ListConfig = {
  formItem: <Input placeholder='placeholder...' />,
}

export default () => {

  const { items, submit, push, unshift, remove, error } = useFormList({
    config,
    onSuccess: (res: any) => msg(res),
    onFail: (err: string) => msg(err),
  })

  const formItems = items.map((item, i) => (
    <ListItem
      key={item.name}
      {...item}
      onDelete={() => remove(i)}
    />
  ))


  return (
    <Flex vertical gap={32} style={{ width: 300 }}>
      {formItems}
      <Button onClick={submit} type='primary' >submit</Button>
      <Button onClick={() => push()} >add</Button>
      <Button onClick={() => unshift()} >add at head</Button>
      <div className='err'>{error}</div>
    </Flex>
  )
}
