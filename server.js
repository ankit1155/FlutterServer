const { WebSocketServer, WebSocket } = require("ws");

const PORT = 8080;

const wss = new WebSocketServer({
    host: "0.0.0.0",
    port: PORT,
});

console.log("==================================");
console.log("WebSocket Server Started");
console.log(`Listening on ws://0.0.0.0:${PORT}`);
console.log("==================================");

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
