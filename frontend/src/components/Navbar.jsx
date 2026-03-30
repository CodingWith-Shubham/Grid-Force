import React from 'react';

export default function Navbar({ gridSize, totalBlocks, claimedBlocks }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gaming-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg gaming-border flex items-center justify-center">
            <span className="text-gaming-fire font-bold text-lg font-gaming">⚡</span>
          </div>
          <div>
            <h1 className="neon-text text-2xl font-black leading-tight">GRID</h1>
            <p className="text-xs uppercase tracking-widest text-gaming-fire opacity-75">Force</p>
          </div>
        </div>

        {/* Center Stats */}
        <div className="hidden md:flex items-center gap-8">
          <div className="text-center">
            <div className="text-xs uppercase tracking-widest text-gaming-fire opacity-70 font-gaming">Grid Size</div>
            <div className="text-xl font-bold text-white neon-text">{gridSize}x{gridSize}</div>
          </div>
          <div className="w-px h-8 bg-gradient-to-b from-gaming-fire via-gaming-fire to-transparent opacity-50"></div>
          <div className="text-center">
            <div className="text-xs uppercase tracking-widest text-gaming-fire opacity-70 font-gaming">Blocks Claimed</div>
            <div className="text-xl font-bold text-white neon-text">{claimedBlocks} / {totalBlocks}</div>
          </div>
          <div className="w-px h-8 bg-gradient-to-b from-gaming-fire via-gaming-fire to-transparent opacity-50"></div>
          <div className="text-center">
            <div className="text-xs uppercase tracking-widest text-gaming-fire opacity-70 font-gaming">Completion</div>
            <div className="text-xl font-bold text-white neon-text">{totalBlocks > 0 ? Math.round((claimedBlocks / totalBlocks) * 100) : 0}%</div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <div className="text-xs uppercase tracking-widest text-gaming-cyan opacity-70 font-gaming">Status</div>
            <div className="text-sm font-bold text-gaming-neon animate-bounce">LIVE</div>
          </div>
          <div className="w-3 h-3 rounded-full bg-gaming-neon animate-pulse"></div>
        </div>
      </div>
    </nav>
  );
}
