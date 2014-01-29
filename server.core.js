//server code
//v1

//GAME VARIABLES
//6=mode select
//players
var xpos = [];
var ypos = [];
var xdir = [];
//6=mode select
var ydir = [];
var ground = [];

var fps = 40;

var jumpSpeed = 15 * fps;//was then 25
var playerSpeed = 8 * fps; //it was 8 at fps = 25(40)
var zombieSpeed = 6 * fps; //it was 6 at fps = 25(40)
var playerFallSpeed = 40 * fps; // was 1
var playerLungeSpeed = 15 * fps; // was 15

//player stats
var health = []; // all 25
var fuel = [];
var jetpack = [];
var fuelCount = [];

//kill streaks 25
var streak = [];
var killcount = [];
var healthpack = [];
var healthpackx = [];
var healthpacky = [];

//kills/after game stats
var kills = [];
var deaths = [];
var shotsFired = [];
var shotsHit = [];

//sword
var lunge = [];
var lungeCount = [];
var jump = [];
var jumpCount = [];
var stun = [];
var stunCount = [];

//kill limit/survival
var killLimit = 25;
var teamkills = [];

//shooting
var shooting = [];
var shootCount = [];

//reload
var reload = [];
var reloadCount = [];

//bullets
var b = []; //(25 ,  100)
var bx = [];
var by = [];
var bxdir = [];
var shotType = [];
var bydir = [];
for (i = 0; i < 25; i++) {
    b[i] = [];
    bx[i] = [];
    by[i] = [];
    bxdir[i] = [];
    shotType[i] = [];
    bydir[i] = [];
}

//falling guns
var gunx = [];
var guny = [];
var down = [];
var downCount = [];

//weapons
var gun = []; //(25 ,  2); // double 25 2
for (i = 0; i < 25; i++) {
    gun[i] = [];
}
var equip = [];

//ammo
var ammo = []; //(25 ,  2)
var clips = [];
for (i = 0; i < 25; i++) {
    ammo[i] = [];
    clips[i] = [];
}
var maxAmmo = []; // 10

//blocks
var block = [];
var blockx = [];
var blocky = [];
var blockw = [];
var blockh = [];

//levels
var level = 0;

//IDK
var lives = [];
var tempLives = 0;

//ai
var cpu = [];
var targetx = [];
var targety = [];
var upPath = [];
var zombieAlive = 1;

//counters
var runCount = [];
var pleaseReload = 0;

var swap = [];
var swapCount = [];

var deadCount = [];

var play;

local_time = 0;
_dt = new Date().getTime();
_dte = new Date().getTime();
    //a local queue of messages we delay if faking latency
messages = [];

//var players;

var server_instance = function () {
    console.log('in constructor');

    this.server_time = 0;

    console.log('new server instance');
    //this.laststate = {};
};

//server side we set the 'game_core' class to a global type, so that it can use it anywhere.
if ('undefined' != typeof global) {
    module.exports = global.server_instance = server_instance;//this;//
}

server_instance.prototype.saySomething = function (game_instance) {
    console.log("HLOOOOOOOOOO!");
    //Store the instance, if any
    this.instance = game_instance;

    var ph = this.instance.player_host;
    var pc = this.instance.player_client;

    //We create a player set, passing them
    //the game that is running them, as well
    players = {
        self: new game_player(this, ph),
        other: new game_player(this, pc),
        word: "hello"
    };

    console.log("HELLOOOOOOOOOO!" + players.word);
}

var timer = setInterval(function(){
    this._dt = new Date().getTime() - _dte;
    this._dte = new Date().getTime();
    this.local_time += _dt / 1000.0;
}, 4);
    
var game_player = function (game_instance, player_instance) {
    this.lastInput = null;
    //Store the instance, if any
    this.instance = player_instance;
    this.game = game_instance;
};

server_instance.prototype.initGame = function() {

    //set dirs
    ydir[0] = 0;
    xdir[0] = 0;
    ydir[1] = 0;
    xdir[1] = 0;

    //set positions
    ypos[0] = 410;
    ypos[1] = 410;

    xpos[0] = 670;
    xpos[1] = 10;

    //set guns
    equip[0] = 0;
    gun[0][0] = 1;
    ammo[0][0] = 10;
    clips[0][0] = 3;
    gun[0][1] = 0;
    clips[0][1] = 0;
    ammo[0][1] = 0;

    equip[1] = 0;
    gun[1][0] = 1;
    ammo[1][0] = 10;
    clips[1][0] = 3;
    gun[1][1] = 0;
    clips[1][1] = 0;
    ammo[1][1] = 0;

    play = true;

}; //intigame



server_instance.prototype.process_input = function (player) {
    //console.log("Processing input!");

    /* Example input:
    if (onlineState == 'Connected') {
        //Send the packet of information to the server.
        //The input packets are labelled with an 'i' in front.
        var server_packet = 'i.';
        server_packet += this.local_time.toFixed(3) + '.';
        //identify key up or down
        server_packet += 'd.';
        server_packet += key;

        //Go
        this.socket.send(server_packet);
    }*/

            //don't process ones we already have simulated locally
            //if (player.inputs[j].seq <= player.last_input_seq) continue;

    var input = player.lastInput;
    var sender = player.playerSent;
    var key = input.itype;

    if (input.time == 'd') {
        //player 0-Red
        if (key == 39) {
            if (sender == 'host')
                xpos[0] = xpos[0] + 15;
            else
                xpos[1] = xpos[1] + 15;
        }
        if (key == 37) {
            if (sender == 'host')
                xpos[0] = xpos[0] - 15;
            else
                xpos[1] = xpos[1] + 15;
        }
        if (key == 39) {
            if (sender == 'host')
                xpos[0] = xpos[0] - 15;
            else
                xpos[1] = xpos[1] - 15;
        }
        if (key == 40) {
            //swap
        }
        if (key == 222) {
            //shoot
        }
    }
    if (input.time == 'u') {
        if (key == 39) {
            if (sender == 'host')
                xpos[0] = xpos[0] + 15;
            else
                xpos[1] = xpos[1] + 15;
        }
        if (key == 37) {
            if (sender == 'host')
                xpos[0] = xpos[0] - 15;
            else
                xpos[1] = xpos[1] + 15;
        }
        if (key == 39) {
            if (sender == 'host')
                xpos[0] = xpos[0] - 15;
            else
                xpos[1] = xpos[1] - 15;
        }
        if (key == 40) {
            //swap
        }
        if (key == 222) {
            //shoot
        }
    }

    player.lastInput = null;
            /*for (var i = 0; i < c; i++) {
                var key = input[i];
                if (key == 'l') {
                    x_dir -= 1;
                }*/
                
                /*if(input.itype == 'd')
                //player 1-other
                //right
                if (onlineState == 'Offline') {
                    if (key == 68) {
                        if (play == true && cpu[1] == false) {
                            right[1] = true;
                            left[1] = false;
                        }
                    }
                    //left
                    if (key == 65) {
                        if (play == true && cpu[1] == false) {
                            left[1] = true;
                            right[1] = false;
                        }
                    }
                    //up
                    if (key == 87) {
                        if (play == true && cpu[1] == false) {
                            if (ydir[1] == 0 && ypos[1] == ground[1] - 20) {
                                ydir[1] = -jumpSpeed;
                            } else {
                                if (fuel[1] > 0 && streak[1] >= 3) jetpack[1] = true;
                            }
                        }
                    }
                    //down
                    if (key == 83) {
                        if (play == true && cpu[1] == false) {
                            down[1] = true;
                            //if(reload[1] == false)
                            //{
                            swap[1] = true;
                            //}
                        }
                    }
                    //shoot
                    if (key == 70) {
                        if (play == true && cpu[1] == false) {
                            if (shooting[1] == false && reload[1] == false && stun[1] == false) {
                                shooting[1] = true;
                            }
                        }
                    }*/
                //}
            //} //for all input values
}; //process_input

//(client, input_commands, input_time, input_type, input_seq);
server_instance.prototype.handle_server_input = function (client, input, input_time, input_type, input_seq) {

    //Fetch which client this refers ito out of the two
    var player_client =
        (client.userid == players.self.instance.userid) ?
            players.self : players.other;

    //Store the input on the player instance for processing in the physics loop
    if (client.userid != players.self.instance.userid)
        player_client.lastInput = { inputs: input, time: input_time, itype: input_type, seq: input_seq , playerSent:'host' };
    else
        player_client.lastInput = { inputs: input, time: input_time, itype: input_type, seq: input_seq, playerSent: 'client' };
    //this.process_input(player_client);
    server_instance.prototype.process_input(player_client);

}; //handle_server_input

server_instance.prototype.update = function () {
    if (play) {
        //Update the state of our local clock to match the timer
        this.server_time = this.local_time;

        //process_Input();

        //temporary variables because cannot use array vars?!
        var hostX = xpos[0];
        var hostY = ypos[0];
        var otherX = xpos[1];
        var otherY = ypos[1];

        var hostxdir = xdir[0];
        var hostydir = ydir[0];
        var otherxdir = xdir[1];
        var otherydir = ydir[1];


        //Make a snapshot of the current state, for updating the clients
        this.laststate = new Object();
        this.laststate.hpx = hostX;//this.xpos[0];              //'host position', the game creators position
        this.laststate.hpy = hostY;                //'host position', the game creators position
        this.laststate.hpxdir = hostxdir;             //'host direction'
        this.laststate.hpydir = hostydir;             //'host direction'
        this.laststate.cpx = otherX;               //'client position', the person that joined, their position
        this.laststate.cpy = otherY;               //'client position', the person that joined, their position
        this.laststate.cpxdir = otherxdir;             //'client direction'
        this.laststate.cpydir = otherydir;             //'client direction'
            //his: this.players.self.last_input_seq,     //'host input sequence', the last input we processed for the host
            //cis: this.players.other.last_input_seq,    //'client input sequence', the last input we processed for the client
        this.laststate.t = this.server_time;                      // our current local time on the server

        //Send the snapshot to the 'host' player
        if (players.self.instance) {
            players.self.instance.emit('onserverupdate', this.laststate);
        }

        //Send the snapshot to the 'client' player aaASASDFSGSRFGHS
        if (players.other.instance) {
            players.other.instance.emit('onserverupdate', this.laststate);
        }

        //client.send('s.p.' + message_parts[1]);
    }
}