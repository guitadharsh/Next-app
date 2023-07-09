"use client"
import Link from "next/link"
import React from 'react'
import { useRouter } from "next/navigation"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
    const router = useRouter()
    const [isBtnDisabled, setIsBtnDisabled] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    })

    const onLogin = async (e: any) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const response = axios.post('/api/users/login', user)
            toast.success('Logged In Succesfully')
            router.push('/profile')
            console.log(response)
        }
        catch (err: any) {
            toast.error(err.message)
            console.log(err)
        }
        finally {
            setIsLoading(false)
        }
    }


    React.useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setIsBtnDisabled(false)
        }
        else {
            setIsBtnDisabled(true)
        }
    }, [user])
    return (
        <>
            <Toaster />

            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>Login</h1>
                <hr />
                <label htmlFor="email">Email</label>
                <input className="p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600" type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="enter email" />

                <label htmlFor="password">Password</label>
                <input className="p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600" type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="enter password" />

                <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600">Login here</button>
                <Link href='/signup'>Dont have an account?  Create here</Link>
            </div>
        </>
    )
}