---
hero:
  title: react-form
  description: 一套react表单解决方案
  actions:
    - text: 立即上手
      link: /enties/01-start
    - text: GitHub
      link: https://github.com/lby1024/react-form
---

```js
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
```