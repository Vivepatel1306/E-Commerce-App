import {useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import Spinner from '../Spinner'
import axios from 'axios'
import {  Outlet  } from 'react-router-dom'
export default function PrivateRoute ()  {
    const [ok, setok] = useState(false)
    const [auth, setAuth] = useAuth()
    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("/api/v1/auth/auth-user");
            if (res.data.ok) {
                setok(true)
            }
            else {
                setok(false)
            }
        }
        if (auth?.token) {
            
            authCheck()
        // return <Navigate to="/login" state={{ from: location }} replace />;
  
        }
    },[auth?.token]);


    return ok ? <Outlet /> : <Spinner />

}

