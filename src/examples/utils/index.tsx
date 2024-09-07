
export function msg(v: any) {

  alert(
    JSON.stringify(
      v,
      (k, v) => v === undefined ? 'undefined' : v,
      2
    )
  )
}