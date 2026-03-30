import React from 'react';

export default function Hero() {
  return (
    <div className="relative w-full bg-gradient-to-b from-gaming-fire/5 via-gaming-dark to-gaming-darker overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gaming-fire/10 rounded-full blur-3xl animate-pulse" style={{ animation: 'float 6s ease-in-out infinite' }}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gaming-purple/5 rounded-full blur-3xl animate-pulse" style={{ animation: 'float 8s ease-in-out infinite 1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Main heading */}
        <div className="mb-6">
          <div className="inline-block mb-4 px-4 py-2 rounded-lg glass border border-gaming-fire/50">
            <span className="text-sm uppercase tracking-widest text-gaming-fire font-bold font-gaming">
              Conquer The Grid
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4" style={{ color: '#ff6b35', textShadow: '0 0 30px rgba(255, 107, 53, 0.5)' }}>
            GRID FORCE
          </h2>
          <p className="text-gaming-cyan text-lg md:text-xl font-gaming max-w-2xl mx-auto opacity-90">
            Real-time grid domination. Claim blocks, climb leaderboards, dominate the battlefield.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mt-12 mb-8">
          <div className="glass rounded-lg p-4 border border-gaming-fire/30">
            <div className="text-2xl font-bold text-gaming-gold mb-1">∞</div>
            <div className="text-xs uppercase tracking-widest text-gaming-fire/70 font-gaming">Unlimited</div>
          </div>
          <div className="glass rounded-lg p-4 border border-gaming-fire/30">
            <div className="text-2xl font-bold text-gaming-neon mb-1">⚡</div>
            <div className="text-xs uppercase tracking-widest text-gaming-fire/70 font-gaming">Instant</div>
          </div>
          <div className="glass rounded-lg p-4 border border-gaming-fire/30">
            <div className="text-2xl font-bold text-gaming-cyan mb-1">🎮</div>
            <div className="text-xs uppercase tracking-widest text-gaming-fire/70 font-gaming">Immersive</div>
          </div>
        </div>

        {/* CTA */}
        <p className="text-gaming-fire/80 text-sm font-gaming uppercase tracking-widest animate-pulse">
          Scroll down to claim your first block
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
      `}</style>
    </div>
  );
}
