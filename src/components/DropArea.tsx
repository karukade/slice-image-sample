import { h } from "preact"

type Props = {
  onDrop?: (fileList: FileList) => void
  onDragOver?: (e: DragEvent) => void
}

export default function DropArea({ onDrop, onDragOver }: Props): h.JSX.Element {
  const _onDrop = (e: DragEvent) => {
    if (!e.dataTransfer) return
    e.stopPropagation()
    e.preventDefault()
    onDrop && onDrop(e.dataTransfer.files)
  }

  const _onDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer) e.dataTransfer.dropEffect = "copy"
    onDragOver && onDragOver(e)
  }

  return (
    <div
      style={{
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#cbcbcb",
      }}
      onDragOver={_onDragOver}
      onDrop={_onDrop}
    >
      Drop Here
    </div>
  )
}
