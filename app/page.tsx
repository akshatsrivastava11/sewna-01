"use client"

import { Pacifico, Poppins } from "next/font/google"
import { useState, useRef, useEffect } from "react"
import LoginPage from "./signup/page"
import FloatingBackground from "@/components/floatingBackground"


const pacifico = Pacifico({ weight: "400", subsets: ["latin"] })
const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] })

export default function ProjectsShowcase() {
  const [activeProject, setActiveProject] = useState("needDesigner") // Changed default to match projects keys
  const [showDetail, setShowDetail] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const projects = {
    needDesigner: "I need a designer",
    amDesigner: "I am a designer",
  }

  // --- Drag Handlers ---
  const handleMouseDown = (e) => {
    // Only start drag on left mouse button (button 0)
    if (e.button !== 0) return
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragStart, position]) // Added position to dependency array for clarity (though not strictly needed here)

  // --- Render ---
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <FloatingBackground/>
      {/* header */}
      <header className="flex h-[10vh] items-center fixed top-0 left-5 right-0 z-20 px-4 sm:px-6 md:px-8">
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

      {/* Main Showcase View */}
      <div
        className={`min-h-screen flex items-center  justify-between px-16 py-20 gap-24 transition-opacity duration-500 relative ${showDetail ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        {/* Left Section - Draggable Card */}
        <div className="flex-1 max-w-md absolute top-20 left-1 ">
          <div
            ref={cardRef}
            className={`bg-gray-900/60 backdrop-blur-xl border h-70  w-80  border-white/5 rounded-3xl p-12 overflow-hidden transition-all duration-300`}
          >
            {activeProject === "amDesigner" ? (
         <div className="scale-50 origin-top-left -ml-24 -mt-12 w-[330%] h-[310%]">
  {/* 👇 Added w-full and h-full to this wrapper div */}
  <div className="bg-black rounded-lg overflow-hidden w-full h-full"> 
    <img 
      src='/iamadesigner.png' 
      alt="I am a designer showcase"
      className="w-full h-full object-cover"
    />
  </div>
</div>
            ) : (
           <div className="scale-50 origin-top-left -ml-24 -mt-12 w-[330%] h-[310%]">
  {/* 👇 Added w-full and h-full to this wrapper div */}
  <div className="bg-black rounded-lg overflow-hidden w-full h-full"> 
    <img 
      src='/ineedadesigner.png' 
      alt="I am a designer showcase"
      className="w-full h-full object-cover"
    />
  </div>
</div>
            )}
          </div>
        </div>

        {/* Right Section - Projects List (MODIFIED) */}
        {/* Changed from 'flex-1 flex flex-col items-end pr-10' to absolute positioning */}
        <div className="absolute bottom-25 right-16 flex flex-col items-end">
          <div className="text-right">
            {Object.entries(projects).map(([key, name]) => (
              <div
                key={key}
                className={`text-6xl font-light leading-tight mb-2 cursor-pointer transition-all duration-300 pr-10 relative ${
                  activeProject === key ? "text-white" : "text-gray-700 hover:text-white hover:-translate-x-3"
                }`}
                onMouseEnter={() => setActiveProject(key)}
                onClick={() => {
                  setActiveProject(key)
                  setShowDetail(true)
                }}
              >
                {name}
                <span
                  className={`absolute right-0 transition-opacity duration-300 ${activeProject === key ? "opacity-100" : "opacity-0"}`}
                >
                  ·
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail View (Unchanged) */}
      <div
        className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center px-16 py-20 transition-opacity duration-500 ${showDetail ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowDetail(false)}
          className="absolute top-10 right-16 text-5xl text-gray-600 hover:text-white transition-all duration-300 hover:rotate-90 w-12 h-12 flex items-center justify-center leading-none"
        >
          ×
        </button>

        <h1 className="text-8xl font-light mb-20 text-center">{projects[activeProject]}</h1>

        {/* Detail Content Grid */}
        <div className="grid grid-cols-2 gap-8 max-w-6xl w-full mb-24">
          <div className="bg-gray-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-9 transition-all duration-300 hover:border-blue-600/20 hover:-translate-y-1">
            <div className="text-xs font-semibold tracking-[2px] text-blue-600 mb-5">DEPENDENCIES</div>
            <div className="text-sm leading-relaxed text-gray-400">
              <div className="flex items-center gap-3 mb-3">framer-motion 🚀</div>
              <div className="flex items-center gap-3 mb-3">react-use-measure 📏</div>
              <div className="bg-black/80 rounded-lg p-5 mt-4 font-mono text-xs text-green-400 overflow-x-auto">
                {`import { motion } from 'framer-motion'
import useMeasure from 'react-use-measure'`}
              </div>
            </div>
          </div>

          <div className="bg-gray-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-9 transition-all duration-300 hover:border-blue-600/20 hover:-translate-y-1">
            <div className="text-xs font-semibold tracking-[2px] text-blue-600 mb-5">OVERVIEW</div>
            <div className="text-sm leading-relaxed text-gray-400">
              The anime.js landing page is a beautifully crafted interactive experience that showcases smooth scroll
              animations and elegant transitions.
            </div>
          </div>

          <div className="bg-gray-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-9 transition-all duration-300 hover:border-blue-600/20 hover:-translate-y-1">
            <div className="text-xs font-semibold tracking-[2px] text-blue-600 mb-5">DESCRIPTION</div>
            <div className="text-sm leading-relaxed text-gray-400">
              <p>Inspired by and adapted from anime.js landing page.</p>
              <p className="mt-4">Whether to show the scroll card.</p>
            </div>
          </div>

          <div className="bg-gray-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-9 transition-all duration-300 hover:border-blue-600/20 hover:-translate-y-1">
            <div className="text-xs font-semibold tracking-[2px] text-blue-600 mb-5">ATTRIBUTES</div>
            <div className="text-sm leading-relaxed text-gray-400">
              <p>The anime section of the scroll bar.</p>
              <p className="mt-4">Whether to show the scroll card.</p>
            </div>
          </div>
        </div>

        {/* Saas Section */}
        <div className="text-center pt-16 border-t border-white/5 max-w-6xl w-full">
          <h2 className="text-6xl font-light mb-8">Billion Dollar Saas</h2>
          <p className="text-base leading-relaxed text-gray-600 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae obcaecati id natus dignissimos totam at
            incidunt nam odio consequatur ducimus!
          </p>
        </div>
      </div>
    </div>
  )
}
