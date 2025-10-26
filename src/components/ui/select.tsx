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
        <div className="p-1 ring ring-gray-500 rounded-xl">
            <select onChange={(e) => handleSelect(e.target.value,keySelect)} className="w-30 outline-none">
                {select.map((s:SelectType,i) => (
                    <option key={i} value={s.value}>{s.name}</option>
                ))}
            </select>
        </div>
    )
}