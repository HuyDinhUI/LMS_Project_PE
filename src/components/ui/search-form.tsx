import { InputSearch } from "./input"

type SearchFormProps = {
    handleSearch: (keyword: string) => void
}

export const SearchForm = ({handleSearch}:SearchFormProps) => {
    return (
        <div>
            <InputSearch handleSearch={handleSearch}/>
        </div>
    )
}

