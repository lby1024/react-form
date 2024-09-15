import { Config, required, useForm } from '@by-l/react-form';
import { Button, Input, Select } from 'antd';
import { FormItem } from './compoment/FormItem';
import { msg } from './utils';

const config: Config = {
  nickName: {
    label: '昵称',
    formItem: <Input placeholder="nick name" />,
    rules: [required()],
  },
  gender: {
    label: '性别',
    formItem: <Gender />,
    rules: [required()],
  },
  other: {
    label: '其他',
    formItem: <Input placeholder="other" />,
    show: (form: any) => form['gender'] === 'other',
    rules: [required()],
  },
};

const initialValue = {
  nickName: 'Musk',
  gender: 'male',
};

export default () => {
  const form = useForm({
    initialValue,
    config,
    onSuccess: (data) => msg(data),
    onFail: (err) => msg(err),
    onChange,
  });

  function fill() {
    form.setFormData({
      nickName: 'Elon Musk',
      gender: 'other',
      other: 'AI',
    });
    form.setError({});
  }
  /**
   * 如果gender发生变化就修改nickName
   */
  function onChange(formData: any, name: string) {
    if (name !== 'gender') return;
    const v = formData[name];
    if (v === 'female') form.setFormData({ nickName: 'lily👩🏻' });
    if (v === 'male') form.setFormData({ nickName: 'tom👨🏻' });
    if (v === 'other') form.setFormData({ nickName: 'siri😅' });
  }

  const formItems = form.items.map((item) => (
    <FormItem
      key={item.name}
      label={item.label}
      error={item.error}
      formItem={item.formItem}
    />
  ));

  return (
    <div>
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
    </div>
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
