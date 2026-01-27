"use client";

import { useState } from "react";

export default function DeciderPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      <main className="max-w-4xl mx-auto px-6 pt-24 pb-20">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            The Decider
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-light">
            Stop searching. Start choosing. The ultimate context-aware decision engine.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 ml-1">What are you deciding on?</label>
            <input
              placeholder="e.g. Which laptop should I buy for 3D rendering?"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-purple-500/50 transition-all text-lg"
             
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 ml-1">Give us your context (Budget, Location, Preferences)</label>
            <textarea
              placeholder="e.g. My budget is $1500, I live in Colombo, I prefer Windows over Mac."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-purple-500/50 transition-all min-h-[120px]"
             
            />
          </div>
          <button
            className="w-full bg-white text-black font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get Final Decision
          </button>
        </div>

        {/* Status & Results Section */}
       
          <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Steps Visualizer */}
            <div className="flex justify-between max-w-md mx-auto">
            </div>
            {/* Final Outcome */}
           
              <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-3xl p-6 md:p-10 backdrop-blur-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-purple-400 font-semibold flex items-center gap-2 italic">
                    <span className="w-8 h-[1px] bg-purple-500/50"></span>
                    Our Expert Verdict
                  </h3>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                     
                
                      className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/15 border border-white/10"
                    >
                     
                    </button>
                    <button
                      
                      className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/15 border border-white/10"
                    >
                      
                    </button>
                  </div>
                </div>
                <div>
                  <div className="text-[17px] md:text-lg leading-relaxed font-light space-y-3">
                    
                  </div>
                  
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                  
                </div>
              </div>
            
          </div>
        
      </main>
    </div>
  );
}

