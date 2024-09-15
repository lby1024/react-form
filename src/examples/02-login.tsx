import {
  Config,
  email,
  min,
  password,
  required,
  useForm,
} from '@by-l/react-form';
import { Button, Checkbox, Input } from 'antd';
import { FormItem } from './compoment/FormItem';
import './index.css';
import { msg } from './utils';

const config: Config = {
  email: {
    label: '邮箱',
    formItem: <Input placeholder="e-mail" />,
    rules: [required(), email()],
  },
  parssword: {
    label: '密码',
    formItem: <Input placeholder="password" type="password" />,
    rules: [required(), min(6), password()],
  },
  remember: {
    formItem: <Checkbox>remember</Checkbox>,
    valueName: 'checked',
  },
};

const initialValue = {
  email: '666@qq.com',
  remember: true,
};

export default () => {
  const { items, submit } = useForm({
    initialValue,
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
      <Button className="m-l" onClick={submit}>
        登录
      </Button>
    </div>
  );
};
