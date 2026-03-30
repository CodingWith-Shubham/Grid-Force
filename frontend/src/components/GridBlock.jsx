import React, { useState, useRef } from 'react';
import { getTileBackgroundColor, isTileOwnedByUser } from '../utils/colors';

export const GridBlock = ({
  tile,
  userId,
  userColor,
  onClaim,
  tileSize = 'w-12 h-12'
}) => {
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const rippleRef = useRef(null);

  const handleClick = (e) => {
    if (isOnCooldown) return;

    // Create ripple effect
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);

    setIsOnCooldown(true);
    setTimeout(() => setIsOnCooldown(false), 1000);

    onClaim();
  };

  const backgroundColor = getTileBackgroundColor(tile, userId, userColor);
  const isOwned = tile && tile.ownerId;
  const isUserOwned = isOwned && tile.ownerId === userId;

  // Get glow color based on ownership
  let glowColor = 'rgba(255, 107, 53, 0.5)';
  if (isUserOwned) {
    glowColor = 'rgba(0, 255, 136, 0.6)';
  } else if (isOwned) {
    glowColor = `${backgroundColor}80`;
  }

  return (
    <div
      onClick={handleClick}
      className={`${tileSize} grid-block ${isOwned ? 'claimed' : 'unclaimed'} relative ${
        isOnCooldown ? 'opacity-60' : ''
      }`}
      style={{
        backgroundColor,
        cursor: isOnCooldown ? 'not-allowed' : 'pointer',
        transition: isOnCooldown ? 'none' : 'all 150ms ease-out',
        boxShadow: isOwned 
          ? `0 0 15px ${glowColor}, inset 0 0 10px ${glowColor}30`
          : 'inset 0 0 10px rgba(255, 107, 53, 0.1)',
      }}
      title={
        isOwned
          ? `Claimed by ${tile.ownerId.substring(0, 8)}...`
          : 'Click to claim'
      }
    >
      {/* Ripple effect */}
      {showRipple && (
        <div
          ref={rippleRef}
          className="absolute inset-0 rounded animate-ripple"
          style={{
            background: `radial-gradient(circle, ${glowColor}, transparent)`,
            pointerEvents: 'none'
          }}
        ></div>
      )}

      {/* Inner glow effect */}
      <div 
        className="absolute inset-0 rounded opacity-0 hover:opacity-100 transition-opacity duration-200"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}20, transparent)`,
          pointerEvents: 'none'
        }}
      ></div>

      {/* Cooldown overlay */}
      {isOnCooldown && (
        <div className="cooldown-overlay">
          <span className="text-xs font-gaming">Cooldown</span>
        </div>
      )}
    </div>
  );
};
