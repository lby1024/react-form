// import { FormListConfig, useFormList } from '@lby/react-form';
// import { Button, Flex } from 'antd'
// import { FullName, fullNameConfig } from './FullName';
// import { msg } from '../utils';
// import { ListItem } from './ListItem';
// import { FC, useEffect } from 'react';


// export const nameListConfig: FormListConfig = {
//   subForm: <FullName />,
// };

// interface NameListProps {
//   value?: any,
//   onChange?: Function,
//   subscrible?: Function
// }

// export const NameList: FC<NameListProps> = (props) => {

//   const form = useFormList({
//     config: nameListConfig,
//     onChange: props.onChange
//   })

//   useEffect(() => {
//     form.setFormData(props.value)
//   }, [props.value])

//   useEffect(() => {
//     if (!props.subscrible) return
//     const unSub = props.subscrible(form.checkForm)
//     return () => unSub()
//   }, [])

//   const formItems = form.items.map((item, i) => (
//     <ListItem
//       key={item.name}
//       formItem={item.formItem}
//       error={item.error}
//       onDelete={() => form.remove(i)}
//     />
//   ))

//   return (
//     <Flex vertical gap={32} style={{ width: 300 }}>
//       {formItems}
//       <Button onClick={() => form.push()} >添加人员</Button>
//     </Flex>
//   )
// }
