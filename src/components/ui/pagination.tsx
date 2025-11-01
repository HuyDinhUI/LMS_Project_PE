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


export const Pagination = ({page, limit, totalPages, prevFunction, nextFunction, pageFunction}: PaginationType) => {
    return (
        <div className="mt-8">
            {/* pagination */}
            <div className="flex items-center gap-2">
                <Button disabled={page === 1} onClick={() => prevFunction()} variant="outline" size="md" icon={<ChevronLeft color="gray"/>}/>
                {Array.from({length:totalPages}).map((_,i) => (
                    <Button onClick={() => pageFunction(i+1)} variant={i+1 === page ? 'primary' : 'outline'} size="md" title={`${i+1}`}/>
                ))}
                <Button disabled={page === totalPages} onClick={() => nextFunction()} variant="outline" size="md" icon={<ChevronRight color="gray"/>}/>
            </div>
            {/* option limt */}
        </div>
    )
}