import { ListConfig, min, required, useFormList } from '@by-l/react-form';
import { Button, Flex } from 'antd';
import { FullName } from './compoment/FullName';
import { ListItem } from './compoment/ListItem';
import { msg } from './utils';

const config: ListConfig = {
  subForm: <FullName />,
  listRules: [required('最少3个'), min(3, '最少3个')],
};

export default () => {
  const { items, submit, push, remove, error } = useFormList({
    config,
    onSuccess: (res: any) => msg(res),
    onFail: (err: string) => msg(err),
  });

  const formItems = items.map((item, i) => (
    <ListItem
      key={item.name}
      formItem={item.formItem}
      error={item.error}
      onDelete={() => remove(i)}
    />
  ));

  return (
    <Flex vertical gap={32} style={{ width: 300 }}>
      {formItems}
      <Button onClick={submit} type="primary">
        submit
      </Button>
      <Button onClick={() => push()}>add</Button>
      <div className="err">{error}</div>
    </Flex>
  );
};
