import { FormListConfig, useFormList } from '@lby/react-form';
import { Button, Card, Flex } from 'antd'
import { msg } from './utils';
import { ClassForm } from './compoment/ClassForm';

const config: FormListConfig = {
  subForm: <ClassForm />,
};

export default () => {

  const { items, submit, push, remove } = useFormList({
    config,
    onSuccess: (res: any) => msg(res),
    onFail: (err: string) => msg(err),
  })

  const formItems = items.map((item, i) => (
    <Card
      key={item.name}
      extra={<Button type='link' onClick={() => remove(i)} >移除</Button>}>
      {item.formItem}
    </Card>
  ))

  return (
    <Flex vertical gap={32} style={{ width: 500 }}>
      {formItems}
      <Button onClick={submit} type='primary' >submit</Button>
      <Button onClick={() => push()} >add</Button>
    </Flex>
  )

}
