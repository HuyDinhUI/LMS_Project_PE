import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./button"

type PaginationType = {
    page: number,
    limit: number
    totalPages: number
    prevFunction: () => void
    nextFunction: () => void
    pageFunction: (page: number) => void
}

const mock_data_pagination = {
    page: 1,
    limit:10,
    totalPages: 2
}

export const Pagination = ({page, limit, totalPages, prevFunction, nextFunction, pageFunction}: PaginationType) => {
    return (
        <div className="py-5 mt-8">
            {/* pagination */}
            <div className="flex items-center gap-2">
                <Button disabled={page === 1} onClick={() => prevFunction()} size="md" icon={<ChevronLeft color="gray"/>}/>
                {Array.from({length:totalPages}).map((_,i) => (
                    <Button onClick={() => pageFunction(i+1)} variant={i+1 === page ? 'primary' : 'default'} size="md" title={`${i+1}`}/>
                ))}
                <Button disabled={page === totalPages} onClick={() => nextFunction()} size="md" icon={<ChevronRight color="gray"/>}/>
            </div>
            {/* option limt */}
        </div>
    )
}