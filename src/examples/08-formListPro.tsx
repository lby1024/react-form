import { ListConfig, useFormList } from '@by-l/react-form';
import { Button, Flex, Typography } from 'antd';
import { MyCard } from './compoment/Card';
import { ClassForm } from './compoment/ClassForm';
import { msg } from './utils';

const config: ListConfig = {
  subForm: <ClassForm />,
};

export default () => {
  const { items, submit, push, remove, getFormData } = useFormList({
    config,
    onSuccess: (res: any) => msg(res),
    onFail: (err: string) => msg(err),
  });

  const formItems = items.map((item, i) => (
    <MyCard
      key={item.name}
      formItem={item.formItem}
      onDelete={() => remove(i)}
    />
  ));

  return (
    <Flex vertical gap={32} style={{ width: 600 }}>
      {formItems}
      <Button onClick={submit} type="primary">
        submit
      </Button>
      <Button onClick={() => push()}>添加班级</Button>

      <Typography>
        <pre>
          {JSON.stringify(
            getFormData(),
            (k, v) => (v === undefined ? 'undefined' : v),
            2,
          )}
        </pre>
      </Typography>
    </Flex>
  );
};
