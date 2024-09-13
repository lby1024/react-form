---
nav: 小栗子
title: 快速开始
order: 10
toc: content
---

## 下载
```
npm i @lby/react-form
```

## 使用

```ts
import { useForm, required, formItem, label, rules } from '@lby/react-form';

class ConfigImpl {
  @formItem(<Input placeholder='e-mail' />)
  @label('邮箱')
  @rules(required('请填写邮箱'))
  email: string

  @formItem(<Input placeholder='password' type='password' />)
  @label('密码')
  @rules(required('请填写密码'))
  password: string
}

export default () => {

  const form = useForm({
    config: ConfigImpl
  })

  return (
    <div>
      { form.items.map(item => item.formItem) }
      <Button onClick={form.submit} >登录</Button>
    </div>
  )
}
```

## 实例
<code src='../../../src/examples/01.start' ></code>