export const registerSocketHandlers = (io, gridService) => {
  // Middleware: Log connects/disconnects
  io.use((socket, next) => {
    console.log(`[Socket] Client ${socket.id} attempting connection`);
    next();
  });

  io.on('connection', (socket) => {
    console.log(`[Socket] Client ${socket.id} connected`);

    // User joins
    socket.on('user:join', (data) => {
      const { userId, userColor } = data;

      console.log(`[User:Join] ${userId} joined with color ${userColor}`);

      // Add user to grid service
      gridService.addUser(userId, userColor);

      // Send full grid sync to the joining user
      socket.emit('grid:sync', gridService.getBroadcastState());

      // Broadcast updated state to all users
      io.emit('grid:update', gridService.getBroadcastState());
    });

    // Tile claim
    socket.on('tile:claim', (data) => {
      const { userId, row, col, userColor } = data;

      const result = gridService.claimTile(userId, row, col, userColor);

      if (!result.success) {
        // Send error back to client if needed
        console.log(`[Tile:Claim] Failed: ${result.error}`);
        return;
      }

      console.log(
        `[Tile:Claim] User ${userId} claimed tile (${row}, ${col})`
      );

      // Broadcast the grid update to all connected clients
      io.emit('grid:update', gridService.getBroadcastState());
    });

    // User disconnect
    socket.on('disconnect', (reason) => {
      // Note: We don't have userId from socket object directly,
      // so users are NOT removed on disconnect in this simple version
      // In production, you'd track socket->userId mapping
      console.log(`[Socket] Client ${socket.id} disconnected: ${reason}`);
    });

    // Error handling
    socket.on('error', (error) => {
      console.error(`[Socket Error] ${socket.id}: ${error}`);
    });
  });
};
