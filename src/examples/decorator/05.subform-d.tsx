import { useForm, required, formItem, label, rules, subForm } from '@by-l/react-form';
import { Button, Input } from 'antd'
import { FullName } from '../compoment/FullName';
import { FormItem } from '../compoment/FormItem';
import { msg } from '../utils';

class ConfigImpl {

  @formItem(<Input placeholder='title' />)
  @label('标题')
  @rules(required('title不能为空'))
  title: string

  @subForm(<FullName />)
  @label('姓名')
  fullName: string

  @formItem(<Input placeholder='other' />)
  @label('other')
  other: string
}


export default () => {

  const form = useForm({
    config: ConfigImpl,
    onSuccess: data => msg(data),
    onFail: err => msg(err),
  })

  const formItems = form.items.map(item => (
    <FormItem
      key={item.name}
      label={item.label}
      formItem={item.formItem}
      error={item.error}
    />
  ))

  return <>
    {formItems}
    <Button className='m-l' type='primary' onClick={form.submit} >submit</Button>
  </>
}