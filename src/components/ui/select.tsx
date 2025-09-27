export type SelectType = {
    name: string
    value: string
}

export type DataSelect = {
    handleSelect: (value: string, key: string) => void
    select: SelectType[]
    keySelect: string
}

export const Select = ({select, handleSelect, keySelect}: DataSelect) => {
    return (
        <div className="p-1 ring ring-gray-200 rounded-md">
            <select onChange={(e) => handleSelect(e.target.value,keySelect)} className="w-20 outline-none">
                {select.map((s:SelectType,i) => (
                    <option key={i} value={s.value}>{s.name}</option>
                ))}
            </select>
        </div>
    )
}