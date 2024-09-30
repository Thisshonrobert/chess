"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const Message_1 = require("./Message");
class Game {
    constructor(player1, player2) {
        this.movesCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: Message_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: Message_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        console.log(this.movesCount);
        if (this.movesCount % 2 == 0 && socket != this.player1)
            return; //ensure white moves first
        if (this.movesCount % 2 == 1 && socket != this.player2)
            return; // then the  black
        try {
            this.board.move(move);
        }
        catch (e) {
            console.log(e);
            return;
        }
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: Message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? "black" : "white" //previous move made by black to checkmate so black won and now it's white turn and it cant move 
                }
            }));
            this.player2.send(JSON.stringify({
                type: Message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? "black" : "white"
                }
            }));
        }
        if (this.movesCount % 2 == 0) {
            this.player2.send(JSON.stringify({
                type: Message_1.MOVE,
                payload: move
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: Message_1.MOVE,
                payload: move
            }));
        }
        this.movesCount++;
    }
}
exports.Game = Game;
