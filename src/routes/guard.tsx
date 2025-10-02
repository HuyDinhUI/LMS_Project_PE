import API from "@/utils/axios";
import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom"
import {ScaleLoader} from "react-spinners"


type Props = {
  children: ReactNode;
};

const override:any = {
    display: "block",
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%;-50%)"
}

const Guard = ({ children }: Props) => {
  const [auth, setAuth] = useState<any>(null)

  useEffect(() => {
    
    const checkLogin = async () => {
        try{
            const res = await API.post('/auth/getUserInfo')
            console.log(res.data)
            if (res.data){
                localStorage.setItem('username',res.data.user[0].username)
                setAuth(true)
            } else setAuth(false)
        } catch(error){
            setAuth(false)
        }
    }
    checkLogin()
  })

  if (auth === null) return <ScaleLoader color="blue" cssOverride={override} aria-setsize={10} />

  if(!auth) return <Navigate to="/auth/login" replace/>

  return children
}

export default Guard