import { useForm, required, min, password, email, Config } from '@lby/react-form';
import { Button, Input } from 'antd'
import { msg } from './utils';
import { FormItem } from './compoment/FormItem';

const config: Config = {
  email: {
    label: '邮箱',
    formItem: <Input placeholder='e-mail' />,
    rules: [required(), email()],
  },
  parssword: {
    label: '密码',
    formItem: <Input placeholder='password' type='password' />,
    rules: [required(), min(6), password()]
  },
  reparssword: {
    label: '重复密码',
    formItem: <Input placeholder='password' type='password' />,
    rules: [reparssword]
  }
}

export default () => {

  const { items, submit } = useForm({
    config,
    onSuccess: data => msg(data),
    onFail: err => msg(err)
  })

  const formItems = items.map(item => (
    <FormItem
      key={item.name}
      label={item.label}
      error={item.error}
      formItem={item.formItem}
    />
  ))

  return (
    <div>
      {formItems}
      <Button className='m-l' onClick={submit} >注册</Button>
    </div>
  )
}

function reparssword(v: string, form: any) {

  if (form['parssword'] !== form['reparssword']) {
    throw '密码不一致'
  }
}

