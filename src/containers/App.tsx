import { h, Fragment } from "preact"
import { useSplitImage } from "./hooks"

import Layout from "../components/Layout"
import DropArea from "../components/DropArea"
import Input from "../components/Input"
import Preview from "../components/Preview"

export default function App(): h.JSX.Element {
  const {
    splitSize,
    imgInfo,
    setFileList,
    setSliceSize,
    sliceImgAndDownload,
  } = useSplitImage(100)

  return (
    <Layout
      input={
        <Fragment>
          <DropArea onDrop={setFileList} />
          <Input onChange={setSliceSize} initialValue={splitSize} />
          <button onClick={sliceImgAndDownload}>Slice</button>
        </Fragment>
      }
      preview={imgInfo && <Preview sources={imgInfo} />}
    />
  )
}
