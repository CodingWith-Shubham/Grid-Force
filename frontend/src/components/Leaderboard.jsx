import React from 'react';

export const Leaderboard = ({ users, currentUserId, userColor }) => {
  const sortedUsers = [...users].sort(
    (a, b) => b.tilesOwned - a.tilesOwned
  );

  return (
    <div className="leaderboard p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Leaderboard</h2>
      <div className="space-y-2">
        {sortedUsers.map((user, idx) => (
          <div
            key={user.userId}
            className={`flex items-center justify-between p-2 rounded ${
              user.userId === currentUserId ? 'bg-blue-50' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-600 w-6">
                #{idx + 1}
              </span>
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: user.color }}
              />
              <span className="text-sm font-medium text-gray-700">
                {user.userId === currentUserId
                  ? 'You'
                  : user.userId.substring(0, 12)}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-800">
              {user.tilesOwned}
            </span>
          </div>
        ))}
        {sortedUsers.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            Waiting for players...
          </p>
        )}
      </div>
    </div>
  );
};
