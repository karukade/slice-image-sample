import { h } from "preact"

type Props = {
  input: h.JSX.Element | null
  preview: h.JSX.Element | null
}

export default function Layout({ input, preview }: Props): h.JSX.Element {
  return (
    <div className="container mx-auto flex justify-between">
      <div className="flex-1 m-2">{input}</div>
      <div className="flex-1 m-2">{preview}</div>
    </div>
  )
}
