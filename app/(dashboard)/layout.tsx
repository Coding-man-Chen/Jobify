import { ReactNode } from "react"

type LayoutProps = {
    children: ReactNode
}

const layout = ({children}:LayoutProps) => {
  return (
    <div>{children}</div>
  )
}

export default layout