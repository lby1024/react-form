import { useForm, required, Config } from '@lby/react-form';
import { Button, Flex, Input } from 'antd'
import { msg } from './utils';

const config: Config = {
  email: {
    label: '邮箱',
    formItem: <Input placeholder='e-mail' />,
    rules: [required('请填写邮箱')],
  },
  parssword: {
    label: '密码',
    formItem: <Input placeholder='password' type='password' />,
    rules: [required('请填写密码')]
  }
}

export default () => {

  const { items, submit } = useForm({
    config,
    onSuccess: data => msg(data),
    onFail: err => msg(err)
  })

  return (
    <Flex vertical gap={21} style={{ width: 300 }}>
      {
        items.map(item => item.formItem)
      }
      <Button onClick={submit} >登录</Button>
    </Flex>
  )
}
