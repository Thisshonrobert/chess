import WebSocket from "ws";
import { Game } from "./Game";
import { INIT_GAME, MOVE } from "./Message";

export class GameManager{
    private games :Game[] = [];
    private static instance :GameManager;
    private pendingUser:WebSocket | null;
    private users:WebSocket[];
    private constructor(){
            this.games = [];
            this.users = [];
            this.pendingUser = null;
            
    }

    public static getInstance():GameManager{
        if(!GameManager.instance){
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    public addUser(socket:WebSocket){
        this.users.push(socket)
        this.addHandler(socket)
    }

    public removeUser(socket:WebSocket){
        this.users = this.users.filter((user)=>user != socket)
    }

    private addHandler(socket:WebSocket){
        socket.on('message',(data)=>{
            const message = JSON.parse(data.toString());

            if(message.type === INIT_GAME){
                if(this.pendingUser){
                    const game = new Game(this.pendingUser,socket)
                    this.games.push(game)
                    this.pendingUser = null;
                }else{
                    this.pendingUser = socket
                }
            }

            if(message.type === MOVE){
                const game = this.games.find((game)=>game.player1 === socket || game.player2 ===socket);
                if(game){
                    game.makeMove(socket,message.move)
                }
            }
        })
    }
   

}