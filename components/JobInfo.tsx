import { ReactNode } from "react"

type JobInfoProps = {
    icon: ReactNode,
    text: string
}
const JobInfo = ({icon,text}:JobInfoProps) => {
  return (
    <div className="flex gap-2 items-center justify-start">
        {icon}
        {text}
    </div>
  )
}

export default JobInfo