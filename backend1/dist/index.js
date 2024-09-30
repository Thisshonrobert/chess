"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gameManager = GameManager_1.GameManager.getInstance();
wss.on("connection", function connection(ws) {
    ws.on("error", console.error);
    gameManager.addUser(ws);
    ws.on("disconnect", () => gameManager.removeUser(ws));
    ws.send("Connection established. Welcome!");
});
