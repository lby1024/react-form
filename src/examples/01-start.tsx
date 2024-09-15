import { formItem, required, rules, useForm } from '@by-l/react-form';
import { Button, Flex, Input } from 'antd';
import { msg } from './utils';

class ConfigImpl {
  @formItem(<Input placeholder="e-mail" />)
  @rules(required('请填写邮箱'))
  email: string;

  @formItem(<Input placeholder="password" type="password" />)
  @rules(required('请填写密码'))
  password: string;
}

export default () => {
  const form = useForm({
    config: ConfigImpl,
    onSuccess: (data) => msg(data),
    onFail: (err) => msg(err),
  });

  return (
    <Flex vertical gap={21} style={{ width: 300 }}>
      {form.items.map((item) => item.formItem)}
      <Button onClick={form.submit}>登录</Button>
    </Flex>
  );
};
