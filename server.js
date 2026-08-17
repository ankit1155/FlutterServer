const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws, req) => {

    console.log("✅ Client Connected :", req.socket.remoteAddress);

    ws.on("message", (message) => {

        const text = message.toString();

        console.log("📩 Received :", text);

        // Sender ko chhodkar sab clients ko bhejo
        wss.clients.forEach((client) => {

            if (
                client !== ws &&
                client.readyState === WebSocket.OPEN
            ) {
                client.send(text);
            }

        });

    });

    ws.on("close", () => {
        console.log("❌ Client Disconnected");
    });

    ws.on("error", (err) => {
        console.log("🔥 Error :", err.message);
    });

});
