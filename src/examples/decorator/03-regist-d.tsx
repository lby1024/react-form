import { email, min, password, required } from '@by-l/react-form/rules';
import { useForm } from '@by-l/react-form/useForm';
import { formItem, label, rules } from '@by-l/react-form/useForm/decorator';
import { Button, Input } from 'antd';
import { FormItem } from '../compoment/FormItem';
import { msg } from '../utils';

class ConfigImpl {
  @formItem(<Input placeholder="e-mail" />)
  @label('邮箱')
  @rules(required(), email())
  email: string;

  @formItem(<Input placeholder="password" type="password" />)
  @label('密码')
  @rules(required(), password(), min(6))
  parssword: string;

  @formItem(<Input placeholder="password" type="password" />)
  @label('重复密码')
  @rules(reparssword)
  reparssword: string;
}

function reparssword(reparssword: string, form: any) {
  if (form['parssword'] !== reparssword) {
    throw '密码不一致';
  }
}

export default () => {
  const form = useForm({
    config: ConfigImpl,
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

  return (
    <>
      {formItems}
      <Button className="m-l" onClick={form.submit}>
        注册
      </Button>
    </>
  );
};
