//server code
//v1


var play;
var gameInterval;

var
    game_server = module.exports = { games: {}, game_count: 0, dormantCount: 0, dormantClients: {} },
    UUID        = require('node-uuid'),
    verbose     = true;

    //Since we are sharing code with the browser, we
    //are going to include some values to handle that.
global.window = global.document = global;

//the game types people can be in:
//Also saved in the gamecore
var KILLLIMIT = 1, SURVIVAL = 2;
var QUICK1V1 = 1, FFA = 2, TDM = 3;

game_server.local_time = 0;
game_server._dt = new Date().getTime();
game_server._dte = new Date().getTime();
    //a local queue of messages we delay if faking latency
game_server.messages = [];

//Import shared game library code.
require('./server.core.js');

setInterval(function(){
    game_server._dt = new Date().getTime() - game_server._dte;
    game_server._dte = new Date().getTime();
    game_server.local_time += game_server._dt/1000.0;
}, 4);

game_server.onMessage = function (client, message) {
    //console.log("Game server message recieved onMessage!!!")

        //Cut the message up into sub components
    var message_parts = message.split('.');
        //The first is always the type of message
    var message_type = message_parts[0];

   // if (message_type != 'p')
        //console.log("Message recieved!");

    if (message_type == 'i') {
        //game_server.log('input recieved');
            //Input handler will forward this
        this.onInput(client, message_parts);
    } else if (message_type == 'm') { ///MAP SELECTED
        //console.log("Map chosen!!!!! onMessage server");
        //this.onMapSelect(client, message_parts[1]);
    } else if (message_type == 'p') {
        client.send('s.p.' + message_parts[1]);
    } else if (message_type == 'c') {    //Client changed their color!
        //if (other_client)
            //other_client.send('s.c.' + message_parts[1]);
    } else if (message_type == 'f') {
        //console.log("F message type");
        if (client.inGame == false) {
            console.log("Dormant state message recieved. (F)");
            //find/create a game for a client
            var message_game = message_parts[1];
            var message_game_type = message_parts[2];
            if (message_game == 1) { //1v1 game
                this.findGame(client);
            } else if (message_game == 2) { //FFA
                this.findGame(client);
            } else if (message_game == 3) { //TDM game
                this.findGame(client);
            }
            else {
                console.log("Command not recognized, finding game anyway");
                this.findGame(client);
            }
        }
    }
    else if (message_type == 'd') {
        console.log("Client wants a disconnect");
        if (client && client.game) {
            console.log("Ending game.");
            this.endGame(client.game.id, client.userid);
            //add the user to the dormants
            this.addDormant(client);
        }
    }

}; //game_server.onMessage

game_server.onMapSelect = function (client, newMap) {
    //console.log("Big server map chosen");
    //the client should be in a game, so
    //we can tell that game to handle the input
    /*if (client && client.game && client.game.gamecore) {
        client.game.gamecore.onMapSelected(newMap);
    }*/
}

game_server.onInput = function(client, parts) {
        //The input commands come in like u-l,
        //so we split them up into separate commands,
    //and then update the players



    var input_commands = parts[1];
    var input_time = parts[2];
    var input_type = parts[3];
    var input_seq = parts[4];

    //console.log("Input recieved");


    //the client should be in a game, so
    //we can tell that game to handle the input
    if (client && client.game && client.game.gamecore && client.game.play == true) {
        //console.log("On Successful input.");
        client.game.gamecore.handle_server_input(client, input_commands, input_time, input_type, input_seq);
    }

}; //game_server.onInput

    //Define some required functions
game_server.createGame = function(player) {

    //Create a new game instance
    var thegame = {
        id : UUID(),                //generate a new id for the game
        player_host:player,         //so we know who initiated the game
        player_client:null,         //nobody else joined yet, since its new
        player_count: 1,//,              //for simple checking of state
        gameType: 0
        //gamecore:{}
    };
    
    thegame.gamecore = new server_instance();
    //server_instance.saySomething();

        //Store it in the list of game
    this.games[ thegame.id ] = thegame;

        //Keep track
    this.game_count++;

        //tell the player that they are now the host
        //s=server message, h=you are hosting
    player.send('s.h.' + String(Date.now()).replace('.', '-'));// was in string thegame.gamecore.local_time
    //console.log('server host at  ' + Date.now());
    player.game = thegame;
    player.hosting = true;
    player.inGame = true;
        
    console.log("Creating new game.");
    //console.log('player ' + player.userid + ' created a game with id ' + player.game.id);

        //return it
    return thegame;

}; //game_server.createGame

//we are requesting to kill a game in progress.
game_server.endGame = function(gameid, userid) {

    var thegame = this.games[gameid];

    if(thegame) {

            //stop the game updates immediate
        thegame.play = false;
        clearInterval(gameInterval);
        clearInterval(thegame.timer);

            //if the game has two players, the one is leaving
        if(thegame.player_count > 1) {

            //send the players the message the game is ending
            if(userid == thegame.player_host.userid) {

                if(thegame.player_client) {
                        //tell them the game is over
                    thegame.player_client.send('s.e');
                    this.addDormant(thegame.player_client);
                    //thegame.player_client.emit('disconnect');
                        //now look for/create a new game.
                    //this.findGame(thegame.player_client);
                }
                    
            } else {
                if(thegame.player_host) {
                        //tell the client the game is ended
                    thegame.player_host.send('s.e');
                    //thegame.player_host.emit('disconnect');
                        //i am no longer hosting, this game is going down
                    thegame.player_host.hosting = false;
                    this.addDormant(thegame.player_host);
                    
                    //now look for/create a new game.
                    //this.findGame(thegame.player_host);
                }
            }
            //socket.clienaaaaaats[thegame.player_host.userid].connection.end();
            //socket.clients[thegame.player_client.userid].connection.end();

        }

        delete this.games[gameid];
        this.game_count--;

        console.log('Game removed. there are now ' + this.game_count + ' games' );

    } else {
        console.log('That game was not found! (already destroyed)');
    }

}; //game_server.endGame

game_server.startGame = function (game) {
    game.gamecore.saySomething(game);
        //right so a game has 2 players and wants to begin
        //the host already knows they are hosting,
        //tell the other client they are joining a game
        //s=server message, j=you are joining, send them the host id
    game.player_client.send('s.j.' + game.player_host.userid);
    game.player_client.game = game;
    game.player_client.inGame = true;

        //now we tell both that the game is ready to start
        //clients will reset their positions in this case.
    game.player_client.send('s.r.'+ String(Date.now()).replace('.','-'));
    game.player_host.send('s.r.' + String(Date.now()).replace('.', '-'));
 
    //set this flag, so that the update loop can run it.
    console.log("Starting a game!");

    game.active = true;

    game.play = true;
    game.gamecore.initGame();
    gameInterval = setInterval(game.gamecore.update, 0);

}; //game_server.startGame

game_server.addDormant = function (player) {
    if (typeof this.dormantClients[player.userid] === 'undefined') {
        //add to a dormant array, to await a message from client for game find
        //then remove from array on disconnect/game search
        this.dormantCount++;
        console.log('Adding a dormant. #' + this.dormantCount);

        player.inGame = false;

        this.dormantClients[player.userid] = player;
    }
}

game_server.removeDormant = function (player_ID) {
    console.log("Removing a dormant");
    delete this.dormantClients[player_ID];
}

//dormant methods to add:
//remove dormant
//search dormant?

game_server.findGame = function(player) {

    console.log('Looking for a game. We have : ' + this.game_count + ' games.');

    //console.log('About to remove player with id:' + player.userid);
    delete this.dormantClients[player.userid];
    this.dormantCount--;
    //console.log('Successful deletion player with id:' + player.userid);

        //so there are games active,
        //lets see if one needs another player
    if(this.game_count) {
                
        var joined_a_game = false;

            //Check the list of games for an open game
        for(var gameid in this.games) {
                //only care about our own properties.
            if(!this.games.hasOwnProperty(gameid)) continue;
                //get the game we are checking against
            var game_instance = this.games[gameid];

                //If the game is a player short
            if(game_instance.player_count < 2) {

                    //someone wants us to join!
                joined_a_game = true;
                    //increase the player count and store
                    //the player as the client of this game
                game_instance.player_client = player;
                //game_instance.gamecore.players.other.instance = player;
                game_instance.player_count++;

                    //start running the game on the server,
                    //which will tell them to respawn/start
                this.startGame(game_instance);

            } //if less than 2 players
        } //for all games

            //now if we didn't join a game,
            //we must create one
        if(!joined_a_game) {

            this.createGame(player);

        } //if no join already

    } else { //no games, create
        this.createGame(player);
    }

}; //game_server.findGame