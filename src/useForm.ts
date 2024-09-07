import { useState } from "react";
import { UseFormProps } from "./types";
import { initData } from "./tools";
import { useCheck } from "./useCheck";

export const useForm = (props: UseFormProps) => {
  const { config } = props
  const [data, setData] = useState(initData(props))
  const [error, setError] = useState({})
  const checker = useCheck(config, data)


  async function submit() {
    const error = await checker.checkList()

    if (error) {
      props.onFail && props.onFail(error)
    } else {
      props.onSuccess && props.onSuccess(data)
    }
  }


  return {
    submit
  }
}