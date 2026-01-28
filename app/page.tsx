"use client";

import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Brain, Zap, ArrowRight, CheckCircle2, Github, Star, Globe } from 'lucide-react';

export default function DeciderAI() {
  const [scrollY, setScrollY] = useState(0);
  const [activeDemo, setActiveDemo] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [query, setQuery] = useState('');
  const [context, setContext] = useState('');
  const [decision, setDecision] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSubmit = async () => {
    if (!query.trim()) {
      setError('Please enter a query.');
      return;
    }

    setLoading(true);
    setError('');
    setDecision('');

    try {
      const response = await fetch('/api/decide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, context }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setDecision(data.decision);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="relative min-h-screen bg-[#0A0A0F] text-white overflow-hidden font-sans">
      {/* Animated Background Gradient Mesh */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0A0A0F 0%, #1a1a2e 100%)
          `,
          transition: 'background 0.3s ease'
        }}
      />

      {/* Noise Texture Overlay */}
      <div
        className="fixed inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5 backdrop-blur-xl bg-[#0A0A0F]/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                {/* The Glow Effect */}
                <div className="absolute inset-0 bg-white/20 rounded-lg blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />

                {/* The Icon Container */}
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-2.5 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>

              </div>

            </div>

            {/* <div className="hidden md:flex  gap-8 text-sm">
              <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#demo" className="text-gray-400 hover:text-white transition-colors">Demo</a>
              <a href="#tech" className="text-gray-400 hover:text-white transition-colors">Tech Stack</a>
              <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </button>
            </div> */}

            <button className="group relative px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium overflow-hidden transition-all hover:shadow-lg hover:shadow-white/5">
              <span className="relative z-10 flex items-center gap-2 text-white">
                Try Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Hover Highlight Layer */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            className="text-center mb-16 animate-fadeIn"
            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm mb-8 animate-slideDown"
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              <Star className="w-4 h-4 text-blue-400 fill-blue-400" />
              <span className="text-blue-200">Autonomous Decision Intelligence • Production Ready</span>
            </div>

            {/* Main Headline */}
            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-none tracking-tight animate-slideUp"
              style={{
                animationDelay: '0.3s',
                animationFillMode: 'both',
                fontFamily: "'Space Grotesk', 'Outfit', sans-serif"
              }}
            >
              {/* <span className="block bg-gradient-to-r from-black via-blue-400 via-white to-back text-transparent bg-clip-text text-transparent  mb-2">Stop Guessing.</span> */}
              <span className="block bg-gradient-to-r from-black via-blue-400 via-white to-back text-transparent bg-clip-text text-transparent">
                Start Deciding.
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed animate-fadeIn"
              style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            >
              AI-powered decision engine that scrapes live data, resolves conflicts,
              and delivers{' '}
              <span className="text-white font-semibold">unbiased, context-aware recommendations</span>
              {' '}in seconds.
            </p>

          </div>

          {/* Interactive Demo Preview */}
          <div
            className="relative max-w-5xl mx-auto animate-fadeIn"
            style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-20" />
            <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
              {/* Search Interface */}
              <div className="relative mb-6">

                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What are you deciding on?"
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-5 pr-2 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Give us your context (Budget, Location, Preferences) My budget is LKR 150000, I live in Colombo, I prefer Windows over Mac.'"
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-5 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-4 w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Get Final Decision'}
              </button>

              {decision && (
                <div className="mt-6 p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <h3 className="text-green-400 font-semibold mb-2">Decision:</h3>
                  <p className="text-white">{decision}</p>
                </div>
              )}

              {error && (
                <div className="mt-6 p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <h3 className="text-red-400 font-semibold mb-2">Error:</h3>
                  <p className="text-white">{error}</p>
                </div>
              )}

              {/* Processing Animation */}
              {/* <div className="mt-6 p-6 bg-black/40 rounded-xl border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping" />
                  </div>
                  <span className="text-sm text-gray-400">Processing with Groq + Tavily AI...</span>
                </div>
                
                <div className="space-y-3">
                  {['Searching Reddit discussions...', 'Analyzing tech blogs...', 'Cross-referencing reviews...'].map((text, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm animate-slideInLeft"
                      style={{ animationDelay: `${i * 0.2}s`, animationFillMode: 'both' }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">{text}</span>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg">Decider AI</span>
            </div> */}

            <p className="text-gray-500 text-sm">
              Built with  {new Date().getFullYear()}
            </p>

            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                Report Bug
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                Request Feature
              </a>
            </div>
          </div>
        </div>
      </footer>


    </div>
  );
}
