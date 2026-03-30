import React, { useState } from 'react';
import { getTileBackgroundColor, isTileOwnedByUser } from '../utils/colors';

export const GridBlock = ({
  tile,
  userId,
  userColor,
  onClaim,
  tileSize = 'w-12 h-12'
}) => {
  const [isOnCooldown, setIsOnCooldown] = useState(false);

  const handleClick = () => {
    if (isOnCooldown) return;

    setIsOnCooldown(true);
    setTimeout(() => setIsOnCooldown(false), 1000);

    onClaim();
  };

  const backgroundColor = getTileBackgroundColor(tile, userId, userColor);
  const isOwned = tile && tile.ownerId;

  return (
    <div
      onClick={handleClick}
      className={`${tileSize} grid-block ${isOwned ? 'claimed' : 'unclaimed'} ${
        isOnCooldown ? 'opacity-60' : ''
      }`}
      style={{
        backgroundColor,
        cursor: isOnCooldown ? 'not-allowed' : 'pointer',
        transition: 'all 150ms ease-out'
      }}
      title={
        isOwned
          ? `Claimed by ${tile.ownerId.substring(0, 8)}...`
          : 'Click to claim'
      }
    >
      {isOnCooldown && (
        <div className="cooldown-overlay">
          <span className="text-white text-xs font-semibold">Cooldown</span>
        </div>
      )}
    </div>
  );
};
