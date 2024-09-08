import { useEffect, useRef } from "react"

/**
 * 函数执行时获取不到最新值时用
 */
export function useCurrent<T>(
  cb: (dep: T, args: any[]) => any,
  dep: T
) {
  const ref = useRef<T>(dep)

  useEffect(() => {
    ref.current = dep
  }, [dep])

  return (...args: any[]) => {
    return cb(ref.current, args)
  }
}