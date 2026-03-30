import React from 'react';

export const Leaderboard = ({ users, currentUserId, userColor }) => {
  const sortedUsers = [...users].sort(
    (a, b) => b.tilesOwned - a.tilesOwned
  );

  const getMedalEmoji = (position) => {
    const medals = ['🥇', '🥈', '🥉'];
    return medals[position] || null;
  };

  const getRankColor = (position) => {
    if (position === 0) return 'text-gaming-gold';
    if (position === 1) return 'text-gray-300';
    if (position === 2) return 'text-orange-600';
    return 'text-gaming-cyan';
  };

  return (
    <div className="leaderboard p-4 rounded-lg">
      <h2 className="text-lg font-bold text-gaming-fire mb-4 font-gaming uppercase tracking-wider">
        ⚡ Leaderboard
      </h2>
      <div className="space-y-2">
        {sortedUsers.map((user, idx) => {
          const isCurrentUser = user.userId === currentUserId;
          const medal = getMedalEmoji(idx);
          const rankClass = getRankColor(idx);

          return (
            <div
              key={user.userId}
              className={`leaderboard-item flex items-center justify-between p-3 rounded backdrop-blur transition-all duration-200 ${
                idx < 3 ? `top-${idx + 1}` : ''
              } ${isCurrentUser ? 'ring-1 ring-gaming-neon' : ''}`}
              style={{
                background: isCurrentUser 
                  ? 'rgba(0, 255, 136, 0.08)' 
                  : 'rgba(15, 20, 25, 0.5)',
                borderColor: isCurrentUser
                  ? 'rgba(0, 255, 136, 0.3)'
                  : 'rgba(255, 107, 53, 0.1)'
              }}
            >
              <div className="flex items-center gap-3 flex-1">
                <span className={`text-lg font-bold w-8 text-center ${rankClass} font-gaming`}>
                  {medal ? medal : `#${idx + 1}`}
                </span>
                <div
                  className="w-2.5 h-2.5 rounded-full shadow-lg"
                  style={{
                    backgroundColor: user.color,
                    boxShadow: `0 0 8px ${user.color}`
                  }}
                />
                <span className="text-sm font-medium text-gaming-cyan">
                  {isCurrentUser
                    ? 'YOU'
                    : user.userId.substring(0, 12)}
                </span>
                {isCurrentUser && (
                  <span className="ml-auto mr-2 text-xs bg-gaming-neon text-gaming-darker px-2 py-0.5 rounded font-bold animate-pulse">
                    ACTIVE
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-gaming-fire font-gaming">
                  {user.tilesOwned}
                </span>
                <span className="text-xs text-gaming-fire opacity-60 ml-1">blocks</span>
              </div>
            </div>
          );
        })}
        {sortedUsers.length === 0 && (
          <p className="text-sm text-gaming-fire opacity-50 text-center py-8 font-gaming">
            Waiting for competitors...
          </p>
        )}
      </div>
    </div>
  );
};
