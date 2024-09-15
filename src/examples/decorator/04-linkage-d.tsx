import { required } from '@by-l/react-form/rules';
import { useForm } from '@by-l/react-form/useForm';
import {
  formItem,
  label,
  rules,
  show,
} from '@by-l/react-form/useForm/decorator';
import { Button, Input, Select } from 'antd';
import { FormItem } from '../compoment/FormItem';
import { msg } from '../utils';

class ConfigImpl {
  @formItem(<Input placeholder="nick name" />)
  @label('昵称')
  @rules(required())
  nickName: string;

  @formItem(<Gender />)
  @label('性别')
  @rules(required())
  gender: 'male' | 'female' | 'other';

  @formItem(<Input placeholder="other" />)
  @label('其他')
  @rules(required())
  @show((data: ConfigImpl) => data.gender === 'other')
  other: string;
}

const initialValue = {
  nickName: 'Musk',
  gender: 'male',
};

export default () => {
  const form = useForm<ConfigImpl>({
    config: ConfigImpl,
    initialValue,
    onChange,
    onSuccess: (data) => msg(data),
    onFail: (err) => msg(err),
  });

  const formItems = form.items.map((item) => (
    <FormItem
      key={item.name}
      label={item.label}
      formItem={item.formItem}
      error={item.error}
    />
  ));

  function onChange(
    formData: ConfigImpl,
    name: keyof typeof ConfigImpl.prototype,
  ) {
    if (name !== 'gender') return;
    if (formData.gender === 'male')
      form.setFormData({ nickName: 'tom👨🏻' }).clearError('nickName');
    if (formData.gender === 'female')
      form.setFormData({ nickName: 'lily👩🏻' }).clearError('nickName');
    if (formData.gender === 'other')
      form.setFormData({ nickName: 'siri😅' }).clearError('nickName');
  }

  function fill() {
    form
      .setFormData({
        nickName: 'Elon Musk',
        gender: 'other',
        other: 'AI',
      })
      .clearError();
  }

  return (
    <>
      {formItems}
      <div className="m-l">
        <Button type="primary" onClick={form.submit}>
          submit
        </Button>
        <Button onClick={form.reset}>reset</Button>
        <Button type="link" onClick={fill}>
          fill
        </Button>
      </div>
    </>
  );
};

function Gender(props: any) {
  return (
    <Select
      {...props}
      style={{ width: 180 }}
      placeholder="Select a option and change input text above"
      allowClear
    >
      <Select.Option value="male">male</Select.Option>
      <Select.Option value="female">female</Select.Option>
      <Select.Option value="other">other</Select.Option>
    </Select>
  );
}
