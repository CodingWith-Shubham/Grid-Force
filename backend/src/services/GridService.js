class GridService {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.grid = this.initializeGrid();
    this.users = new Map();
    this.userCooldowns = new Map();
    this.tileClaimCooldown = 1000; // 1 second cooldown
  }

  initializeGrid() {
    const grid = [];
    for (let row = 0; row < this.gridSize; row++) {
      const gridRow = [];
      for (let col = 0; col < this.gridSize; col++) {
        gridRow.push({
          ownerId: null,
          color: null,
          claimedAt: null
        });
      }
      grid.push(gridRow);
    }
    return grid;
  }

  addUser(userId, userColor) {
    this.users.set(userId, {
      userId,
      color: userColor,
      tilesOwned: 0,
      joinedAt: Date.now()
    });
    this.userCooldowns.set(userId, 0);
  }

  removeUser(userId) {
    this.users.delete(userId);
    this.userCooldowns.delete(userId);
    // Reset all tiles owned by this user
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        if (this.grid[row][col].ownerId === userId) {
          this.grid[row][col] = {
            ownerId: null,
            color: null,
            claimedAt: null
          };
        }
      }
    }
  }

  claimTile(userId, row, col, userColor) {
    // Validation
    if (row < 0 || row >= this.gridSize || col < 0 || col >= this.gridSize) {
      return { success: false, error: 'Invalid coordinates' };
    }

    // Check cooldown
    const now = Date.now();
    const lastClaimTime = this.userCooldowns.get(userId) || 0;
    if (now - lastClaimTime < this.tileClaimCooldown) {
      return { success: false, error: 'Cooldown active' };
    }

    const tile = this.grid[row][col];
    const wasOwnedByCurrentUser = tile.ownerId === userId;

    // If different user owns it, this is a contested claim
    // The server decides (first claim wins, or in case of true simultaneous,
    // server processes in order)
    // For now: always let the new claim happen (simple approach)

    // Update tile count for previous owner
    if (tile.ownerId && tile.ownerId !== userId) {
      const prevOwner = this.users.get(tile.ownerId);
      if (prevOwner) {
        prevOwner.tilesOwned = Math.max(0, prevOwner.tilesOwned - 1);
      }
    }

    // Update tile count if claiming for the first time
    if (!wasOwnedByCurrentUser && tile.ownerId !== userId) {
      const user = this.users.get(userId);
      if (user) {
        user.tilesOwned += 1;
      }
    }

    // Claim the tile
    this.grid[row][col] = {
      ownerId: userId,
      color: userColor,
      claimedAt: now
    };

    // Update cooldown
    this.userCooldowns.set(userId, now);

    return { success: true, grid: this.getGridState() };
  }

  getGridState() {
    return this.grid;
  }

  getUsersState() {
    return Array.from(this.users.values());
  }

  getTotalTilesClaimed() {
    let count = 0;
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        if (this.grid[row][col].ownerId) {
          count++;
        }
      }
    }
    return count;
  }

  getBroadcastState() {
    return {
      grid: this.getGridState(),
      users: this.getUsersState(),
      totalTilesClaimed: this.getTotalTilesClaimed()
    };
  }
}

export default GridService;
