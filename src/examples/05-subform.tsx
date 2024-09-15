import { Config, required, useForm } from '@by-l/react-form';
import { Button, Input } from 'antd';
import { FormItem } from './compoment/FormItem';
import { FullName } from './compoment/FullName';
import { msg } from './utils';

const config: Config = {
  title: {
    label: '标题',
    formItem: <Input placeholder="title" />,
    rules: [required('title不能为空')],
  },
  fullName: {
    label: '姓名',
    subForm: <FullName />,
  },
  other: {
    label: 'other',
    formItem: <Input placeholder="other" />,
  },
};

export default () => {
  const { items, submit } = useForm({
    config,
    onSuccess: (data) => msg(data),
    onFail: (err) => msg(err),
  });

  const formItems = items.map((item) => (
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
      <Button className="m-l" type="primary" onClick={submit}>
        submit
      </Button>
    </div>
  );
};
