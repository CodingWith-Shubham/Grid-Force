export const generateUserColor = (userId) => {
  // Generate a consistent, visually distinct color from user ID
  const hues = [
    '#3b82f6', // blue
    '#ef4444', // red
    '#10b981', // emerald
    '#f59e0b', // amber
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#6366f1', // indigo
    '#14b8a6', // teal
    '#f97316'  // orange
  ];

  const hash = userId
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return hues[hash % hues.length];
};

export const generateColorWithOpacity = (color, opacity = 0.3) => {
  const rgb = hexToRgb(color);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : { r: 0, g: 0, b: 0 };
};

export const generateUserId = () => {
  return `user_${Math.random().toString(36).substr(2, 9)}`;
};

export const isTileOwnedByUser = (tile, userId) => {
  return tile && tile.ownerId === userId;
};

export const getTileBackgroundColor = (tile, userId, userColor) => {
  if (!tile || !tile.ownerId) {
    return 'rgb(255, 255, 255)';
  }

  if (isTileOwnedByUser(tile, userId)) {
    return userColor;
  }

  return generateColorWithOpacity(tile.color, 0.7);
};
