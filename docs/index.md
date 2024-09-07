---
hero:
  title: react-form
  description: 用装饰器风格构建表单
  actions:
    - text: 立即上手
      link: /enties/01-start
    - text: GitHub
      link: https://github.com/lby1024/react-form
---

```js

class Form {
  @label('昵称')
  @FormItem(<Input />)
  @rules(required, nickName)
  name
}

```