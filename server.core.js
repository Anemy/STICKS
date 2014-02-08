//server code
//v1

//GAME VARIABLES
//6=mode select
//players
/*var xpos = [];
var ypos = [];
var xdir = [];
//6=mode select
var ydir = [];
var ground = [];
var right = [];
var left = [];
var directionFacing = [];*/

var fps = 40;

var jumpSpeed = 15 * fps;//was then 25
var playerSpeed = 8 * fps; //it was 8 at fps = 25(40)
var playerFallSpeed = 40 * fps; // was 1
var playerLungeSpeed = 15 * fps; // was 15

//player stats
/*var health = []; // all 25
var fuel = [];
var jetpack = [];
var fuelCount = [];*/

//kill streaks 25
/*var streak = [];
var killcount = [];
var healthpack = [];
var healthpackx = [];
var healthpacky = [];*/

//kills/after game stats
/*var kills = [];
var deaths = [];
var shotsFired = [];
var shotsHit = [];*/

//kill limit/survival
var killLimit = 25;
var teamkills = [];

//shooting
/*var shooting = [];
var shootCount = [];

//reload
var reload = [];
var reloadCount = [];*/

//bullets
/*var b = []; //(25 ,  100)
var bx = [];
var by = [];
var bxdir = [];
var shotType = [];
var bydir = [];
for (i = 0; i < 25; i++) {
    gamePlayers[i].b = [];
    gamePlayers[i].bx = [];
    gamePlayers[i].by = [];
    gamePlayers[i].bxdir = [];
    gamePlayers[i].shotType = [];
    gamePlayers[i].bydir = [];
}*/

//falling guns
var gunx = [];
var guny = [];

/*var down = [];
var downCount = [];*/

//weapons
/*var flameDis = [];
var gun = []; //(25 ,  2); // double 25 2
for (i = 0; i < 25; i++) {
    gamePlayers[i].flameDis = [];
    gun[i] = [];
}
var equip = [];*/

/*//ammo
var ammo = []; //(25 ,  2)
var clips = [];
for (i = 0; i < 25; i++) {
    ammo[i] = [];
    gamePlayers[i].clips = [];
}*/
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
/*var lives = [];

var swapCount = [];

var deadCount = [];*/

var play;

local_time = 0;
_dt = new Date().getTime();
_dte = new Date().getTime();
    //a local queue of messages we delay if faking latency
messages = [];

//var players;

var then;

var playerCount = 2;

//should update or not?!
var serverHasUpdate = true;

//bools to decide to send vars or not
var newClipAmount = false;
var newGunEquiped = false;
var updateHealth = false;
var updateLives = false;
var newAmmoAmount = false;
var killUpdate = false;
var fullUpdate = false;

var lastFullUpdate = 0;

var killBullets = [];

var gamePlayers = [];

var startTime = Date.now();
var mapSelected = false;

var game_player = function (game_instance, player_instance, playerNum) {
    this.lastInput = null;
    //Store the instance, if any
    this.instance = player_instance;
    this.game = game_instance;

    this.playerID;
    this.playerNumber = playerNum;

    this.xpos = 0;
    this.ypos = 0;
    this.xdir = 0;
    //6=mode select
    this.ydir = 0;
    this.ground = 0;
    this.right = 0;
    this.left = 0;
    this.directionFacing = 0;

    //ammo
    this.ammo = []; //(25 ,  2)
    this.clips = [];

    this.flameDis = [];
    this.shotgunDis = [];
    this.gun = []; //(25 ,  2); // double 25 2

    this.equip = [];

    this.lives = -1;

    this.swapCount = 0;

    this.deadCount = 0;

    this.down = false;
    this.downCount = 0;

    //array of 100 bullets
    this.b = []; //(25 ,  100)
    this.bx = [];
    this.by = [];
    this.bxdir = [];
    this.shotType = [];
    this.bydir = [];

    //shooting
    this.shooting = false;
    this.shootCount = 0;

    //reload
    this.reload = false;
    this.reloadCount = 0;

    //player stats
    this.health = 20; // all 25
    this.fuel = 0;
    this.jetpack = false;
    this.fuelCount = 0;

    //kill streaks 25
    this.streak = 0;
    this.killcount = 0;
    this.healthpack = false;
    this.healthpackx = -1000;
    this.healthpacky = -1000;

    //kills/after game stats
    this.kills = 0;
    this.deaths = 0;
    this.shotsFired = 0;
    this.shotsHit = 0;
};

//ONLINE BULLET VARS
var newBullets = [];
/*var newBullet = function (x, y, dir, send, type) {
    var newBulletType = type;
    var newBulletX = x;
    var newBulletY = y;
    var newBulletDir = dir;  //true = right // false = left
    var newBulletSender = send;
};*/

//guns that have been picked up already
var deadGuns = [];
//ONLINE NEW GUN VARS
var newGuns = [];
/*var newGun = function (x, y, gunType) {
    var newGunX = x;
    var newGunY = y;
    var newGunType = gunType;  //true = right // false = left
};*/

var server_instance = function () {
    console.log("Creating new server instance.");
    this.server_time = 0;
    //this.laststate = {};
};

//server side we set the 'game_core' class to a global type, so that it can use it anywhere.
if ('undefined' != typeof global) {
    module.exports = global.server_instance = server_instance;//this;//
}

server_instance.prototype.saySomething = function (game_instance) {
    //Store the instance, if any
    this.instance = game_instance;

    var ph = this.instance.player_host;
    var pc = this.instance.player_client;

    //We create a player set, passing them
    //the game that is running them, as well
    players = {
        self: new game_player(this, ph, 0),
        other: new game_player(this, pc, 1),
    };

    gamePlayers[0] = new game_player(this, ph, 0);
    gamePlayers[1] = new game_player(this, pc, 0);
}

create_timer = function () {
    setInterval(function () {
        this._dt = Date.now() - this._dte;
        this._dte = Date.now();
        this.local_time += this._dt / 1000.0;
    }.bind(this), 4);
}

//start the game + set vars
server_instance.prototype.initGame = function () {
    then = Date.now();

    create_timer();

    if (mapSelected == false) {
        level = 1;
        loadMap();
    }

    //max ammo
    maxAmmo[0] = 10;
    maxAmmo[1] = 12;
    maxAmmo[2] = 20;
    maxAmmo[3] = 4;
    maxAmmo[4] = 60;
    maxAmmo[5] = 5;
    maxAmmo[6] = 4;
    maxAmmo[7] = 6;

    for(var i = 0; i < playerCount; i++) {
        //set sides
        gamePlayers[i].right = false;
        gamePlayers[i].left = false;

        for (k = 0; k <= 99; k++) {
            gamePlayers[i].shotType[k] = 0;
            gamePlayers[i].b[k] = false;
            gamePlayers[i].bx[k] = -100;
            gamePlayers[i].by[k] = -100
            gamePlayers[i].bxdir[k] = 0;
            gamePlayers[i].bydir[k] = 0;
        }

        //set dirs
        gamePlayers[i].ydir = 0;
        gamePlayers[i].ydir = 0;

        //set positions
        gamePlayers[i].ypos = 410;


        //set guns
        gamePlayers[i].equip = 0;
        gamePlayers[i].gun[0] = 1;
        gamePlayers[i].ammo[0] = 10;
        gamePlayers[i].clips[0] = 3;
        gamePlayers[i].gun[1] = 0;
        gamePlayers[i].clips[1] = 0;
        gamePlayers[i].ammo[1] = 0;

        gamePlayers[i].down = false;
        gamePlayers[i].downCount = 0;

        gamePlayers[i].ydir = 0;
        gamePlayers[i].swapCount = 0;
        gamePlayers[i].runCount = 0;
        gamePlayers[i].directionFacing = 1;
        gamePlayers[i].ground = 430;
        
        gamePlayers[i].jetpack = false;
        gamePlayers[i].fuelCount = 0;
        gamePlayers[i].fuel = 0;

        gamePlayers[i].streak = 0;
        gamePlayers[i].killCount = 0;

        gamePlayers[i].shooting = false;
        gamePlayers[i].shootCount = 0;

        gamePlayers[i].healthpack = false;
        gamePlayers[i].healthpacky = -20;
        gamePlayers[i].healthpacky = -20;

        gamePlayers[i].health = 20;
        //lives[i] = 5;

        gamePlayers[i].kills = 0;
        gamePlayers[i].deaths = 0;
        gamePlayers[i].deadCount = 100;

        gamePlayers[i].shotsFired = 0;
        gamePlayers[i].shotsHit = 0;

        gamePlayers[i].left = false;
        gamePlayers[i].right = false;

        gamePlayers[i].jump = false;
        gamePlayers[i].jumpCount = 0;

        //reload vars
        gamePlayers[i].reload = false;
        gamePlayers[i].reloadCount = 0;


    }

    //creating new guns
    for (k = 0; k <= 7; k++) {
        gunx[k] = (Math.random() * 1380) + 2;
        guny[k] = -20 - ((Math.random() * 1500));
        var newGun = {//function (x, y, gunType) 
            newGunX: gunx[k],
            newGunY: guny[k],
            newGunType: k
        };
        newGuns.push(newGun);
        //newGuns.push(newGun(gunx[k],guny[k],k));
    }

    gamePlayers[0].xpos = 670;
    gamePlayers[1].xpos = 10;

    lastFullUpdate = 0;
    console.log("Successfully init game");

    play = true;

}; //intigame
//end init game

function loadMap() {

    for (i = 0; i < 12; i++) { //set all blocks to false
        block[i] = false;
    }

    if (level == 1) {
        block[0] = true;
        block[1] = true;
        block[2] = true;
        block[3] = true;

        blockx[0] = 0;
        blocky[0] = 350;
        blockw[0] = 60;
        blockh[0] = 20;

        blockx[1] = 60;
        blocky[1] = 300;//300
        blockw[1] = 120;
        blockh[1] = 20;

        blockx[2] = 250;
        blocky[2] = 200;
        blockw[2] = 90;
        blockh[2] = 20;

        blockx[3] = 600;
        blocky[3] = 360;
        blockw[3] = 100;
        blockh[3] = 20;
    }
    if (level == 2) {
        block[0] = true;
        block[1] = true;
        block[2] = true;
        block[3] = true;
        block[4] = true;
        block[5] = true;
        block[6] = true;

        blockx[0] = 0;
        blocky[0] = 350;
        blockw[0] = 60;
        blockh[0] = 20;

        blockx[1] = 60;
        blocky[1] = 250;
        blockw[1] = 120;
        blockh[1] = 20;

        blockx[2] = 0;
        blocky[2] = 150;
        blockw[2] = 100;
        blockh[2] = 20;

        blockx[3] = 500;
        blocky[3] = 150;
        blockw[3] = 200;
        blockh[3] = 20;

        blockx[4] = 600;
        blocky[4] = 340;
        blockw[4] = 100;
        blockh[4] = 20;

        blockx[5] = 270;
        blocky[5] = 340;
        blockw[5] = 150;
        blockh[5] = 20;

        blockx[6] = 600;
        blocky[6] = 250;
        blockw[6] = 100;
        blockh[6] = 20;
    }
    if (level == 3) {
        block[0] = true;
        block[1] = true;
        block[2] = true;
        block[3] = true;
        block[4] = true;
        block[5] = true;

        blockx[0] = 0;
        blocky[0] = 350;
        blockw[0] = 60;
        blockh[0] = 20;

        blockx[1] = 0;
        blocky[1] = 250;
        blockw[1] = 250;
        blockh[1] = 20;

        blockx[2] = 100;
        blocky[2] = 350;
        blockw[2] = 60;
        blockh[2] = 20;

        blockx[4] = 450;
        blocky[4] = 100;
        blockw[4] = 250;
        blockh[4] = 20;

        blockx[5] = 300;
        blocky[5] = 180;
        blockw[5] = 100;
        blockh[5] = 20;

        blockx[3] = 525;
        blocky[3] = 350;
        blockw[3] = 150;
        blockh[3] = 20;

    }
    if (level == 5) {
        block[0] = true;
        block[1] = true;
        block[2] = true;
        block[3] = true;
        block[4] = true;
        block[5] = true;

        block[6] = true;
        block[7] = true;
        block[8] = true;
        block[9] = true;
        block[10] = true;
        block[11] = true;

        blockx[0] = 0;
        blocky[0] = 350;
        blockw[0] = 60;
        blockh[0] = 20;

        blockx[1] = 0;
        blocky[1] = 250;
        blockw[1] = 250;
        blockh[1] = 20;

        blockx[2] = 100;
        blocky[2] = 350;
        blockw[2] = 60;
        blockh[2] = 20;

        blockx[4] = 450;
        blocky[4] = 100;
        blockw[4] = 250;
        blockh[4] = 20;

        blockx[5] = 300;
        blocky[5] = 180;
        blockw[5] = 100;
        blockh[5] = 20;

        blockx[3] = 525;
        blocky[3] = 350;
        blockw[3] = 150;
        blockh[3] = 20;



        blockx[6] = 1400 - 60 - 0;
        blocky[6] = 350;
        blockw[6] = 60;
        blockh[6] = 20;

        blockx[7] = 1400 - 250 - 0;
        blocky[7] = 250;
        blockw[7] = 250;
        blockh[7] = 20;

        blockx[8] = 1400 - 60 - 100;
        blocky[8] = 350;
        blockw[8] = 60;
        blockh[8] = 20;

        blockx[9] = 1400 - 250 - 450;
        blocky[9] = 100;
        blockw[9] = 250;
        blockh[9] = 20;

        blockx[10] = 1400 - 100 - 300;
        blocky[10] = 180;
        blockw[10] = 100;
        blockh[10] = 20;

        blockx[11] = 1400 - 525 - 150;
        blocky[11] = 350;
        blockw[11] = 150;
        blockh[11] = 20;

    }
    if (level == 4 && play == false) {
        block[0] = true;
        block[1] = true;
        block[2] = true;

        blockx[0] = 130;
        blocky[0] = 350;
        blockw[0] = 120;
        blockh[0] = 20;

        blockx[1] = 290;
        blocky[1] = 280;
        blockw[1] = 120;
        blockh[1] = 20;

        blockx[2] = 450;
        blocky[2] = 350;
        blockw[2] = 120;
        blockh[2] = 20;

    }
    if (level == 6) {
        block[0] = true;
        block[1] = true;
        //block[2] = true;
        block[3] = true;
        block[4] = true;
        block[5] = true;
        block[6] = true;
        block[7] = true;
        block[8] = true;
        block[9] = true;

        blockx[0] = 100;
        blocky[0] = 350;
        blockw[0] = 300;
        blockh[0] = 20; //bottom

        blockx[1] = 300;
        blocky[1] = 250;
        blockw[1] = 100;
        blockh[1] = 20;

        //blockx[2] = 400;
        //blocky[2] = 150;
        //blockw[2] = 100;
        //blockh[2] = 20;

        blockx[3] = 0;
        blocky[3] = 50;
        blockw[3] = 30;
        blockh[3] = 20;

        blockx[4] = 500;
        blocky[4] = 350;
        blockw[4] = 100;
        blockh[4] = 20;

        blockx[5] = 300;
        blocky[5] = 50;
        blockw[5] = 100;
        blockh[5] = 20;

        blockx[6] = 0;
        blocky[6] = 150;
        blockw[6] = 30;
        blockh[6] = 20;

        blockx[7] = 400;
        blocky[7] = 150;
        blockw[7] = 250;
        blockh[7] = 20;

        blockx[8] = 0;
        blocky[8] = 250;
        blockw[8] = 30;
        blockh[8] = 20;

        blockx[9] = 650;
        blocky[9] = 250;
        blockw[9] = 50;
        blockh[9] = 20;


    }
    if (level == 7) {
        block[0] = true;
        block[1] = true;
        block[2] = true;

    }
}
//end loadmap

server_instance.prototype.onMapSelected = function (mapNum) {
    
    if (mapSelected == false) {
        console.log("Map chosen map selected!!! Level #: " + mapNum);
        mapSelected = true;
        level = mapNum;
        loadMap();

        //console.log("Sending message to clients!!!");
        //send map to both players
        players.self.instance.send('s.m.' + mapNum);
        players.other.instance.send('s.m.' + mapNum);
    }
}

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
    var sender = input.playerSent;
    var key = input.itype;

    var senderID = 0;
    if(sender == 'client')
        senderID = 1;

    //console.log("Input recieved, type: " + input.time + " key: " + key + " and sender: " + sender);
    serverHasUpdate = true;

    if (input.time == 'd') {
        //player 0-Red
        if (key == 39) {
            gamePlayers[senderID].right = true;
            gamePlayers[senderID].left = false;
        }
        if (key == 37) {
            gamePlayers[senderID].left = true;
            gamePlayers[senderID].right = false;
        }
        if (key == 222 || key == 96 || key == 32) {
            if (gamePlayers[senderID].shooting == false && gamePlayers[senderID].reload == false) {
                gamePlayers[senderID].shooting = true;
                //console.log("Shots fired!");
            }
        }
       
        if (key == 38) {
            if (gamePlayers[senderID].ydir == 0 && gamePlayers[senderID].ypos == gamePlayers[senderID].ground - 20) {
                gamePlayers[senderID].ydir = -jumpSpeed;
            } else {
                if (gamePlayers[senderID].fuel > 0 && gamePlayers[senderID].streak >= 3) gamePlayers[senderID].jetpack = true;
            }
        }
        if (key == 40) {
            gamePlayers[senderID].down = true;
        }
    }
    if (input.time == 'u') {
        if (key == 39) {
            gamePlayers[senderID].right = false;
        }
        if (key == 37) {
            gamePlayers[senderID].left = false;
        }
        if (key == 40) {
            gamePlayers[senderID].down = false;
            if (gamePlayers[senderID].jetpack)
                gamePlayers[senderID].jetpack = false;

            //reload that gun!
            if (gamePlayers[senderID].gun[gamePlayers[senderID].equip] > 0) {
                if (gamePlayers[senderID].ammo[gamePlayers[senderID].equip] < maxAmmo[gamePlayers[senderID].gun[gamePlayers[senderID].equip] - 1] && gamePlayers[senderID].down == true && gamePlayers[senderID].clips[gamePlayers[senderID].equip] > 0 && gamePlayers[senderID].gun[gamePlayers[senderID].equip] > 0 && gamePlayers[senderID].reload == false && gamePlayers[senderID].swapCount < 15 && gamePlayers[senderID].streak < 10) {
                    gamePlayers[senderID].reload = true;
                    gamePlayers[senderID].shooting = false;
                    gamePlayers[senderID].reloadCount = 0;
                }
            }

            gamePlayers[senderID].swapCount = 0;
        }
        if (key == 222 || key == 96 || key == 32) {
            if (gamePlayers[senderID].shooting == true) {
                //console.log("No more shooting!!");
                gamePlayers[senderID].shooting = false;
            }
        }
    }

    player.lastInput = null;
}; //process_input

//(client, input_commands, input_time, input_type, input_seq);
server_instance.prototype.handle_server_input = function (client, input, input_time, input_type, input_seq) {

    //Fetch which client this refers ito out of the two
    var player_client =
        (client.userid == players.self.instance.userid) ?
            players.self : players.other;

    //Store the input on the player instance for processing in the physics loop
    if (client.userid != players.self.instance.userid)
        player_client.lastInput = { inputs: input, time: input_time, itype: input_type, seq: input_seq , playerSent:'client' };
    else
        player_client.lastInput = { inputs: input, time: input_time, itype: input_type, seq: input_seq, playerSent: 'host' };
    //this.process_input(player_client);
    server_instance.prototype.process_input(player_client);

}; //handle_server_input

//try to create a new bullet
// return true if bullet created
function createNewBullet(i) {
    
    //pistol
    if (gamePlayers[i].gun[gamePlayers[i].equip] == 1) {
        //console.log("This far yah shootcount: " + gamePlayers[i].shootCount + " and also ammo: " + gamePlayers[i].ammo[gamePlayers[i].equip]);
        if (gamePlayers[i].shootCount >= 12 && gamePlayers[i].ammo[gamePlayers[i].equip] > 0) {
            //console.log("This far purple");
            for (k = 0; k <= 99; k++) {
                if (gamePlayers[i].b[k] == false) {
                    //console.log("Making new pistol bullet");
                    gamePlayers[i].shotsFired++;
                    gamePlayers[i].b[k] = true;
                    if (gamePlayers[i].directionFacing == 1) {
                        gamePlayers[i].bxdir[k] = 10 * fps;//was 10
                        gamePlayers[i].bydir[k] = 0;
                        gamePlayers[i].bx[k] = gamePlayers[i].xpos;
                        gamePlayers[i].by[k] = gamePlayers[i].ypos + 4;
                        if (gamePlayers[i].streak < 10) gamePlayers[i].ammo[gamePlayers[i].equip]--;
                        gamePlayers[i].shootCount = 0;
                        gamePlayers[i].shotType[k] = 1;
                        return true;
                    } else if (gamePlayers[i].directionFacing == 0) {
                        gamePlayers[i].bxdir[k] = -10 * fps;//-10
                        gamePlayers[i].bydir[k] = 0;
                        gamePlayers[i].bx[k] = gamePlayers[i].xpos;
                        gamePlayers[i].by[k] = gamePlayers[i].ypos + 4;
                        if (gamePlayers[i].streak < 10) gamePlayers[i].ammo[gamePlayers[i].equip]--;
                        gamePlayers[i].shotType[k] = 1;
                        gamePlayers[i].shootCount = 0;
                        return true;
                    }
                }
            }
        }
    }
    //assault
    if (gamePlayers[i].gun[gamePlayers[i].equip] == 2) {
        if (gamePlayers[i].shootCount >= 3 && gamePlayers[i].ammo[gamePlayers[i].equip] > 0) {
            for (k = 0; k <= 99; k++) {
                if (gamePlayers[i].b[k] == false) {
                    gamePlayers[i].shotsFired++;
                    gamePlayers[i].b[k] = true;
                    if (gamePlayers[i].directionFacing == 1) {
                        gamePlayers[i].bxdir[k] = 14 * fps;//was 14
                        gamePlayers[i].bydir[k] = 0;
                        gamePlayers[i].bx[k] = gamePlayers[i].xpos;
                        gamePlayers[i].by[k] = gamePlayers[i].ypos + 4;
                        if (gamePlayers[i].streak < 10) gamePlayers[i].ammo[gamePlayers[i].equip]--;
                        gamePlayers[i].shootCount = 0;
                        gamePlayers[i].shotType[k] = 2;
                        return true;
                    } else if (gamePlayers[i].directionFacing == 0) {
                        gamePlayers[i].bxdir[k] = -14 * fps;//-14
                        gamePlayers[i].bydir[k] = 0;
                        gamePlayers[i].bx[k] = gamePlayers[i].xpos;
                        gamePlayers[i].by[k] = gamePlayers[i].ypos + 4;
                        if (gamePlayers[i].streak < 10) gamePlayers[i].ammo[gamePlayers[i].equip]--;
                        gamePlayers[i].shootCount = 0;
                        gamePlayers[i].shotType[k] = 2;
                        return true;
                    }
                }
            }
        }
    }
    //uzi
    if (gamePlayers[i].gun[gamePlayers[i].equip] == 3) {
        if (gamePlayers[i].shootCount >= 3 && gamePlayers[i].ammo[gamePlayers[i].equip] > 0) {
            for (k = 0; k <= 99; k++) {
                if (gamePlayers[i].b[k] == false) {
                    gamePlayers[i].shotsFired++;
                    gamePlayers[i].b[k] = true;
                    if (gamePlayers[i].directionFacing == 1) {
                        gamePlayers[i].bxdir[k] = 14 * fps; // was 14
                        gamePlayers[i].bydir[k] = 0;
                        gamePlayers[i].bx[k] = gamePlayers[i].xpos;
                        gamePlayers[i].by[k] = gamePlayers[i].ypos + 4;
                        if (gamePlayers[i].streak < 10) gamePlayers[i].ammo[gamePlayers[i].equip]--;
                        gamePlayers[i].shootCount = 0;
                        gamePlayers[i].shotType[k] = 3;
                        return true;
                    } else if (gamePlayers[i].directionFacing == 0) {
                        gamePlayers[i].bxdir[k] = -14 * fps;//was -14
                        gamePlayers[i].bydir[k] = 0;
                        gamePlayers[i].bx[k] = gamePlayers[i].xpos;
                        gamePlayers[i].by[k] = gamePlayers[i].ypos + 4;
                        if (gamePlayers[i].streak < 10) gamePlayers[i].ammo[gamePlayers[i].equip]--;
                        gamePlayers[i].shotType[k] = 3;
                        gamePlayers[i].shootCount = 0;
                        return true;
                    }
                }
            }
        }
    }
    //sniper
    if (gamePlayers[i].gun[gamePlayers[i].equip] == 4) {
        if (gamePlayers[i].shootCount >= 30 && gamePlayers[i].ammo[gamePlayers[i].equip] > 0) {
            for (k = 0; k <= 99; k++) {
                if (gamePlayers[i].b[k] == false) {
                    gamePlayers[i].shotsFired++;
                    gamePlayers[i].b[k] = true;
                    if (gamePlayers[i].directionFacing == 1) {
                        gamePlayers[i].bxdir[k] = 20 * fps;//was 20
                        gamePlayers[i].bydir[k] = 0;
                        gamePlayers[i].bx[k] = gamePlayers[i].xpos;
                        gamePlayers[i].by[k] = gamePlayers[i].ypos + 4;
                        if (gamePlayers[i].streak < 10) gamePlayers[i].ammo[gamePlayers[i].equip]--;
                        gamePlayers[i].shotType[k] = 4;
                        gamePlayers[i].shootCount = 0;
                        return true;
                    } else if (gamePlayers[i].directionFacing == 0) {
                        gamePlayers[i].bxdir[k] = -20 * fps;//was -20
                        gamePlayers[i].bydir[k] = 0;
                        gamePlayers[i].bx[k] = gamePlayers[i].xpos;
                        gamePlayers[i].by[k] = gamePlayers[i].ypos + 4;
                        if (gamePlayers[i].streak < 10) gamePlayers[i].ammo[gamePlayers[i].equip]--;
                        gamePlayers[i].shotType[k] = 4;
                        gamePlayers[i].shootCount = 0;
                        return true;
                    }
                }
            }
        }
    }
    //flamethrower
    if (gamePlayers[i].gun[gamePlayers[i].equip] == 5) {
        if (gamePlayers[i].shootCount >= 1 && gamePlayers[i].ammo[gamePlayers[i].equip] > 0) {
            for (k = 0; k <= 99; k++) {
                if (gamePlayers[i].b[k] == false) {
                    gamePlayers[i].shotsFired++;
                    gamePlayers[i].b[k] = true;
                    if (gamePlayers[i].directionFacing == 1) {
                        gamePlayers[i].flameDis[k] = gamePlayers[i].xpos + 200;
                        gamePlayers[i].bxdir[k] = 11 * fps; // was 11
                        gamePlayers[i].bydir[k] = 0;
                        gamePlayers[i].bx[k] = gamePlayers[i].xpos;
                        gamePlayers[i].by[k] = gamePlayers[i].ypos + 4;
                        if ((gamePlayers[i].streak < 10) && k % 2 == 0)
                            gamePlayers[i].ammo[gamePlayers[i].equip]--;
                        gamePlayers[i].shotType[k] = 5;
                        gamePlayers[i].shootCount = 0;
                        return true;
                    } else if (gamePlayers[i].directionFacing == 0) {
                        gamePlayers[i].flameDis[k] = gamePlayers[i].xpos - 180;
                        gamePlayers[i].bxdir[k] = -11 * fps;// was -11
                        gamePlayers[i].bydir[k] = 0;
                        gamePlayers[i].bx[k] = gamePlayers[i].xpos;
                        gamePlayers[i].by[k] = gamePlayers[i].ypos + 4;
                        if ((gamePlayers[i].streak < 10) && k % 2 == 0)
                            gamePlayers[i].ammo[gamePlayers[i].equip]--;
                        gamePlayers[i].shotType[k] = 5;
                        gamePlayers[i].shootCount = 0;
                        return true;
                    }
                }
            }
        }
    }
    //shotgun
    if (gamePlayers[i].gun[gamePlayers[i].equip] == 6) {
        if (gamePlayers[i].shootCount >= 25 && gamePlayers[i].ammo[gamePlayers[i].equip] > 0) {
            for (k = 0; k <= 95; k++) {
                if (gamePlayers[i].b[k] == false) {
                    for (r = 0; r <= 4; r++) {
                        gamePlayers[i].shotsFired++;
                        gamePlayers[i].b[k + r] = true;
                        if (gamePlayers[i].directionFacing == 1) {
                            //shotgunDis[i][k+r] =gamePlayers[i].xpos+220;
                            gamePlayers[i].shotgunDis[k + r] = gamePlayers[i].xpos + 160;
                            gamePlayers[i].bxdir[k + r] = 15 * fps;//was 15
                            gamePlayers[i].bydir[k + r] = (-2 * fps) + (r * fps);//-2
                            gamePlayers[i].bx[k + r] = gamePlayers[i].xpos;
                            gamePlayers[i].by[k + r] = gamePlayers[i].ypos + 4;
                            gamePlayers[i].shotType[k + r] = 6;
                            gamePlayers[i].shootCount = 0;
                        } else if (gamePlayers[i].directionFacing == 0) {
                            //shotgunDis[i][k+r] =gamePlayers[i].xpos-200;
                            gamePlayers[i].shotgunDis[k + r] = gamePlayers[i].xpos - 140;
                            gamePlayers[i].bxdir[k + r] = -15 * fps;//was 15
                            gamePlayers[i].bydir[k + r] = (-2 * fps) + (r * fps);//-2
                            gamePlayers[i].bx[k + r] = gamePlayers[i].xpos;
                            gamePlayers[i].by[k + r] = gamePlayers[i].ypos + 4;
                            gamePlayers[i].shotType[k + r] = 6;
                            gamePlayers[i].shootCount = 0;
                        }
                    }
                    if (gamePlayers[i].streak < 10) gamePlayers[i].ammo[gamePlayers[i].equip]--;
                }
                return true;
            }
        }
    }

    //bullet creation failed
    return false;
}

//updator!
server_instance.prototype.update = function () {

    var now = Date.now();
    var delta = now - then;

    var modifier = delta / 1000;

    

    if (play) {
        //Update the state of our local clock to match the timer
        //this.server_time = ;

        //update the clients every half second fully
        if (Date.now() - lastFullUpdate > 1000) {
            fullUpdate = true;
        }

        //them dead people
        for (i = 0; i < playerCount; i++) {
            gamePlayers[i].deadCount = gamePlayers[i].deadCount + fps * modifier;
            if (gamePlayers[i].ypos <= 0 && gamePlayers[i].deadCount < 100) {
                gamePlayers[i].ypos = -30;
                gamePlayers[i].ydir = 0;
            }
        }

        //jetpack
        for (i = 0; i < playerCount; i++) {
            if (gamePlayers[i].streak >= 3 && gamePlayers[i].ydir != 0 && gamePlayers[i].jetpack == true) {
                if (gamePlayers[i].fuel > 0) {
                    gamePlayers[i].fuel = gamePlayers[i].fuel - fps * modifier;
                    if (gamePlayers[i].ydir >= -7 * fps) {//was -7
                        gamePlayers[i].ydir = gamePlayers[i].ydir - (3 * fps);//was - 3
                    }
                }
                else {
                    gamePlayers[i].jetpack = false;
                    serverHasUpdate = true;
                }
            }
        }

        //collisions
        for(i = 0; i < playerCount; i++) {
            if (gamePlayers[i].xpos >= 680) {
                gamePlayers[i].xpos = 679;
            }
            if (gamePlayers[i].xpos <= 0) {
                gamePlayers[i].xpos = 1;
            }
        }

        //update player - bullet collisions
        for (i = 0; i < playerCount; i++) {
            bulletCollisions(i, modifier);
        }

        //update guns!
        for (i = 0; i < playerCount; i++) {
            updateGuns(i, modifier);
        }

        //update reloads!
        for (i = 0; i < playerCount; i++) {
            updateReload(i, modifier);
        }

        //kill streaks(health packs falling etc..)
        for (i = 0; i < playerCount; i++) {
            for (k = 0; k < playerCount; k++) {
                //player healthpack collision
                if (gamePlayers[i].xpos + 20 >= gamePlayers[k].healthpackx && gamePlayers[i].xpos <= gamePlayers[k].healthpackx + 20 && gamePlayers[i].ypos + 20 >= gamePlayers[k].healthpacky && gamePlayers[i].ypos <= gamePlayers[k].healthpacky + 20 && gamePlayers[k].healthpack == true && gamePlayers[i].ypos > 0) {
                    serverHasUpdate = true;
                    gamePlayers[i].health = 20;
                    gamePlayers[k].healthpack = false;
                }
            }
            //health packs
            if (gamePlayers[i].healthpack == true) {
                if (gamePlayers[i].healthpacky < 410) gamePlayers[i].healthpacky = gamePlayers[i].healthpacky + 2 * modifier * fps;
                if (gamePlayers[i].ypos > 0 && gamePlayers[i].streak >= 2) gamePlayers[i].healthpackx = gamePlayers[i].xpos;
            } else {
                gamePlayers[i].healthpacky = -20;
            }
        }


        //updating 2 players
        for (i = 0; i < playerCount; i++) {//
            gamePlayers[i].shootCount = gamePlayers[i].shootCount + fps * modifier;
            if (gamePlayers[i].shooting == true) {
                //console.log("Shooting is true!!!!");
                if (createNewBullet(i)) { //(x, y, dir, send, type) {
                    //console.log("Creating new bullet succes!!!!");
                    serverHasUpdate = true;
                    var newBullet = {
                        newBulletType: gamePlayers[i].gun[gamePlayers[i].equip],
                        newBulletX: gamePlayers[i].xpos,
                        newBulletY: gamePlayers[i].ypos + 4,
                        newBulletDir: gamePlayers[i].directionFacing,  //true = right // false = left
                        newBulletSender: i
                    };
                    newBullets.push(newBullet);//newBullet(gamePlayers[i].xpos, gamePlayers[i].ypos + 4, gamePlayers[i].directionFacing, i, gamePlayers[i].gun[gamePlayers[i].equip]));
                }
            }

            //holding down
            if (gamePlayers[i].down == true) {
                gamePlayers[i].downCount = gamePlayers[i].downCount + fps * modifier;
            }

            //set ydir
            gamePlayers[i].ydir = gamePlayers[i].ydir + playerFallSpeed * modifier;// used to be 1
            //global collision y platforms
            for (k = 0; k <= 14; k++) {
                if (block[k] == true && gamePlayers[i].xpos + 20 >= blockx[k] && gamePlayers[i].xpos <= blockx[k] + blockw[k] && gamePlayers[i].ypos + 20 + (gamePlayers[i].ydir * modifier) <= blocky[k] + (gamePlayers[i].ydir * modifier) && gamePlayers[i].ypos + 20 + (gamePlayers[i].ydir * modifier) >= blocky[k]) {// + (gamePlayers[i].ydir) 5
                    serverHasUpdate = true;
                    gamePlayers[i].ground = blocky[k];
                    k = 15;
                } else if (k == 14) {
                    gamePlayers[i].ground = 430;
                }
            }

            //y movement
            if (gamePlayers[i].ypos + 20 + (gamePlayers[i].ydir * modifier) >= gamePlayers[i].ground && gamePlayers[i].ydir > 0) {
                gamePlayers[i].ydir = 0;
                gamePlayers[i].ypos = gamePlayers[i].ground - 20;
            }

            //x movement
            if (gamePlayers[i].right == true) {
                gamePlayers[i].directionFacing = 1;
                gamePlayers[i].xdir = playerSpeed;
            } else if (gamePlayers[i].left == true) {
                gamePlayers[i].directionFacing = 0;
                gamePlayers[i].xdir = -playerSpeed;
            } else if (gamePlayers[i].left == false && gamePlayers[i].right == false) {
                gamePlayers[i].xdir = 0;
            }
        }

        //flamethrower fire and shotgun UPDATE
        for (i = 0; i < playerCount; i++) {
            for (k = 0; k <= 99; k++) {
                if (gamePlayers[i].b[k] == true && gamePlayers[i].shotType[k] == 5) {
                    if (gamePlayers[i].bxdir[k] > 0 && gamePlayers[i].bx[k] >= gamePlayers[i].flameDis[k]) {
                        gamePlayers[i].b[k] = false;
                        var deadBullet = {
                            owner: i,
                            ID: k
                        };
                        killBullets.push(deadBullet);
                    }
                    if (gamePlayers[i].bxdir[k] < 0 && gamePlayers[i].bx[k] <= gamePlayers[i].flameDis[k]) {
                        gamePlayers[i].b[k] = false;
                        var deadBullet = {
                            owner: i,
                            ID: k
                        };
                        killBullets.push(deadBullet);
                    }
                }
                if (gamePlayers[i].b[k] == true && gamePlayers[i].shotType[k] == 6) {
                    if (gamePlayers[i].bxdir[k] > 0 && gamePlayers[i].bx[k] >= gamePlayers[i].shotgunDis[k]) {
                        gamePlayers[i].b[k] = false;
                        var deadBullet = {
                            owner: i,
                            ID: k
                        };
                        killBullets.push(deadBullet);
                    }
                    if (gamePlayers[i].bxdir[k] < 0 && gamePlayers[i].bx[k] <= gamePlayers[i].shotgunDis[k]) {
                        gamePlayers[i].b[k] = false;
                        var deadBullet = {
                            owner: i,
                            ID: k
                        };
                        killBullets.push(deadBullet);
                    }
                }
            }
        }

        for (i = 0; i < playerCount; i++) {
            //do movement

            if (gamePlayers[i].jump == true) {
                gamePlayers[i].jumpCount = gamePlayers[i].jumpCount + fps * modifier;
                gamePlayers[i].xdir = 0;
                gamePlayers[i].ydir = 0;

                if (gamePlayers[i].jumpCount == 2) {
                    if (gamePlayers[i].right == true) gamePlayers[i].xpos = gamePlayers[i].xpos + 20 * fps;
                    if (gamePlayers[i].left == true) gamePlayers[i].xpos = gamePlayers[i].xpos - 20;

                }
                if (gamePlayers[i].jumpCount == 6) {

                    if (gamePlayers[i].right == true) gamePlayers[i].xpos = gamePlayers[i].xpos - 40;
                    if (gamePlayers[i].left == true) gamePlayers[i].xpos = gamePlayers[i].xpos + 40;


                }
                if (gamePlayers[i].jumpCount == 10) {

                    gamePlayers[i].jump = false;
                    gamePlayers[i].jumpCount = 0;
                    if (gamePlayers[i].right == true) gamePlayers[i].xpos = gamePlayers[i].xpos + 40;// || gamePlayers[i].directionFacing == 1 //ON ALL
                    if (gamePlayers[i].left == true) gamePlayers[i].xpos = gamePlayers[i].xpos - 40;

                }
            }
            //console.log("updating x pos: " + gamePlayers[i].xpos + " by " + (gamePlayers[i].xdir * modifier));
            gamePlayers[i].xpos = gamePlayers[i].xpos + (gamePlayers[i].xdir * modifier);
            gamePlayers[i].ypos = gamePlayers[i].ypos + (gamePlayers[i].ydir * modifier);
        }

        //update the clients on new stuff I supose
        //if (serverHasUpdate)
            sendUserUpdates();

        serverHasUpdate = false;
        then = now;
    }
}

function sendUserUpdates() {
    //temporary variables because cannot use array vars?!
    var hostX = gamePlayers[0].xpos;
    var hostY = gamePlayers[0].ypos;
    var otherX = gamePlayers[1].xpos;
    var otherY = gamePlayers[1].ypos;

    var hostxdir = gamePlayers[0].xdir;
    var hostydir = gamePlayers[0].ydir;
    var otherxdir = gamePlayers[1].xdir;
    var otherydir = gamePlayers[1].ydir;



    //Make a snapshot of the current state, for updating the clients
    this.laststate = {};
    this.laststate.hpx = hostX;//this.gamePlayers[0].xpos;              //'host position', the game creators position
    this.laststate.hpy = hostY;                //'host position', the game creators position
    this.laststate.hpxdir = hostxdir;             //'host direction'
    this.laststate.hpydir = hostydir;             //'host direction'
    this.laststate.cpx = otherX;               //'client position', the person that joined, their position
    this.laststate.cpy = otherY;               //'client position', the person that joined, their position
    this.laststate.cpxdir = otherxdir;             //'client direction'
    this.laststate.cpydir = otherydir;             //'client direction'

    this.laststate.newBulletNum = newBullets.length; //amount of new bullets
    if (newBullets.length > 0) {//create the bullets!!!
        //newBullets.push(gamePlayers[i].xpos, gamePlayers[i].ypos + 4, gamePlayers[i].directionFacing, i, gamePlayers[i].gun[gamePlayers[i].equip]);
        //console.log("Shoot another bullet");
        this.laststate.newBulleters = JSON.stringify(newBullets);
        newAmmoAmount = true;
    }

    //there are bullets to be killed!
    this.laststate.amountOfDeadBullets = killBullets.length;
    if (killBullets.length > 0) {
        this.laststate.newDeadBullet = JSON.stringify(killBullets);
    }

    //new ammos
    if (newAmmoAmount) {
        this.laststate.newHAmmoAmount = gamePlayers[0].ammo[gamePlayers[0].equip];//add ammo
        this.laststate.newCAmmoAmount = gamePlayers[1].ammo[gamePlayers[1].equip];//add ammo
        newAmmoAmount = false;
    }
    
    //send clips
    if (newClipAmount) {
        this.laststate.newHClipsAmount = gamePlayers[0].clips[gamePlayers[0].equip];//add ammo
        this.laststate.newCClipsAmount = gamePlayers[1].clips[gamePlayers[1].equip];//add ammo
        newClipAmount = false;
    }

    if (newGunEquiped) {
        //console.log("New gun equiped!!!1");
        this.laststate.newHEquip = gamePlayers[0].equip;
        this.laststate.newCEquip = gamePlayers[1].equip;

        this.laststate.newHGunEquip = gamePlayers[0].gun[gamePlayers[0].equip];
        this.laststate.newCGunEquip = gamePlayers[1].gun[gamePlayers[1].equip];
        newGunEquiped = false;
    }

    if (updateHealth) {
        //console.log("Update health!!!");
        this.laststate.newHHP = gamePlayers[0].health;
        this.laststate.newCHP = gamePlayers[1].health;
        updateHealth = false;
    }

    this.laststate.jetpackActivated = false;
    if (gamePlayers[0].jetpack || gamePlayers[1].jetpack) {
        this.laststate.jetpackActivated = true;
        this.laststate.hjpack = gamePlayers[0].jetpack;
        this.laststate.cjpack = gamePlayers[1].jetpack;

        this.laststate.hfuel = gamePlayers[0].fuel;
        this.laststate.cfuel = gamePlayers[1].fuel;
    }

    if (fullUpdate) { //totally update clients!!!!
        //console.log("Update them fully!!!!");
        this.laststate.updateFully = true;
        //variables to think about:
        //streak
        //jetpack
        //fuel
        //deadcount
        //deaths
        //kills //also health and pos ofc
        this.laststate.hstreak = gamePlayers[0].streak;
        this.laststate.cstreak = gamePlayers[1].streak;

        this.laststate.hjpack = gamePlayers[0].jetpack;
        this.laststate.cjpack = gamePlayers[1].jetpack;

        this.laststate.hfuel = gamePlayers[0].fuel;
        this.laststate.cfuel = gamePlayers[1].fuel;

        this.laststate.hdeadcount = gamePlayers[0].deadCount;
        this.laststate.cdeadcount = gamePlayers[1].deadCount;

        this.laststate.hdeaths = gamePlayers[0].deaths;
        this.laststate.cdeaths = gamePlayers[1].deaths;

        this.laststate.hkills = gamePlayers[0].kills;
        this.laststate.ckills = gamePlayers[1].kills;


        fullUpdate = false;
        lastFullUpdate = Date.now();
    }
    else {
        this.laststate.updateFully = false;
    }


    /*if (updateLives) {
        //LOL NOT IMPLEMENTED YET
        this.laststate.newHLives = gamePlayers[0].health;
        this.laststate.newCLives = gamePlayers[1].health;
        updateLives = false;
    }*/

    this.laststate.newGunNum = newGuns.length; //amount of new bullets
    if (newGuns.length > 0) {
        this.laststate.newGun = JSON.stringify(newGuns);
    }


    this.laststate.t = this.server_time;                      // our current local time on the server

    //his: this.players.self.last_input_seq,     //'host input sequence', the last input we processed for the host
    //cis: this.players.other.last_input_seq,    //'client input sequence', the last input we processed for the client

    //Send the snapshot to the 'host' player
    if (players.self.instance) {
        players.self.instance.emit('onserverupdate', this.laststate);
    }

    //Send the snapshot to the 'client' player aaASASDFSGSRFGHS
    if (players.other.instance) {
        players.other.instance.emit('onserverupdate', this.laststate);
    }

    //reseting the bullets
    if (newBullets.length > 0) {
        newBullets = [];
    }

    if (killBullets.length > 0)
        killBullets = [];

    //reseting the new guns
    if (newGuns.length > 0) {
        newGuns = [];
    }
    if (deadGuns.length > 0) {
        deadGuns = [];
    }
}

function bulletCollisions(i, modifier) {
    //hits player bullets

    gamePlayers[i].killCount = gamePlayers[i].killCount + fps * modifier;

    for (t = 0; t < playerCount; t++) {
        if(i != t) {
            for (k = 0; k <= 99; k++) {
                //console.log("Try the collide!!!! with bullet x: " + gamePlayers[i].b[k] + " and player x: " + gamePlayers[t].xpos);
                if (gamePlayers[i].b[k] == true && gamePlayers[i].bx[k] >= gamePlayers[t].xpos - 5 && gamePlayers[i].bx[k] <= gamePlayers[t].xpos + 25 && gamePlayers[i].by[k] >= gamePlayers[t].ypos && gamePlayers[i].by[k] <= gamePlayers[t].ypos + 20 && gamePlayers[t].xpos > 0) {
                    //console.log("He's hit!!!!");
                    gamePlayers[i].shotsHit++;
                    updateHealth = true;

                    //blood would be here

                    //Hello whoever is reading this! - Rhys porting to javascript
                    if (gamePlayers[i].shotType[k] != 5) {
                        var deadBullet = {
                            owner: i,
                            ID: k
                        };
                        killBullets.push(deadBullet);
                        gamePlayers[i].b[k] = false;
                    }/* else if (gamePlayers[i].shotType[k] == 5) {
                                    gamePlayers[i].shotsFired++;
                                }*/
                    if (gamePlayers[i].shotType[k] == 1) {
                        gamePlayers[t].health = gamePlayers[t].health - 5;
                    }
                    if (gamePlayers[i].shotType[k] == 2) {
                        gamePlayers[t].health = gamePlayers[t].health - 4;
                    }
                    if (gamePlayers[i].shotType[k] == 3) {
                        gamePlayers[t].health = gamePlayers[t].health - 3;
                    }
                    if (gamePlayers[i].shotType[k] == 4) {
                        gamePlayers[t].health = gamePlayers[t].health - 12;
                    }
                    if (gamePlayers[i].shotType[k] == 5) {
                        if (k % 2 == 0) gamePlayers[t].health = gamePlayers[t].health - 0.5;
                    }
                    if (gamePlayers[i].shotType[k] == 6) {
                        gamePlayers[t].health = gamePlayers[t].health - 4;
                    }
                    //die
                    if (gamePlayers[t].health <= 0) {
                        //Let the client know!
                        updateLives = true;
                        newAmmoAmount = true;
                        newClipAmount = true;
                        newGunEquiped = true;

                        fullUpdate = true;

                        gamePlayers[i].streak++;
                        gamePlayers[t].streak = 0;
                        if (gamePlayers[i].streak == 2) {
                            gamePlayers[i].healthpack = true;
                            gamePlayers[i].healthpacky = -20;
                        }
                        if (gamePlayers[i].streak == 3) {
                            gamePlayers[i].fuel = 20;
                        }
                        if (gamePlayers[i].streak == 4) {
                            gamePlayers[i].healthpack = true;
                            gamePlayers[i].healthpacky = -20;
                        }
                        if (gamePlayers[i].streak == 6) {
                            gamePlayers[i].fuel = 40;
                        }
                        if (gamePlayers[i].streak == 7) {
                            gamePlayers[i].healthpack = true;
                            gamePlayers[i].healthpacky = -20;
                        }
                        if (gamePlayers[i].streak % 20 == 0) {
                            gamePlayers[i].healthpack = true;
                            gamePlayers[i].healthpacky = -20;
                        }
                        gamePlayers[i].killCount = 0;
                        gamePlayers[i].kills++;
                        gamePlayers[t].deaths++;
                        gamePlayers[t].health = 20;
                        gamePlayers[t].deadCount = 0;
                        gamePlayers[t].ypos = -30;
                        gamePlayers[t].xpos = (Math.random() * 680);
                        gamePlayers[t].gun[0] = 1;
                        gamePlayers[t].gun[1] = 0;
                        gamePlayers[t].equip = 0;
                        gamePlayers[t].ammo[0] = 10;
                        gamePlayers[t].clips[0] = 3;
                        gamePlayers[t].ammo[1] = 0;
                        gamePlayers[t].clips[1] = 0;
                    }
                }
            }
        }
    }

    //console.log("Let's update these bullets.");

    //bullet movement
    for (k = 0; k <= 99; k++) {
        if (gamePlayers[i].b[k]) { //update bullet if it exists
            //console.log("Let's update these bullets. X pos: " + gamePlayers[i].bx[k]);
            gamePlayers[i].bx[k] = gamePlayers[i].bx[k] + (gamePlayers[i].bxdir[k] * modifier);
            gamePlayers[i].by[k] = gamePlayers[i].by[k] + (gamePlayers[i].bydir[k] * modifier);
            if ((gamePlayers[i].bx[k] < -20 || gamePlayers[i].bx[k] > 720)) {
                var deadBullet = {
                    owner: i,
                    ID: k
                };
                killBullets.push(deadBullet);
                gamePlayers[i].b[k] = false;
                gamePlayers[i].bxdir[k] = 0;
            }
            if ((gamePlayers[i].bx[k] < -20 || gamePlayers[i].bx[k] > 1420)) {
                var deadBullet = {
                    owner: i,
                    ID: k
                };
                killBullets.push(deadBullet);
                gamePlayers[i].b[k] = false;
                gamePlayers[i].bxdir[k] = 0;
            }
        }
    }
}

function updateGuns(i , modifier) {
    //falling weapons yah
    for (k = 0; k < playerCount; k++) {
        for (i = 0; i <= 7; i++) {
            //hit falling gun player gun pickup
            if (((gamePlayers[k].down == false && gamePlayers[k].downCount > 0 && gamePlayers[k].downCount <= 15) || (i == 0) || (gamePlayers[k].gun[0] - 1 == i) || (gamePlayers[k].gun[1] - 1 == i)) && gamePlayers[k].xpos + 20 >= gunx[i] && gamePlayers[k].xpos <= gunx[i] + 20 && gamePlayers[k].ypos + 30 >= guny[i] && gamePlayers[k].ypos - 30 <= guny[i] && gamePlayers[k].ypos > 0 && i <= 7) {
                //update clients
                serverHasUpdate = true;
                newClipAmount = true;
                newGunEquiped = true;
                newAmmoAmount = true;

                gamePlayers[k].down = false;
                gamePlayers[k].downCount = 0;
                if (gamePlayers[k].reload == true) {
                    gamePlayers[k].reload = false;
                    gamePlayers[k].clips[gamePlayers[k].equip]++;
                }
                if (i == 0) {
                    if (gamePlayers[k].gun[0] > 0) gamePlayers[k].clips[0] = gamePlayers[k].clips[0] + 4;
                    if (gamePlayers[k].gun[1] > 0) gamePlayers[k].clips[1] = gamePlayers[k].clips[1] + 4;
                    gunx[i] = (Math.random() * 680) + 2;
                    guny[i] = -500 - ((Math.random() * 1500));
                    var newGun = {//function (x, y, gunType) 
                        newGunX: gunx[i],
                        newGunY: guny[i],
                        newGunType: i
                    };
                    newGuns.push(newGun);
                    if (gamePlayers[k].gun[0] > 0) {
                        gamePlayers[k].ammo[0] = maxAmmo[gamePlayers[k].gun[0] - 1];
                    }
                    if (gamePlayers[k].gun[1] > 0) {
                        gamePlayers[k].ammo[1] = maxAmmo[gamePlayers[k].gun[1] - 1];
                    }
                } else {
                    //update the clients on the change
                    //add ammo if have gun
                    if (gamePlayers[k].gun[0] - 1 == i) {
                        gamePlayers[k].clips[0] = gamePlayers[k].clips[0] + 4;
                        gamePlayers[k].ammo[0] = maxAmmo[i];
                    }
                        //add ammo if have gun
                    else if (gamePlayers[k].gun[1] - 1 == i) {
                        gamePlayers[k].clips[1] = gamePlayers[k].clips[1] + 4;
                        gamePlayers[k].ammo[1] = maxAmmo[i];
                    }
                        //add gun if open spot
                    else if (gamePlayers[k].gun[0] == 0) {
                        gamePlayers[k].gun[0] = i + 1;
                        gamePlayers[k].clips[0] = 3;

                        gamePlayers[k].equip = 0;
                        gamePlayers[k].ammo[0] = maxAmmo[i];
                    }
                        //add gun if open spot
                    else if (gamePlayers[k].gun[1] == 0) {
                        gamePlayers[k].gun[1] = i + 1;
                        gamePlayers[k].clips[1] = 3;
                        gamePlayers[k].equip = 1;
                        gamePlayers[k].ammo[1] = maxAmmo[i];
                    }
                        //remove gun and add new gun if spots are full
                    else if (gamePlayers[k].gun[0] > 0 && gamePlayers[k].gun[1] > 0) {
                        gamePlayers[k].gun[gamePlayers[k].equip] = i + 1;
                        gamePlayers[k].equip = 1;
                        gamePlayers[k].clips[gamePlayers[k].equip] = 3;
                        gamePlayers[k].ammo[gamePlayers[k].equip] = maxAmmo[i];
                    }
                     gunx[i] = (Math.random() * 680) + 2;

                    guny[i] = -500 - ((Math.random() * 1500));
                    var newGun = {//function (x, y, gunType) 
                        newGunX: gunx[i],
                        newGunY: guny[i],
                        newGunType: i
                    };
                    newGuns.push(newGun);

                    //console.log("New gun picked up with clip size: " + gamePlayers[k].clips[gamePlayers[k].equip] + " and ammo " + gamePlayers[k].ammo[gamePlayers[k].equip]);
                }
            }
        }
    }
    //end down
    for (k = 0; k < playerCount; k++) {
        if (gamePlayers[k].down == false) {
            gamePlayers[k].downCount = 0;
        }
    }
        //falling weapons
    for (i = 0; i <= 7; i++) {
        //guns falling + collide
        for (q = 0; q <= 14; q++) {
            if ((block[q] == true && gunx[i] + 10 >= blockx[q] && gunx[i] <= blockx[q] + blockw[q] && guny[i] + 20 <= blocky[q] + blockh[q] && guny[i] + 20 >= blocky[q]) || guny[i] >= 410) {
                q = 15;
            } else if (q == 14) guny[i] = guny[i] + ((2 * fps) * modifier);
        }
    }
}

function updateReload(i, modifier) {
    //auto reload------keep or remove?
    if (gamePlayers[i].reload == false && gamePlayers[i].ammo[gamePlayers[i].equip] == 0 && gamePlayers[i].clips[gamePlayers[i].equip] > 0) {
        gamePlayers[i].reload = true;
        gamePlayers[i].reloadCount = 0;
        gamePlayers[i].clips[gamePlayers[i].equip]--;
        newClipAmount = true;
    }
    //end autoreload

    //swap the guns! USED TO BE IN IT'S OWN FOR LOOP
    if (gamePlayers[i].down == true) {
        gamePlayers[i].swapCount = gamePlayers[i].swapCount + fps * modifier;
        if (gamePlayers[i].swapCount > 15) {
            //update the clients on the change
            newAmmoAmount = true;
            newGunEquiped = true;
            newClipAmount = true;
            if (gamePlayers[i].reload == true) {
                gamePlayers[i].reload = false;
                gamePlayers[i].clips[gamePlayers[i].equip]++;
                gamePlayers[i].reloadCount = 0;
            }
            if (gamePlayers[i].equip == 0) {
                gamePlayers[i].equip = 1;
            } else if (gamePlayers[i].equip == 1) {
                gamePlayers[i].equip = 0;
            }
            gamePlayers[i].down = false;
            gamePlayers[i].swapCount = 0;
        }
    }//end gun swap

    //reload
    if (gamePlayers[i].reload == true) {
        gamePlayers[i].reloadCount = gamePlayers[i].reloadCount + fps * modifier;
        var timeReload = 80;
        if (gamePlayers[i].gun[gamePlayers[i].equip] == 1) timeReload = 20;
        if (gamePlayers[i].gun[gamePlayers[i].equip] == 2 || gamePlayers[i].gun[gamePlayers[i].equip] == 3) timeReload = 40;
        if (gamePlayers[i].gun[gamePlayers[i].equip] == 4) timeReload = 80;
        if (gamePlayers[i].gun[gamePlayers[i].equip] == 5) timeReload = 80;
        if (gamePlayers[i].gun[gamePlayers[i].equip] == 6) timeReload = 40;
        if (gamePlayers[i].gun[gamePlayers[i].equip] == 7) timeReload = 20;
        if (gamePlayers[i].gun[gamePlayers[i].equip] == 8) timeReload = 20;

        if (gamePlayers[i].reloadCount >= timeReload) {
            //console.log("Finished reloading!");
            newAmmoAmount = true;
            if (gamePlayers[i].gun[gamePlayers[i].equip] == 1) gamePlayers[i].ammo[gamePlayers[i].equip] = 10;
            if (gamePlayers[i].gun[gamePlayers[i].equip] == 2) gamePlayers[i].ammo[gamePlayers[i].equip] = 12;
            if (gamePlayers[i].gun[gamePlayers[i].equip] == 3) gamePlayers[i].ammo[gamePlayers[i].equip] = 20;
            if (gamePlayers[i].gun[gamePlayers[i].equip] == 4) gamePlayers[i].ammo[gamePlayers[i].equip] = 4;
            if (gamePlayers[i].gun[gamePlayers[i].equip] == 5) gamePlayers[i].ammo[gamePlayers[i].equip] = 60;
            if (gamePlayers[i].gun[gamePlayers[i].equip] == 6) gamePlayers[i].ammo[gamePlayers[i].equip] = 5;
            if (gamePlayers[i].gun[gamePlayers[i].equip] == 7) gamePlayers[i].ammo[gamePlayers[i].equip] = 4;
            if (gamePlayers[i].gun[gamePlayers[i].equip] == 8) gamePlayers[i].ammo[gamePlayers[i].equip] = 6;

            gamePlayers[i].reloadCount = 0;
            gamePlayers[i].reload = false;

            //ADDED TO STOP AUTO SHOOT
            //gamePlayers[i].shooting = false;
        }
    }
}

function createJSONPairs(newJSON) {

}