'use client'
import React, { useState, useRef } from 'react';
import { Upload, X, Check, Sparkles, ArrowRight, Heart, Star, MapPin, Plus, Eye } from 'lucide-react';

const VisualInspirationMatcher = () => {
  const [step, setStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedElements, setSelectedElements] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);

  // Design elements that users can tag
  const designElements = [
    { id: 'sleeve', label: 'Sleeve Style', color: 'bg-pink-500' },
    { id: 'neckline', label: 'Neckline', color: 'bg-purple-500' },
    { id: 'embroidery', label: 'Embroidery Pattern', color: 'bg-blue-500' },
    { id: 'color', label: 'Color Combo', color: 'bg-green-500' },
    { id: 'silhouette', label: 'Silhouette', color: 'bg-yellow-500' },
    { id: 'fabric', label: 'Fabric Texture', color: 'bg-red-500' },
  ];

  // Mock designer data - NAMES CHANGED
  const matchedDesigners = [
    {
      id: 1,
      name: 'Designer 1',
      specialty: 'Traditional Embroidery',
      rating: 4.9,
      reviews: 127,
      location: 'Jaipur, Rajasthan',
      turnaround: '2-3 weeks',
      priceRange: '₹₹₹',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      portfolioMatch: 95,
      strengths: ['Mirror Work', 'Zardozi', 'Gota Patti'],
      recentWork: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Designer 2',
      specialty: 'Contemporary Fusion',
      rating: 4.8,
      reviews: 89,
      location: 'Mumbai, Maharashtra',
      turnaround: '3-4 weeks',
      priceRange: '₹₹',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali',
      portfolioMatch: 92,
      strengths: ['Thread Work', 'Sequins', 'Minimalist'],
      recentWork: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Designer 3',
      specialty: 'Bridal Couture',
      rating: 5.0,
      reviews: 203,
      location: 'Delhi',
      turnaround: '4-6 weeks',
      priceRange: '₹₹₹₹',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavita',
      portfolioMatch: 88,
      strengths: ['Heavy Embellishment', 'Stone Work', 'Luxury Fabrics'],
      recentWork: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=300&fit=crop'
    },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setStep(2);
        setShowUploadModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (e) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (selectedElements.length > 0) {
      const newMarker = {
        id: Date.now(),
        x,
        y,
        element: selectedElements[0],
      };
      setMarkers([...markers, newMarker]);
      setSelectedElements([]);
    }
  };

  const toggleElement = (elementId) => {
    setSelectedElements([elementId]);
  };

  const removeMarker = (markerId) => {
    setMarkers(markers.filter(m => m.id !== markerId));
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(3);
    }, 2000);
  };

  const getElementColor = (elementId) => {
    return designElements.find(e => e.id === elementId)?.color || 'bg-gray-500';
  };

  const getElementLabel = (elementId) => {
    return designElements.find(e => e.id === elementId)?.label || '';
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Header */}
      <header className="flex h-[10vh] items-center fixed top-0 left-5 right-0 z-20 px-4 sm:px-6 md:px-8 bg-black/80 backdrop-blur-sm">
        <a href="/" data-discover="true">
          <div className="flex items-baseline text-[2.5rem] text-[rgb(0,182,127)] transition-transform duration-300 cursor-pointer hover:scale-105">
            <span className="font-thin">se</span>
            <span className="font-semibold text-[1.7rem] -tracking-[0.2em]">
              W<i className="italic not-italic text-[1.7rem] tracking-normal">N</i>
            </span>
            <span className="font-normal text-[2.2rem] -tracking-[0.02em]">a.</span>
          </div>
        </a>
      </header>

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-10 relative z-10">
        {/* Page Intro */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm border border-white/5 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-gray-300">Visual Inspiration Matcher</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Find Your Perfect Designer
          </h1>
          <p className="text-gray-400 text-lg">
            Upload an inspiration image and mark what you love
          </p>
        </div>

        {/* Search Bar and Add Button - Always visible */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex-1 max-w-2xl">
            <input
              type="text"
              placeholder="Search designers by specialty, location, or style..."
              className="w-full px-6 py-4 bg-gray-900/60 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="bg-white text-black hover:bg-gray-200 flex items-center gap-2 px-6 py-4 rounded-xl font-semibold transition-colors"
          >
            <Plus size={20} />
            Add Inspiration
          </button>
        </div>

        {/* Designers Table - Show in step 1 and step 2 */}
        {(step === 1 || step === 2) && (
          <div className="bg-gray-900/60 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden mb-8">
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
                  {matchedDesigners.map((designer) => (
                    <tr key={designer.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={designer.image}
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
                        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-2xl w-full relative">
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold text-white mb-4">Upload Inspiration Image</h2>
              <p className="text-gray-400 mb-6">
                Upload a photo of a design you love, and we'll help you find designers who can create something similar.
              </p>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center cursor-pointer hover:border-purple-500 hover:bg-white/5 transition-all"
              >
                <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium text-white mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-400">
                  PNG, JPG, or WEBP (Max 10MB)
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
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
                {designElements.map(element => (
                  <button
                    key={element.id}
                    onClick={() => toggleElement(element.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedElements.includes(element.id)
                        ? `${element.color} text-white shadow-md scale-105`
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {element.label}
                  </button>
                ))}
              </div>

              {selectedElements.length > 0 && (
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 mb-4">
                  <p className="text-sm text-purple-200">
                    ✨ Now click on the image where you see this element
                  </p>
                </div>
              )}

              {/* Markers List */}
              {markers.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-300">Tagged Elements:</p>
                  {markers.map(marker => (
                    <div
                      key={marker.id}
                      className="flex items-center justify-between bg-white/5 rounded-lg p-2"
                    >
                      <span className={`text-xs font-medium px-2 py-1 rounded ${getElementColor(marker.element)} text-white`}>
                        {getElementLabel(marker.element)}
                      </span>
                      <button
                        onClick={() => removeMarker(marker.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
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
                  src={uploadedImage}
                  alt="Uploaded inspiration"
                  className="w-full h-auto rounded-lg cursor-crosshair"
                  onClick={handleImageClick}
                />
                {markers.map(marker => (
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
                We found {matchedDesigners.length} perfect matches!
              </h2>
              <p className="text-gray-400">
                Based on your tagged elements: {markers.map(m => getElementLabel(m.element)).join(', ')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedDesigners.map(designer => (
                <div key={designer.id} className="bg-gray-900/60 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors">
                  {/* Portfolio Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={designer.recentWork}
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
                        src={designer.image}
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
                      {designer.strengths.map(strength => (
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

                    <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                      View Portfolio & Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => {
                  setStep(2);
                  setMarkers([]);
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
  );
};


function page() {
  return (
    <div>
      <VisualInspirationMatcher/>
    </div>
  )
}

export default page