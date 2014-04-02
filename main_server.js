//server code
//v1


var play;
var gameInterval;
var i;

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
            //console.log("Dormant state message recieved. (F)");
            //find/create a game for a client
            var message_game = message_parts[1];
            var message_game_type = message_parts[2];
            //1 = Kill lim   |  2 = Surv    game
            //1 = 1v1  |  2 = FFA  |  3 = TDM     type

            //console.log("Message game: " + message_game + " game type: " + message_game_type);
            if (message_game_type > 0 && message_game_type < 4)
                this.findGame(client, message_game, message_game_type);
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
game_server.createGame = function (player, gameKorS, gameGameType) {

    //Create a new game instance
    var thegame = {
        id : UUID(),                //generate a new id for the game
        players: {},
        //player_host:player,         //so we know who initiated the game
        //player_client:null,         //nobody else joined yet, since its new
        player_count: 1,//,              //for simple checking of state
        KorS: 0,//k is 1 S is 2
        gameType: 0,//1 is 1v1, 2 is FFA, 3 is TDM
        isFull: 0 //full is 1
        //gamecore:{}
    };
    thegame.KorS = gameKorS;
    thegame.gameType = gameGameType;

    thegame.players[0] = player;

    thegame.gamecore = new server_instance();

        //Store it in the list of game
    this.games[ thegame.id ] = thegame;

        //Keep track
    this.game_count++;

    player.game = thegame;
    player.inGame = true;
        
    console.log("No games of mode: " + gameKorS + " type: " + gameGameType + " found. Creating new game.");

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
        if (thegame.player_count > 1) {
            for(i = 0; i < thegame.player_count; i++) {
            //for (var stillConnectedPlayer in thegame.players) {
                if (userid != thegame.players[i].userid) {
                    thegame.players[i].send('s.e');
                    this.addDormant(thegame.players[i]);
                }
            }
        }

        delete this.games[gameid];
        this.game_count--;

        console.log('Game removed. there are now ' + this.game_count + ' games' );

    }

}; //game_server.endGame

game_server.startGame = function (game) {
    //console.log("Start the game!");

    game.gamecore.saySomething(game);
        //right so a game has 2 players and wants to begin
        //the host already knows they are hosting,
        //tell the other client they are joining a game
    //s=server message, j=you are joining, send them the host id

    for (i = 0; i < game.player_count; i++) {
        game.players[i].inGame = true;
        game.players[i].game = game;

        game.players[i].send('s.r.' + String(Date.now()).replace('.', '-'));
    }
 
    //set this flag, so that the update loop can run it.
    console.log("Game started.");

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
        //console.log('Adding a dormant. #' + this.dormantCount);

        player.inGame = false;

        this.dormantClients[player.userid] = player;
    }
}

game_server.removeDormant = function (player_ID) {
    //console.log("Removing a dormant");
    delete this.dormantClients[player_ID];
}

//dormant methods to add:
//remove dormant
//search dormant?

game_server.findGame = function(player, gameKorS, gameType) {

    //console.log('Look for game: type: ' + gameType + ' KS: ' + gameKorS + '.');
    console.log( 'Searching for game. Currently : ' + this.game_count + ' games total.');

    //console.log('About to remove player with id:' + player.userid);
    delete this.dormantClients[player.userid];
    this.dormantCount--;
    //console.log('Successful deletion player with id:' + player.userid);

        //so there are games active,
        //lets see if one needs another player
    if(this.game_count) {
                
        var joined_a_game = false;

            //Check the list of games for an open game
        for (var gameid in this.games) {
            //console.log("Seeing if this game is a match");
                //only care about our own properties.
            if(!this.games.hasOwnProperty(gameid)) continue;
                //get the game we are checking against
            var game_instance = this.games[gameid];

            //console.log(" Is full :" + game_instance.isFull);
                //If the game is a player short
            if (game_instance.isFull == 0) {
                //console.log("Not full! Does: " + game_instance.KorS + " == " + gameKorS);
                //console.log("and does: " + game_instance.gameType + " == " + gameType);

                if (game_instance.KorS == gameKorS && gameType == game_instance.gameType) {
                    //console.log("BINGO!");
                    //add player to game.
                    game_instance.players[game_instance.player_count] = player;
                    game_instance.player_count = game_instance.player_count + 1;

                    player.game = game_instance;

                    joined_a_game = true;
                    if (gameType == 1 && game_instance.player_count == 2) {
                        //console.log("Full game!!!");
                        game_instance.isFull = 1;
                    } else if (gameType == 2 && game_instance.player_count == 4) {
                        //console.log("Full game!!!");
                        game_instance.isFull = 1;
                    } else if (gameType == 3 && game_instance.player_count == 4) {
                        //console.log("Full game!!!");
                        game_instance.isFull = 1;
                    }

                    player.send('s.i.' + (game_instance.player_count-1));
                    player.send('s.j.' + player.userid);
                    //tell the players how many people have connected
                    for (i = 0; i < game_instance.player_count; i++) {
                        game_instance.players[i].send('s.n.' + game_instance.player_count);
                    }

                    console.log("User found a game match. Player added.");

                    //start running the game on the server,
                    //which will tell them to respawn/start
                    if (game_instance.isFull == 1) {
                        //console.log("Game is now full.")
                        this.startGame(game_instance);
                    }

                }

            } //full game
        } //for all games

            //now if we didn't join a game,
            //we must create one
        if(!joined_a_game) {

            this.createGame(player, gameKorS, gameType);
            player.send('s.n.1');
            player.send('s.i.0');
            player.send('s.j.' + player.userid);

        } //if no join already

    } else { //no games, create
        this.createGame(player, gameKorS, gameType);
        player.send('s.n.1');
        player.send('s.i.0');
        player.send('s.j.' + player.userid);
    }

}; //game_server.findGame