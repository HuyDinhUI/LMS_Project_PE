import { Select, type SelectType } from "./select"

export type DataFilter = {
    label: string
    key: string
    select: SelectType[]
}

type props = {
    data: DataFilter[]
    handleFilter: (value: string, key: string) => void
}



export const FilterForm = ({data, handleFilter}: props) => {
    return (
        <div className="flex gap-2">
            {data.map((d) => (
                <Select key={d.key} handleSelect={handleFilter} keySelect={d.key} select={d.select} label={d.label}/>
            ))}
        </div>
    )
}

