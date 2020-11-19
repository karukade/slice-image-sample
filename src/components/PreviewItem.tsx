import { h } from "preact"
import { memo } from "preact/compat"

function PreviewItem({ src }: { src: string }) {
  return <img src={src} alt="" />
}

export default memo(PreviewItem)
