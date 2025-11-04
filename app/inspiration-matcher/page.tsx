"use client"
import React, { useState, useRef } from "react"
import { Upload, X, Sparkles, ArrowRight, Heart, Star, MapPin, Plus, Eye, Search } from "lucide-react"
import { Pacifico, Poppins } from "next/font/google"

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] })
const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] })

// Types
interface DesignElement {
  id: string
  label: string
  color: string
}

interface Marker {
  id: number
  x: number
  y: number
  element: string
}

interface Designer {
  id: number
  name: string
  specialty: string
  rating: number
  reviews: number
  location: string
  turnaround: string
  priceRange: string
  image: string
  portfolioMatch: number
  strengths: string[]
  recentWork: string
}

const VisualInspirationMatcher: React.FC = () => {
  const [step, setStep] = useState<number>(1)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [markers, setMarkers] = useState<Marker[]>([])
  const [selectedElements, setSelectedElements] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filteredDesigners, setFilteredDesigners] = useState<Designer[]>([])
  const [selectedDesigner, setSelectedDesigner] = useState<Designer | null>(null)
  const [showDesignerModal, setShowDesignerModal] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // Design elements that users can tag
  const designElements: DesignElement[] = [
    { id: "sleeve", label: "Sleeve Style", color: "bg-pink-500" },
    { id: "neckline", label: "Neckline", color: "bg-purple-500" },
    { id: "embroidery", label: "Embroidery Pattern", color: "bg-blue-500" },
    { id: "color", label: "Color Combo", color: "bg-green-500" },
    { id: "silhouette", label: "Silhouette", color: "bg-yellow-500" },
    { id: "fabric", label: "Fabric Texture", color: "bg-red-500" },
  ]

  // Extended designer database with more dummy data
  const allDesigners: Designer[] = [
    {
      id: 1,
      name: "Designer 1",
      specialty: "Traditional Embroidery",
      rating: 4.9,
      reviews: 127,
      location: "Location 1",
      turnaround: "2-3 weeks",
      priceRange: "₹₹₹",
      image: "http://localhost:2000/avatar/designer-1.png",
      portfolioMatch: 95,
      strengths: ["Mirror Work", "Zardozi", "Gota Patti"],
      recentWork: "http://localhost:2000/portfolio/work-1.jpg",
    },
    {
      id: 2,
      name: "Designer 2",
      specialty: "Contemporary Fusion",
      rating: 4.8,
      reviews: 89,
      location: "Location 2",
      turnaround: "3-4 weeks",
      priceRange: "₹₹",
      image: "http://localhost:2000/avatar/designer-2.png",
      portfolioMatch: 92,
      strengths: ["Thread Work", "Sequins", "Minimalist"],
      recentWork: "http://localhost:2000/portfolio/work-2.jpg",
    },
    {
      id: 3,
      name: "Designer 3",
      specialty: "Bridal Couture",
      rating: 5.0,
      reviews: 203,
      location: "Location 3",
      turnaround: "4-6 weeks",
      priceRange: "₹₹₹₹",
      image: "http://localhost:2000/avatar/designer-3.png",
      portfolioMatch: 88,
      strengths: ["Heavy Embellishment", "Stone Work", "Luxury Fabrics"],
      recentWork: "http://localhost:2000/portfolio/work-3.jpg",
    },
    {
      id: 4,
      name: "Designer 4",
      specialty: "Ethnic Wear",
      rating: 4.7,
      reviews: 156,
      location: "Location 4",
      turnaround: "2-3 weeks",
      priceRange: "₹₹",
      image: "http://localhost:2000/avatar/designer-4.png",
      portfolioMatch: 85,
      strengths: ["Kantha Work", "Block Print", "Hand Weaving"],
      recentWork: "http://localhost:2000/portfolio/work-4.jpg",
    },
    {
      id: 5,
      name: "Designer 5",
      specialty: "Designer Sarees",
      rating: 4.9,
      reviews: 178,
      location: "Location 5",
      turnaround: "3-5 weeks",
      priceRange: "₹₹₹",
      image: "http://localhost:2000/avatar/designer-5.png",
      portfolioMatch: 90,
      strengths: ["Silk Work", "Temple Border", "Kalamkari"],
      recentWork: "http://localhost:2000/portfolio/work-5.jpg",
    },
    {
      id: 6,
      name: "Designer 6",
      specialty: "Indo-Western",
      rating: 4.6,
      reviews: 94,
      location: "Location 6",
      turnaround: "2-4 weeks",
      priceRange: "₹₹",
      image: "http://localhost:2000/avatar/designer-6.png",
      portfolioMatch: 87,
      strengths: ["Modern Cuts", "Fusion Design", "Digital Print"],
      recentWork: "http://localhost:2000/portfolio/work-6.jpg",
    },
    {
      id: 7,
      name: "Designer 7",
      specialty: "Lehenga Specialist",
      rating: 4.8,
      reviews: 142,
      location: "Location 7",
      turnaround: "4-5 weeks",
      priceRange: "₹₹₹",
      image: "http://localhost:2000/avatar/designer-7.png",
      portfolioMatch: 93,
      strengths: ["Bandhani", "Patola", "Applique Work"],
      recentWork: "http://localhost:2000/portfolio/work-7.jpg",
    },
    {
      id: 8,
      name: "Designer 8",
      specialty: "Casual Wear",
      rating: 4.5,
      reviews: 67,
      location: "Location 8",
      turnaround: "1-2 weeks",
      priceRange: "₹",
      image: "http://localhost:2000/avatar/designer-8.png",
      portfolioMatch: 82,
      strengths: ["Comfortable Fabrics", "Quick Turnaround", "Affordable"],
      recentWork: "http://localhost:2000/portfolio/work-8.jpg",
    },
    {
      id: 9,
      name: "Designer 9",
      specialty: "Party Wear",
      rating: 4.7,
      reviews: 115,
      location: "Location 9",
      turnaround: "3-4 weeks",
      priceRange: "₹₹₹",
      image: "http://localhost:2000/avatar/designer-9.png",
      portfolioMatch: 89,
      strengths: ["Sequin Work", "Contemporary", "Glamorous"],
      recentWork: "http://localhost:2000/portfolio/work-9.jpg",
    },
    {
      id: 10,
      name: "Designer 10",
      specialty: "Traditional Wear",
      rating: 4.9,
      reviews: 189,
      location: "Location 10",
      turnaround: "3-5 weeks",
      priceRange: "₹₹₹",
      image: "http://localhost:2000/avatar/designer-10.png",
      portfolioMatch: 91,
      strengths: ["Chikankari", "Mukaish", "Shadow Work"],
      recentWork: "http://localhost:2000/portfolio/work-10.jpg",
    },
    {
      id: 11,
      name: "Designer 11",
      specialty: "Minimalist Design",
      rating: 4.6,
      reviews: 78,
      location: "Location 11",
      turnaround: "2-3 weeks",
      priceRange: "₹₹",
      image: "http://localhost:2000/avatar/designer-11.png",
      portfolioMatch: 84,
      strengths: ["Clean Lines", "Subtle Elegance", "Modern"],
      recentWork: "http://localhost:2000/portfolio/work-11.jpg",
    },
    {
      id: 12,
      name: "Designer 12",
      specialty: "Luxury Bridal",
      rating: 5.0,
      reviews: 234,
      location: "Location 12",
      turnaround: "6-8 weeks",
      priceRange: "₹₹₹₹",
      image: "http://localhost:2000/avatar/designer-12.png",
      portfolioMatch: 96,
      strengths: ["Royal Look", "Precious Stones", "Gold Thread"],
      recentWork: "http://localhost:2000/portfolio/work-12.jpg",
    },
  ]

  // Initialize filtered designers with all designers
  React.useEffect(() => {
    setFilteredDesigners(allDesigners)
  }, [])

  // Search functionality
  const handleSearch = (query: string): void => {
    setSearchQuery(query)

    if (!query.trim()) {
      setFilteredDesigners(allDesigners)
      return
    }

    const lowercaseQuery = query.toLowerCase()
    const filtered = allDesigners.filter(
      (designer) =>
        designer.name.toLowerCase().includes(lowercaseQuery) ||
        designer.specialty.toLowerCase().includes(lowercaseQuery) ||
        designer.location.toLowerCase().includes(lowercaseQuery) ||
        designer.strengths.some((strength) => strength.toLowerCase().includes(lowercaseQuery)),
    )

    setFilteredDesigners(filtered)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
        setStep(2)
        setShowUploadModal(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>): void => {
    if (!imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    if (selectedElements.length > 0) {
      const newMarker: Marker = {
        id: Date.now(),
        x,
        y,
        element: selectedElements[0],
      }
      setMarkers([...markers, newMarker])
      setSelectedElements([])
    }
  }

  const toggleElement = (elementId: string): void => {
    setSelectedElements([elementId])
  }

  const removeMarker = (markerId: number): void => {
    setMarkers(markers.filter((m) => m.id !== markerId))
  }

  const handleAnalyze = (): void => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setStep(3)
      // Filter designers based on match scores for step 3
      const topMatches = [...allDesigners].sort((a, b) => b.portfolioMatch - a.portfolioMatch).slice(0, 6)
      setFilteredDesigners(topMatches)
    }, 2000)
  }

  const getElementColor = (elementId: string): string => {
    return designElements.find((e) => e.id === elementId)?.color || "bg-gray-500"
  }

  const getElementLabel = (elementId: string): string => {
    return designElements.find((e) => e.id === elementId)?.label || ""
  }

  const handleViewDesigner = (designer: Designer): void => {
    setSelectedDesigner(designer)
    setShowDesignerModal(true)
  }

  const handleCloseDesignerModal = (e: React.MouseEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    setShowDesignerModal(false)
  }

  const handleOverlayClick = (e: React.MouseEvent): void => {
    if (e.target === e.currentTarget) {
      setShowDesignerModal(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Header */}
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

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-10 relative z-10">
        {/* Page Intro */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm border border-white/5 px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-medium text-gray-300">Visual Inspiration Matcher</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Find Your Perfect Designer</h1>
          <p className="text-gray-400 text-lg">Upload an inspiration image and mark what you love</p>
        </div>

        {/* Search Bar and Add Button - Always visible */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex-1 max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search designers by specialty, location, or style..."
              className="w-full pl-12 pr-6 py-4 bg-gray-900/60 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-white text-black hover:bg-gray-200 flex items-center gap-2 px-6 py-4 rounded-xl font-semibold transition-colors"
          >
            <Plus size={20} />
            Add Inspiration
          </button>
        </div>

        {/* Search Results Count */}
        {(step === 1 || step === 2) && (
          <div className="mb-4 text-sm text-gray-400">
            {searchQuery ? (
              <span>
                Found {filteredDesigners.length} designers matching "{searchQuery}"
              </span>
            ) : (
              <span>Showing all {filteredDesigners.length} designers</span>
            )}
          </div>
        )}

        {/* Designers Table - Show in step 1 and step 2 */}
        {(step === 1 || step === 2) && (
          <div className="bg-gray-900/60 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden mb-8">
            {filteredDesigners.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-2">No designers found</p>
                <p className="text-gray-500 text-sm">Try adjusting your search terms</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Designer</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Specialty</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Location</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Rating</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Turnaround</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Price Range</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDesigners.map((designer) => (
                      <tr key={designer.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={designer.image || "/placeholder.svg"}
                              alt={designer.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <div className="font-medium text-white">{designer.name}</div>
                              <div className="text-xs text-gray-400">{designer.reviews} reviews</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">{designer.specialty}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm text-gray-300">
                            <MapPin className="w-4 h-4" />
                            {designer.location}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-semibold text-white">{designer.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">{designer.turnaround}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{designer.priceRange}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleViewDesigner(designer)}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Designer Detail Modal */}
        {showDesignerModal && selectedDesigner && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-y-auto"
            onClick={handleOverlayClick}
          >
            <div className="bg-gray-900 border border-white/10 rounded-2xl max-w-4xl w-full relative my-8">
              <button
                onClick={handleCloseDesignerModal}
                className="absolute top-4 right-4 z-[60] text-white/90 hover:text-white bg-black/70 hover:bg-black/80 border border-white/10 rounded-full p-2.5 shadow-lg transition-colors pointer-events-auto"
                aria-label="Close dialog"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Hero Image */}
              <div className="relative h-64 overflow-hidden rounded-t-2xl">
                <img
                  src={selectedDesigner.recentWork || "/placeholder.svg"}
                  alt={selectedDesigner.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>

              <div className="p-8">
                {/* Designer Header */}
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={selectedDesigner.image || "/placeholder.svg"}
                    alt={selectedDesigner.name}
                    className="w-20 h-20 rounded-full border-4 border-gray-800"
                  />
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white mb-1">{selectedDesigner.name}</h2>
                    <p className="text-lg text-gray-400 mb-3">{selectedDesigner.specialty}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-white">{selectedDesigner.rating}</span>
                        <span className="text-gray-400">({selectedDesigner.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <MapPin className="w-5 h-5" />
                        {selectedDesigner.location}
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-6 h-6" />
                  </button>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Turnaround Time</p>
                    <p className="text-white font-semibold">{selectedDesigner.turnaround}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Price Range</p>
                    <p className="text-white font-semibold text-xl">{selectedDesigner.priceRange}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Match Score</p>
                    <p className="text-purple-400 font-semibold text-xl">{selectedDesigner.portfolioMatch}%</p>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDesigner.strengths.map((strength) => (
                      <span
                        key={strength}
                        className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>

                {/* About Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">About</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {selectedDesigner.name} specializes in {selectedDesigner.specialty.toLowerCase()} with over years of
                    experience in creating stunning pieces. Based in {selectedDesigner.location}, they bring traditional
                    craftsmanship together with modern design sensibilities to create unique, custom pieces for every
                    client.
                  </p>
                </div>

                {/* Portfolio Preview */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Recent Work</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="aspect-square rounded-lg overflow-hidden bg-white/5">
                        <img
                          src={selectedDesigner.recentWork || "/placeholder.svg"}
                          alt={`Portfolio ${i}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className="flex-1 bg-purple-600 text-white py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                    Contact Designer
                  </button>
                  <button className="px-6 bg-white/5 text-white py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                    Save for Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 ">
            <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-2xl w-full relative py-10">
              <h2 className="text-2xl font-bold text-white mb-4">Upload Inspiration Image</h2>
              <p className="text-gray-400 mb-6">
                Upload a photo of a design you love, and we'll help you find designers who can create something similar.
              </p>

              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center cursor-pointer hover:border-purple-500 hover:bg-white/5 transition-all"
              >
                <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium text-white mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-400">PNG, JPG, or WEBP (Max 10MB)</p>
              </div>

              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>
          </div>
        )}

        {/* Step 2: Mark Elements */}
        {step === 2 && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-900/60 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Select & Click on Image</h3>

              {/* Element Selector */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {designElements.map((element) => (
                  <button
                    key={element.id}
                    onClick={() => toggleElement(element.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedElements.includes(element.id)
                        ? `${element.color} text-white shadow-md scale-105`
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {element.label}
                  </button>
                ))}
              </div>

              {selectedElements.length > 0 && (
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 mb-4">
                  <p className="text-sm text-purple-200">✨ Now click on the image where you see this element</p>
                </div>
              )}

              {/* Markers List */}
              {markers.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-300">Tagged Elements:</p>
                  {markers.map((marker) => (
                    <div key={marker.id} className="flex items-center justify-between bg-white/5 rounded-lg p-2">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${getElementColor(marker.element)} text-white`}
                      >
                        {getElementLabel(marker.element)}
                      </span>
                      <button onClick={() => removeMarker(marker.id)} className="text-gray-400 hover:text-red-500">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {markers.length > 0 && (
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:bg-gray-600 flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Find Designers
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Image Preview with Markers */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
              <div className="relative">
                <img
                  ref={imageRef}
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Uploaded inspiration"
                  className="w-full h-auto rounded-lg cursor-crosshair"
                  onClick={handleImageClick}
                />
                {markers.map((marker) => (
                  <div
                    key={marker.id}
                    className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full ${getElementColor(marker.element)} opacity-90 flex items-center justify-center text-white text-xs font-bold animate-pulse`}
                    style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                  >
                    <div className="absolute inset-0 rounded-full border-2 border-white" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Designer Matches */}
        {step === 3 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                We found {filteredDesigners.length} perfect matches!
              </h2>
              <p className="text-gray-400">
                Based on your tagged elements: {markers.map((m) => getElementLabel(m.element)).join(", ")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDesigners.map((designer) => (
                <div
                  key={designer.id}
                  className="bg-gray-900/60 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors"
                >
                  {/* Portfolio Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={designer.recentWork || "/placeholder.svg"}
                      alt={designer.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-sm font-bold text-purple-400">
                      {designer.portfolioMatch}% Match
                    </div>
                  </div>

                  {/* Designer Info */}
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={designer.image || "/placeholder.svg"}
                        alt={designer.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-white">{designer.name}</h3>
                        <p className="text-sm text-gray-400">{designer.specialty}</p>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{designer.rating}</span>
                        <span>({designer.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{designer.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {designer.strengths.map((strength) => (
                        <span
                          key={strength}
                          className="text-xs bg-purple-500/10 text-purple-300 px-2 py-1 rounded-full"
                        >
                          {strength}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-gray-400">Turnaround:</span>
                      <span className="font-medium">{designer.turnaround}</span>
                    </div>

                    <button
                      onClick={() => handleViewDesigner(designer)}
                      className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                    >
                      View Portfolio & Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => {
                  setStep(2)
                  setMarkers([])
                }}
                className="text-purple-400 font-medium hover:underline"
              >
                ← Try Different Elements
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const Page: React.FC = () => {
  return (
    <div>
      <VisualInspirationMatcher />
    </div>
  )
}

export default Page