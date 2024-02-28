
type PromiseOr<T> = Promise<T> | T;

type RadioItem = {
  label: string
  value: string
  description?: string
  checked?: boolean
}

export type { RadioItem, PromiseOr }
