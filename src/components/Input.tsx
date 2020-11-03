import { h } from "preact"
import { useState } from "preact/hooks"

export default function Input({
  onChange,
  initialValue,
}: {
  onChange: (val: number) => void
  initialValue?: string | number
}): h.JSX.Element {
  const [value, setValue] = useState(initialValue || "")
  const _onChange: h.JSX.GenericEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget
    setValue(value)
    if (!/^[0-9]+$/.test(value)) return
    onChange(parseInt(value))
  }

  return (
    <div>
      <input type="text" value={value} onChange={_onChange} />
    </div>
  )
}
