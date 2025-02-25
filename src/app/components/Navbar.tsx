import Image from "next/image"
import { useSession } from 'next-auth/react'
// import Middlebar from "./Middlebar"

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="flex justify-between p-4">
      <div className="text-2xl font-bold">PicabayClone</div>
      <div>
        {session ? (
          <>
            <a href="/api/auth/signout" className="block">
                <div className="bg-green-500 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 cursor-pointer">
                    <span>{session.user.name}</span>
                    {" | Sign out"}
                </div>
            </a>
          </>
        ) : (
        <div className="flex items-center space-x-4">
            <span className="text-sm text-white text-gray-600">未singin：表示数3 |</span>
            <a href="/api/auth/signin" className="bg-green-500 text-white px-12 py-2 rounded-full font-bold hover:bg-green-700 cursor-pointer">
              Sign in
            </a>
            <a href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-700 cursor-pointer">
              Sign up
            </a>
        </div>
        
        //   <a href="/api/auth/signin" className="bg-green-500 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 cursor-pointer">Sign in</a>
        )}
      </div>
    </nav>
  )
}
