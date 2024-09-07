import { useForm, required, Config } from '@lby/react-form';
import { Button, Input, Select } from 'antd'
import { FormItem } from './compoment/FormItem';
import { msg } from './utils';

const config: Config = {
  nickName: {
    label: '昵称',
    formItem: <Input placeholder='nick name' />,
    rules: [required()],
  },
  gender: {
    label: '性别',
    formItem: <Gender />,
    rules: [required()]
  },
  other: {
    label: '其他',
    formItem: <Input placeholder='other' />,
    show: (form: any) => form['gender'] === 'other',
    rules: [required()]
  }
}

const initialValue = {
  nickName: 'Musk',
  gender: 'male'
}

export default () => {

  const { items, submit, setFormData } = useForm({
    initialValue,
    config,
    onSuccess: data => msg(data),
    onFail: err => msg(err),
    onChange
  })

  function fill() {
    setFormData({
      nickName: 'Elon Musk',
      gender: 'other',
      other: 'AI'
    })
  }
  /**
   * 如果gender发生变化就修改nickName
   */
  function onChange(form: any, name: string) {
    if (name !== 'gender') return
    const v = form[name]
    if (v === 'female') setFormData({ nickName: 'lily👩🏻' })
    if (v === 'male') setFormData({ nickName: 'tom👨🏻' })
    if (v === 'other') setFormData({ nickName: 'siri😅' })
  }

  function reset() {
    setFormData(initialValue)
  }

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
      <div className='m-l'>
        <Button type='primary' onClick={submit} >submit</Button>
        <Button onClick={reset} >reset</Button>
        <Button type='link' onClick={fill} >fill</Button>
      </div>
    </div>
  )
}

function Gender(props: any) {

  return <Select
    {...props}
    style={{ width: 180 }}
    placeholder="Select a option and change input text above"
    allowClear
  >
    <Select.Option value="male">male</Select.Option>
    <Select.Option value="female">female</Select.Option>
    <Select.Option value="other">other</Select.Option>
  </Select>
}

