import WebSocket from "ws";
import { Chess } from 'chess.js'
import { GAME_OVER, INIT_GAME, MOVE } from "./Message";

export class Game {
    public player1:WebSocket;
    public player2:WebSocket;
    public board:Chess;
    public startTime:Date;
    private movesCount = 0;

    constructor(player1:WebSocket,player2:WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
                type:INIT_GAME,
                payload:{
                    color:"white"
                }
        }))
        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"black"
            }
    }))
    }
    makeMove(socket:WebSocket,move:{from:string,to:string}){
        console.log(this.movesCount)
        if(this.movesCount%2==0 && socket!=this.player1) return; //ensure white moves first
        if(this.movesCount%2==1 && socket!=this.player2) return; // then the  black
        try{
            this.board.move(move)
        }catch(e){
            console.log(e);
            return;
        }

        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                   winner: this.board.turn() === 'w'? "black":"white" //previous move made by black to checkmate so black won and now it's white turn and it cant move 
                }
            }))
            this.player2.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                   winner: this.board.turn() === 'w'? "black":"white"
                }
            }))
        }

        if(this.movesCount%2==0){
            this.player2.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }else{
            this.player1.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }
        this.movesCount++;
    }
}