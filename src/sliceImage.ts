//@ts-ignore
import imageToSlices from "image-to-slices"

type FileReaderResult = string | ArrayBuffer | null | undefined
type ImageToSliceResult = { dataURI: string }[]

const getImageSize = (
  src: string
): Promise<{ width: number; height: number }> => {
  const img = new Image()
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }
    img.onerror = () => {
      reject()
    }
    img.src = src
  })
}

const read = (files: FileList) => {
  return Promise.all<{
    data: FileReaderResult
    name: string
  }>(
    [...files].map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = function (e) {
          resolve({ data: e.target?.result, name: file.name })
        }
        reader.readAsDataURL(file)
      })
    })
  )
}

const getLineXArray = (imageHeight: number, splitSize: number) => {
  if (imageHeight < splitSize) return [imageHeight]
  const rest = imageHeight % splitSize
  const splitIn = (imageHeight - rest) / splitSize
  const xLineArr = [...new Array(splitIn).keys()].map(
    (_, i) => splitSize * (i + 1)
  )
  return [...xLineArr, splitSize * splitIn + rest]
}

const sliceImage = async (source: FileReaderResult, splitSize: number) => {
  if (!source) return
  const { width, height } = await getImageSize(source as string)
  const lineXArray = getLineXArray(height, splitSize)
  const lineYArray = [width]
  return new Promise<ImageToSliceResult>((resolve) => {
    imageToSlices(
      source,
      lineXArray,
      lineYArray,
      {
        saveToDataUrl: true,
      },
      (dataUrlList: ImageToSliceResult) => {
        resolve(dataUrlList)
      }
    )
  })
}

const downloadImageToLocal = (data: string, name: string, index: number) => {
  const [_name, ext] = name.split(".")
  const dlLink = document.createElement("a")
  dlLink.href = data
  dlLink.download = `${_name}-${index}.${ext}`
  document.body.insertAdjacentElement("beforeEnd" as any, dlLink)
  dlLink.click()
  dlLink.remove()
}

export const slice = async (
  files: FileList,
  splitSize = 100
): Promise<void> => {
  const sources = await read(files)
  const slicedImagesList = await Promise.all(
    sources.map((source) => sliceImage(source.data, splitSize))
  )
  slicedImagesList.forEach((slicedImages, _i) => {
    slicedImages?.forEach((sliceImage, i) => {
      downloadImageToLocal(sliceImage.dataURI, sources[_i].name, i)
    })
  })
}
