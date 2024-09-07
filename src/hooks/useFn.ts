import { useEffect, useRef } from "react"

type E<T> = {
  args: any[],
} & T

/**
 * 函数执行时获取不到最新值时用
 */
export function useFn<T>(
  cb: (e: E<T>) => any,
  p: T
) {
  const ref = useRef<T>(p)

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