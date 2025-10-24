import API from "@/utils/axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

const ClassCourseMembers = () => {
    const [members,setMembers] = useState<{sinhvien: string,MaSV: string}[]>([])
    const {id} = useParams()
    const getMembers = async () => {
        try{
            const res = await API.get(`classCourse/getMemberById/${id}`)
            setMembers(res.data.result.data)
        }
        catch(err:any){
            toast.error(err?.response?.data?.message)
        }
    }

    useEffect(() => {
        getMembers()
    },[])
    return (
        <div className="flex-1 overflow-auto max-h-165 p-2">
            <div className="flex flex-col justify-center px-50">
                <div className="flex flex-col gap-3">
                    {members.map(m => (
                        <div key={m.MaSV} className="w-full p-5 ring ring-gray-200 rounded-md relative flex gap-5">
                            <img src="/" width={30} height={30} className="rounded-full"></img>
                            <div className="flex flex-col">
                                <span className="font-bold">{m.sinhvien}</span>
                                <span>{m.MaSV}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ClassCourseMembers