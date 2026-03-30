import React from 'react';

export const Stats = ({ onlineUsers, totalTilesClaimed, gridSize }) => {
  const totalTiles = gridSize * gridSize;
  const percentageClaimed = ((totalTilesClaimed / totalTiles) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="grid grid-cols-3 gap-6">
        <div className="stat-item">
          <span className="text-2xl font-bold text-blue-600">
            {onlineUsers}
          </span>
          <span className="text-xs text-gray-600 mt-1">Online Users</span>
        </div>

        <div className="stat-item">
          <span className="text-2xl font-bold text-green-600">
            {totalTilesClaimed}
          </span>
          <span className="text-xs text-gray-600 mt-1">
            Claimed Tiles ({percentageClaimed}%)
          </span>
        </div>

        <div className="stat-item">
          <span className="text-2xl font-bold text-purple-600">
            {totalTiles - totalTilesClaimed}
          </span>
          <span className="text-xs text-gray-600 mt-1">Unclaimed Tiles</span>
        </div>
      </div>
    </div>
  );
};
