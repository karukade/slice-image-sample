import { h } from "preact"
import { memo } from "preact/compat"
import { ImgInfo } from "../utils/fileReader"

type Props = {
  sources: ImgInfo[]
}

function Preview({ sources }: Props): h.JSX.Element {
  return (
    <ul
      style={{
        display: "flex",
        justifyContent: "space-between",
        listStyle: "none",
      }}
    >
      {sources.map((source) => (
        <PreviewItem key={source.name} src={source.data as string} />
      ))}
    </ul>
  )
}

function PreviewItem({ src }: { src: string }) {
  return (
    <li style={{ width: "20%", padding: "8px" }}>
      <img style={{ maxWidth: "100%" }} src={src} alt="" />
    </li>
  )
}

export default memo(Preview)
