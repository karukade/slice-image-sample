import { useState, useEffect } from "preact/hooks"
import { sliceAndDownload } from "../utils/slice/"
import { fileListToDataUrlList, ImgInfo } from "../utils/fileReader"

type UseSplitImageReturn = {
  splitSize: number
  imgInfo: ImgInfo[] | null
  setFileList: (files: FileList) => void
  setSliceSize: (splitSize: number) => void
  sliceImgAndDownload: () => void
}

export const useSplitImage = (
  initialSplitSize: number
): UseSplitImageReturn => {
  const [splitSize, _setSliceSize] = useState(initialSplitSize)
  const [fileList, _setFileList] = useState<FileList | null>(null)
  const [imgInfo, setImgInfo] = useState<ImgInfo[] | null>(null)

  const setSliceSize = (splitSize: number) => {
    _setSliceSize(splitSize)
  }

  const setFileList = (files: FileList) => {
    _setFileList(files)
  }

  const sliceImgAndDownload = () => {
    imgInfo && sliceAndDownload(imgInfo, splitSize)
  }

  useEffect(() => {
    if (!fileList) return
    let cancel = false
    ;(async () => {
      const imgInfo = await fileListToDataUrlList(fileList)
      if (!cancel) setImgInfo(imgInfo)
    })()
    return () => (cancel = true)
  }, [fileList])

  return {
    splitSize,
    imgInfo,
    setFileList,
    setSliceSize,
    sliceImgAndDownload,
  }
}
