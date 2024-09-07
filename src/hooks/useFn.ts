import { useEffect, useRef } from "react"

/**
 * 函数执行时获取不到最新值时用
 */
export function useFn(
  cb: (...args: any[]) => any,
  p: { [key: string]: any }
) {
  const ref = useRef(p)

  useEffect(() => {
    ref.current = p
  }, [p])

  return (...args: any[]) => {
    return cb({
      args,
      ...ref.current
    })
  }
}