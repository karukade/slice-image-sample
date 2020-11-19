import { h, Fragment } from "preact"
import Header from "./Header"

type Props = {
  left: h.JSX.Element | null
  right: h.JSX.Element | null
}

export default function Layout({ left, right }: Props): h.JSX.Element {
  return (
    <Fragment>
      <Header />
      <div className="h-full pt-7 grid grid-cols-2">
        <div className="p-2 pt-3">
          <div style={{ position: "sticky", top: "80px" }}>{left}</div>
        </div>
        <div className="bg-gray-200 p-2">{right}</div>
      </div>
    </Fragment>
  )
}
