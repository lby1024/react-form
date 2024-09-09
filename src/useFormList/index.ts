import { useState } from "react";
import { UseFormListProps } from "../types";
import { useListCheck } from "./useListCheck";

export const useFormList = (props: UseFormListProps) => {
  const { } = props
  const [arr, setArr] = useState<any[]>([])
  const [errList, setErrList] = useState<any[]>([]) // rules
  const [err, setErr] = useState('') // listRules

  const checker = useListCheck(
    props,
    [arr, setArr],
    [errList, setErrList],
    [err, setErr]
  )

}