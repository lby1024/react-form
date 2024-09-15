import { Button, Input } from 'antd';
import { min, required } from '../rules';
import { Config } from '../types';
import { useForm } from '../useForm';
import { FormItem } from './compoment/FormItem';
import { FullName } from './compoment/FullName';
import { NameList } from './compoment/nameList';
import { msg } from './utils';

const config: Config = {
  className: {
    label: '班级',
    formItem: <Input placeholder="class" />,
    rules: [required()],
  },
  teacher: {
    label: '老师',
    subForm: <FullName />,
  },
  students: {
    label: '学生',
    formList: <NameList />,
    rules: [required('最少3个学生'), min(3, '最少3个学生')],
  },
};

export default () => {
  const form = useForm({
    config,
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
    <div>
      {formItems}
      <Button className="m-l" type="primary" onClick={form.submit}>
        submit
      </Button>
    </div>
  );
};
