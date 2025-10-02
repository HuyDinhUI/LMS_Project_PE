import {AlertCircleIcon} from "lucide-react"
type AlertProps = {
    title: string
}

export const AlertSuccess = () => {

}

export const AlertDanger = ({title}: AlertProps) => {

    return (
        <div className="w-full flex p-2 gap-2 mb-5 items-center text-sm text-red-700 rounded-md ring ring-red-700">
            <AlertCircleIcon size={18}/>
            {title}
        </div>
    )
}