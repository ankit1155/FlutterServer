const WebSocket = require("ws");

const server = new WebSocket.Server({
  port: 8080,
});

server.on("connection", (socket) => {

  console.log("🟢 Client connected");


  socket.on("message", (message, isBinary) => {

    try {

      // ============================
      // IMAGE / BINARY DATA
      // ============================

      if (isBinary) {

        console.log("🖼️ Image received");
        console.log("Image size:", message.length, "bytes");


        // Send image to all connected clients
        server.clients.forEach((client) => {

          if (client.readyState === WebSocket.OPEN) {

            client.send(message, {
              binary: true
            });

          }

        });

        return;
      }


      // ============================
      // TEXT / JSON MESSAGE
      // ============================

      const data = JSON.parse(message.toString());

      console.log("📩 Received:");
      console.log("Message:", data.message);
      console.log("Login ID:", data.loginId);
      console.log("Chat ID:", data.chatId);


      // Send JSON message to all clients
      server.clients.forEach((client) => {

        if (client.readyState === WebSocket.OPEN) {

          client.send(JSON.stringify(data));

        }

      });

    } catch (error) {

      console.log("❌ Error:", error.message);

    }

  });


  // ============================
  // CLIENT DISCONNECTED
  // ============================

  socket.on("close", () => {

    console.log("🔴 Client disconnected");

  });


  // ============================
  // SOCKET ERROR
  // ============================

  socket.on("error", (error) => {

    console.log("❌ Socket error:", error.message);

  });

});


console.log("🚀 WebSocket server running on port 8080");
