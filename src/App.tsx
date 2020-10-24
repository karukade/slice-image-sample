import { h } from "preact"
import { slice } from "./sliceImage"

const onDrop = (e: DragEvent) => {
  if (!e.dataTransfer) return
  e.stopPropagation()
  e.preventDefault()
  slice(e.dataTransfer.files)
}

const onDragOver = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  if (e.dataTransfer) e.dataTransfer.dropEffect = "copy"
}

export default function App(): h.JSX.Element {
  return (
    <div
      style={{
        width: "500px",
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#cbcbcb",
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      Drop Here
    </div>
  )
}
