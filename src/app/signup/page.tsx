"use client"
import Link from "next/link"
import React from 'react'
import { useRouter } from "next/navigation"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

export default function SignUp() {
    const router = useRouter()
    const [isBtnDisabled, setIsBtnDisabled] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [user, setUser] = React.useState({
        email: '',
        password: '',
        username: ''
    })

    const onSignup = async (event: any) => {
        event.preventDefault()
        try {
            setIsLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response)
            router.push('/login')
            toast.success('Logged in Succesfully')
        }
        catch (err: any) {
            toast.error(err.message)
            console.log(err)
        }
        finally {
            setIsLoading(false)
        }
    }

    // btn disbling logic
    React.useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
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
                <h1 className="mb-5">Sign Up</h1>

                <hr />
                <label htmlFor="username">Username</label>
                <input className="p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600 text-black" type="text" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder="enter username" />

                <label htmlFor="email">Email</label>
                <input className="p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600 text-black" type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="enter email" />

                <label htmlFor="password">Password</label>
                <input className="p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-600 text-black" type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="enter password" />

                <button disabled={isLoading} onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600">{isBtnDisabled ? '' : 'Sign Up'}</button>
                {isLoading && <p className="text-xs">Loading...</p>}
                <Link href='/login'>Already have an account?  login here</Link>
            </div>
        </>
    )
}