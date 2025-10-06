type size = "sm" | "md"| "lg"

type ProcessProps = {
    total: number
    current: number
    classname: string
    size: size
    label: string
}

const SizeOption = {
    sm: "h-3",
    md: "h-5",
    lg: "h-7"
}

export const Process = ({total,current,classname,size,label}:ProcessProps) => {

    const widthClass = `${Math.round(current/total*100)}%`    

    return (
        <div>
            <div className="flex items-center justify-between">
                <label className="text-sm">{label}</label>
                <p className="text-sm">{`${current}/${total}`}</p>
            </div>
            <div className={`w-full mt-2 bg-gray-200 rounded-2xl ${SizeOption[size]}`}>
                <div className={`${classname} rounded-2xl h-full`} style={{width:widthClass}}></div>
            </div>
        </div>
    )
}