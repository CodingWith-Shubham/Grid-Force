import React from 'react';

export const Stats = ({ onlineUsers, totalTilesClaimed, gridSize }) => {
  const totalTiles = gridSize * gridSize;
  const percentageClaimed = ((totalTilesClaimed / totalTiles) * 100).toFixed(1);
  const unclaimedTiles = totalTiles - totalTilesClaimed;

  return (
    <div className="glass rounded-lg border border-gaming-border p-6 space-y-4">
      {/* Section title */}
      <h3 className="text-sm font-bold text-gaming-fire uppercase tracking-widest font-gaming">
        Battle Stats
      </h3>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Online Users */}
        <div className="stat-item">
          <div className="text-xs uppercase tracking-widest text-gaming-cyan opacity-70 font-gaming mb-2">
            Combatants
          </div>
          <div className="flex items-baseline gap-2">
            <span className="stat-value">{onlineUsers}</span>
            <span className="text-xs text-gaming-fire opacity-60">active</span>
          </div>
          <div className="mt-3 h-1 bg-gaming-card rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gaming-cyan to-gaming-neon"
              style={{ width: `${Math.min((onlineUsers / 10) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Claimed Tiles */}
        <div className="stat-item">
          <div className="text-xs uppercase tracking-widest text-gaming-fire opacity-70 font-gaming mb-2">
            Territory Claimed
          </div>
          <div className="flex items-baseline gap-2">
            <span className="stat-value">{totalTilesClaimed}</span>
            <span className="text-xs text-gaming-fire opacity-60">of {totalTiles}</span>
          </div>
          <div className="mt-3 h-1 bg-gaming-card rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gaming-fire to-gaming-fireAlt"
              style={{ width: `${percentageClaimed}%` }}
            ></div>
          </div>
        </div>

        {/* Unclaimed Tiles */}
        <div className="stat-item">
          <div className="text-xs uppercase tracking-widest text-gaming-purple opacity-70 font-gaming mb-2">
            Unclaimed Zones
          </div>
          <div className="flex items-baseline gap-2">
            <span className="stat-value text-gaming-purple">{unclaimedTiles}</span>
            <span className="text-xs text-gaming-fire opacity-60">{(100 - percentageClaimed).toFixed(1)}%</span>
          </div>
          <div className="mt-3 h-1 bg-gaming-card rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gaming-purple to-gaming-cyan"
              style={{ width: `${100 - percentageClaimed}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Completion bar */}
      <div className="pt-4 border-t border-gaming-border">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs uppercase tracking-widest text-gaming-fire opacity-70 font-gaming">
            Grid Completion
          </span>
          <span className="text-sm font-bold text-gaming-neon font-gaming">{percentageClaimed}%</span>
        </div>
        <div className="h-2 bg-gaming-card rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gaming-cyan via-gaming-neon to-gaming-fire transition-all duration-500"
            style={{ width: `${percentageClaimed}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
