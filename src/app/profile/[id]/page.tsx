import toast, { Toaster } from 'react-hot-toast'

export default function UserProfile({ params }: any) {
    return (
        <>
        <Toaster />
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>Profile</h1>

                <hr />
                <p className="text-4">Profile Page <span className="bg-orange-400 rounded text-black p-1">{params.id}</span></p>
            </div>
        </>
    )
}