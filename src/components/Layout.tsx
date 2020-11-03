import { h } from "preact"

type Props = {
  input: h.JSX.Element | null
  preview: h.JSX.Element | null
}

export default function Layout({ input, preview }: Props): h.JSX.Element {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ width: "49%" }}>{input}</div>
      <div style={{ width: "49%" }}>{preview}</div>
    </div>
  )
}
