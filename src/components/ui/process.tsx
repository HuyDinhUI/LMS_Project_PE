type size = "sm" | "md"| "lg"

type ProcessProps = {
    total: number
    current: number
    classname?: string
    description: string
    note?: string
    size: size
    label: string
}

const SizeOption = {
    sm: "h-3",
    md: "h-5",
    lg: "h-7"
}

export const Process = ({total,current,classname,size,label,description, note}:ProcessProps) => {

    const widthClass = `${Math.round(current/total*100)}%`    

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-2">
                <div>
                    <h1 className="text-lg text-white font-bold">{description}</h1>
                    {note && <p className="text-sm text-white">{note}</p>}
                </div>
                <p className="text-sm font-brand-title bg-white p-5 rounded-xl">{current}</p>
            </div>
            <div className="flex text-white items-center justify-between gap-10">
                <div className={`w-full bg-white/10 rounded-2xl ${SizeOption[size]}`}>
                    <div className={`${classname} rounded-2xl h-full`} style={{width:widthClass}}></div>
                </div>
                <span>{label}</span>
            </div>
        </div>
    )
}