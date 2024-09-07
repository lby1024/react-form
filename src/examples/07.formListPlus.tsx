// import { Config, FormListConfig, useFormList } from '@lby/react-form';
// import { Button, Flex } from 'antd'
// import { msg } from './utils';
// import { ListItem } from './compoment/ListItem';
// import { FullName } from './compoment/FullName';


// const config: FormListConfig = {
//   subForm: <FullName />,
// };

// export default () => {

//   const { items, submit, push, remove } = useFormList({
//     config,
//     onSuccess: (res: any) => msg(res),
//     onFail: (err: string) => msg(err),
//   })

//   const formItems = items.map((item, i) => (
//     <ListItem
//       key={item.name}
//       {...item}
//       onDelete={() => remove(i)}
//     />
//   ))

//   return (
//     <Flex vertical gap={32} style={{ width: 300 }}>
//       {formItems}
//       <Button onClick={submit} type='primary' >submit</Button>
//       <Button onClick={() => push()} >add</Button>
//     </Flex>
//   )
// }
