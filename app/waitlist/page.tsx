"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Pacifico, Poppins } from "next/font/google"

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] })
const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] })

export default function WaitlistSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-12">
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

      {/* Main Content */}
      <div className="max-w-2xl text-center space-y-8">
        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            You want the <span className="text-cyan-500">best</span>,
            <br />
            you gotta wait for the best!
          </h1>
        </div>

        {/* Description */}
        <p className="text-lg text-gray-400">
          Give us just <span className="font-semibold text-white">two weeks</span> to fully onboard the amazing
          designers who will listen and understand your vision.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto w-full">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-6 py-4 bg-white text-black placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            type="submit"
            className="w-full px-6 py-4 bg-gray-600 hover:bg-gray-700 text-white font-medium transition-colors"
          >
            {submitted ? "Thanks for signing up!" : "Notify me when ready"}
          </button>
        </form>

        {/* Back Link */}
        <Link href="/" className="inline-block text-gray-400 hover:text-white transition-colors mt-4">
          ← Go back
        </Link>
     
        
      </div>
         <Link href="/inspiration-matcher" className="inline-block text-gray-400 font-bold hover:text-white transition-colors mt-4">
          → Inpiration Matcher
        </Link>
    </div>
  )
}
