"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Pacifico, Poppins } from "next/font/google"

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] })
const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] })
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <header className="flex items-center fixed  align-middle text-center z-20 justify-center left-180 top-15  ">
          <a href="/" data-discover="true">
            <div className="flex items-baseline text-[2.5rem] text-[rgb(0,182,127)] transition-transform duration-300 cursor-pointer hover:scale-105">
              <span className={`${pacifico.className} font-thin`}>se</span>
              <span className={`${poppins.className} font-semibold text-[1.7rem] -tracking-[0.2em]`}>
                W<i className="italic not-italic text-[1.7rem] tracking-normal">N</i>
              </span>
              <span className={`${poppins.className} font-normal text-[2.2rem] -tracking-[0.02em]`}>a.</span>
            </div>
          </a>
        </header>
        {/* Sign in heading */}
        <div className="text-center mb-8">
          <h1 className="text-lg text-gray-500 mb-4">Sign in to continue</h1>
          <p className="text-gray-300">
            You will be logged in as a <span className="font-bold">designer.</span>
          </p>
        </div>

        {/* Google button */}
        <button className="w-full border border-gray-300 rounded-lg py-3 px-4 mb-6 flex items-center justify-center gap-3 hover:bg-gray-50 transition">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <text x="0" y="20" fontSize="20" fill="#EA4335">
              G
            </text>
          </svg>
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg py-3 px-4 mb-4 placeholder-gray-400 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
        />

        {/* Password input */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-3 px-4 placeholder-gray-400 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Sign In button */}
        <button className="w-full bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg mb-6 hover:bg-gray-800 transition">
          Sign In
        </button>

        {/* Forgot password link */}
        <div className="text-center mb-6">
          <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">
            Forgot your password?
          </a>
        </div>

        {/* Sign up link */}
        <div className="text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <a href="#" className="text-gray-200 font-bold hover:text-white">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
