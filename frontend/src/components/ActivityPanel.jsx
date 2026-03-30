import React, { useState, useEffect } from 'react';

export default function ActivityPanel({ activities = [] }) {
  const [displayActivities, setDisplayActivities] = useState([]);

  useEffect(() => {
    setDisplayActivities(activities.slice(0, 8));
  }, [activities]);

  const getActivityIcon = (type) => {
    const icons = {
      claim: '✓',
      capture: '⚔',
      defend: '🛡',
      victory: '👑',
      joined: '→',
      left: '←'
    };
    return icons[type] || '•';
  };

  const getActivityColor = (type) => {
    const colors = {
      claim: 'text-gaming-neon',
      capture: 'text-gaming-fire',
      defend: 'text-gaming-cyan',
      victory: 'text-gaming-gold',
      joined: 'text-gaming-cyan',
      left: 'text-gaming-fire'
    };
    return colors[type] || 'text-gaming-cyan';
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'now';
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) return 'now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return 'earlier';
  };

  return (
    <div className="glass rounded-lg border border-gaming-border p-4 flex flex-col h-full">
      {/* Header */}
      <h3 className="text-sm font-bold text-gaming-fire uppercase tracking-widest font-gaming mb-4">
        📡 Activity Feed
      </h3>

      {/* Activity list */}
      <div className="space-y-2 flex-1 overflow-y-auto">
        {displayActivities.length > 0 ? (
          displayActivities.map((activity, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-2 rounded hover:bg-gaming-card/50 transition-colors duration-200"
            >
              {/* Icon */}
              <span className={`text-lg font-bold flex-shrink-0 ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gaming-cyan leading-tight line-clamp-2">
                  <span className="font-bold">{activity.user?.substring(0, 8)}</span> {activity.message}
                </p>
                <p className="text-xs text-gaming-fire opacity-50 mt-1">
                  {formatTime(activity.timestamp)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-center">
            <p className="text-xs text-gaming-fire opacity-50 font-gaming">
              Waiting for action...
            </p>
          </div>
        )}
      </div>

      {/* Footer indicator */}
      {displayActivities.length > 0 && (
        <div className="pt-3 border-t border-gaming-border text-center">
          <p className="text-xs text-gaming-fire opacity-60 animate-pulse">
            ● Live Activity
          </p>
        </div>
      )}
    </div>
  );
}
