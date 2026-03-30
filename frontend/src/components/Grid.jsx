import React, { useState } from 'react';
import { GridBlock } from './GridBlock';

export const Grid = ({
  gridState,
  gridSize,
  userId,
  userColor,
  onTileClaim,
  scale = 1
}) => {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.button !== 2) return; // Right click for pan
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const tileSize = Math.max(20, 48 * scale);

  return (
    <div
      className="flex-1 overflow-auto bg-gray-50 rounded-lg border border-gray-200"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      <div
        className="inline-grid gap-0.5 p-4"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, ${tileSize}px)`,
          transform: `translate(${pan.x}px, ${pan.y}px)`,
          transition: isDragging ? 'none' : 'transform 150ms ease-out'
        }}
      >
        {gridState.map((row, rowIdx) =>
          row.map((tile, colIdx) => (
            <GridBlock
              key={`${rowIdx}-${colIdx}`}
              tile={tile}
              userId={userId}
              userColor={userColor}
              onClaim={() =>
                onTileClaim({ row: rowIdx, col: colIdx })
              }
              tileSize={`w-[${tileSize}px] h-[${tileSize}px]`}
            />
          ))
        )}
      </div>
    </div>
  );
};
