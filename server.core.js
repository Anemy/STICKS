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
var right = [];
var left = [];
var directionFacing = [];

var fps = 40;

var jumpSpeed = 15 * fps;//was then 25
var playerSpeed = 8 * fps; //it was 8 at fps = 25(40)
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

var then;

var playerCount = 2;

//ONLINE BULLET VARS
var newBulletCount = 0;
var newBulletType = [];
var newBulletX = [];
var newBulletY = [];
var newBulletDir = [];  //true = right // false = left
var newBulletSender = [];

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

//start the game + set vars
server_instance.prototype.initGame = function () {
    then = Date.now();

    level = 1;
    loadMap();

    newBulletCount = 0;


    for(var i = 0; i < playerCount; i++) {
        //set sides
        right[i] = false;
        left[i] = false;

        for (k = 0; k <= 99; k++) {
            shotType[i][k] = 0;
            b[i][k] = false;
        }

        //set dirs
        ydir[i] = 0;
        ydir[i] = 0;

        //set positions
        ypos[i] = 410;


        //set guns
        equip[i] = 0;
        gun[i][0] = 1;
        ammo[i][0] = 10;
        clips[i][0] = 3;
        gun[i][1] = 0;
        clips[i][1] = 0;
        ammo[i][1] = 0;

        down[i] = false;
        downCount[i] = 0;

        ydir[i] = 0;
        swapCount[i] = 0;
        runCount[i] = 0;
        directionFacing[i] = 1;
        ground[i] = 430;
        streak[i] = 0;
        reload[i] = false;
        jetpack[i] = false;
        killcount[i] = 0;
        shooting[i] = false;
        shootCount[i] = 0;
        stun[i] = false;
        healthpack[i] = false;
        healthpacky[i] = -20;
        kills[i] = 0;
        deaths[i] = 0;
        deadCount[i] = 100;
        shotsFired[i] = 0;
        shotsHit[i] = 0;
        left[i] = false;
        right[i] = false;
        fuelCount[i] = 0;
        fuel[i] = 0;

        jump[i] = false;
        jumpCount[i] = 0;
    }

    xpos[0] = 670;
    xpos[1] = 10;

    console.log("Successfully init game");

    play = true;

}; //intigame
//end init game

function loadMap() {

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

    if (input.time == 'd') {
        //player 0-Red
        if (key == 39) {
            right[senderID] = true;
            left[senderID] = false;
        }
        if (key == 37) {
            left[senderID] = true;
            right[senderID] = false;
        }
        if (key == 222 || key == 96 || key == 32) {
            if (shooting[senderID] == false && reload[senderID] == false && stun[senderID] == false) {
                //console.log("Shots fired!");
                shooting[senderID] = true;
            }
        }
       
        if (key == 38) {
            if (ydir[senderID] == 0 && ypos[senderID] == ground[senderID] - 20) {
                ydir[senderID] = -jumpSpeed;
            } else {
                //if (fuel[senderID] > 0 && streak[senderID] >= 3) jetpack[senderID] = true;
            }
        }
        if (key == 40) {
            down[senderID] = true;
        }
    }
    if (input.time == 'u') {
        if (key == 39) {
            right[senderID] = false;
        }
        if (key == 37) {
            left[senderID] = false;
        }
        if (key == 40) {
            down[senderID] = false;

            //REMEMBER TO STOP JETPACKS
        }
        if (key == 222 || key == 96 || key == 32) {
            if (shooting[senderID] == true && reload[senderID] == false && stun[senderID] == false) {
                //console.log("No more shooting!!");
                shooting[senderID] = false;
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
function newBullet(i) {
    //pistol
    if (gun[i][equip[i]] == 1) {
        if (shootCount[i] >= 12 && ammo[i][equip[i]] > 0) {
            for (k = 0; k <= 99; k++) {
                if (b[i][k] == false) {
                    shotsFired[i]++;
                    b[i][k] = true;
                    if (directionFacing[i] == 1) {
                        bxdir[i][k] = 10 * fps;//was 10
                        bydir[i][k] = 0;
                        bx[i][k] = xpos[i];
                        by[i][k] = ypos[i] + 4;
                        if (streak[i] < 10) ammo[i][equip[i]]--;
                        shootCount[i] = 0;
                        shotType[i][k] = 1;
                        return true;
                    } else if (directionFacing[i] == 0) {
                        bxdir[i][k] = -10 * fps;//-10
                        bydir[i][k] = 0;
                        bx[i][k] = xpos[i];
                        by[i][k] = ypos[i] + 4;
                        if (streak[i] < 10) ammo[i][equip[i]]--;
                        shotType[i][k] = 1;
                        shootCount[i] = 0;
                        return true;
                    }
                }
            }
        }
    }
    //assault
    if (gun[i][equip[i]] == 2) {
        if (shootCount[i] >= 3 && ammo[i][equip[i]] > 0) {
            for (k = 0; k <= 99; k++) {
                if (b[i][k] == false) {
                    shotsFired[i]++;
                    b[i][k] = true;
                    if (directionFacing[i] == 1) {
                        bxdir[i][k] = 14 * fps;//was 14
                        bydir[i][k] = 0;
                        bx[i][k] = xpos[i];
                        by[i][k] = ypos[i] + 4;
                        if (streak[i] < 10) ammo[i][equip[i]]--;
                        shootCount[i] = 0;
                        shotType[i][k] = 2;
                        return true;
                    } else if (directionFacing[i] == 0) {
                        bxdir[i][k] = -14 * fps;//-14
                        bydir[i][k] = 0;
                        bx[i][k] = xpos[i];
                        by[i][k] = ypos[i] + 4;
                        if (streak[i] < 10) ammo[i][equip[i]]--;
                        shootCount[i] = 0;
                        shotType[i][k] = 2;
                        return true;
                    }
                }
            }
        }
    }
    //uzi
    if (gun[i][equip[i]] == 3) {
        if (shootCount[i] >= 3 && ammo[i][equip[i]] > 0) {
            for (k = 0; k <= 99; k++) {
                if (b[i][k] == false) {
                    shotsFired[i]++;
                    b[i][k] = true;
                    if (directionFacing[i] == 1) {
                        bxdir[i][k] = 14 * fps; // was 14
                        bydir[i][k] = 0;
                        bx[i][k] = xpos[i];
                        by[i][k] = ypos[i] + 4;
                        if (streak[i] < 10) ammo[i][equip[i]]--;
                        shootCount[i] = 0;
                        shotType[i][k] = 3;
                        return true;
                    } else if (directionFacing[i] == 0) {
                        bxdir[i][k] = -14 * fps;//was -14
                        bydir[i][k] = 0;
                        bx[i][k] = xpos[i];
                        by[i][k] = ypos[i] + 4;
                        if (streak[i] < 10) ammo[i][equip[i]]--;
                        shotType[i][k] = 3;
                        shootCount[i] = 0;
                        return true;
                    }
                }
            }
        }
    }
    //sniper
    if (gun[i][equip[i]] == 4) {
        if (shootCount[i] >= 30 && ammo[i][equip[i]] > 0) {
            for (k = 0; k <= 99; k++) {
                if (b[i][k] == false) {
                    shotsFired[i]++;
                    b[i][k] = true;
                    if (directionFacing[i] == 1) {
                        bxdir[i][k] = 20 * fps;//was 20
                        bydir[i][k] = 0;
                        bx[i][k] = xpos[i];
                        by[i][k] = ypos[i] + 4;
                        if (streak[i] < 10) ammo[i][equip[i]]--;
                        shotType[i][k] = 4;
                        shootCount[i] = 0;
                        return true;
                    } else if (directionFacing[i] == 0) {
                        bxdir[i][k] = -20 * fps;//was -20
                        bydir[i][k] = 0;
                        bx[i][k] = xpos[i];
                        by[i][k] = ypos[i] + 4;
                        if (streak[i] < 10) ammo[i][equip[i]]--;
                        shotType[i][k] = 4;
                        shootCount[i] = 0;
                        return true;
                    }
                }
            }
        }
    }
    //flamethrower
    if (gun[i][equip[i]] == 5) {
        if (shootCount[i] >= 1 && ammo[i][equip[i]] > 0) {
            for (k = 0; k <= 99; k++) {
                if (b[i][k] == false) {
                    shotsFired[i]++;
                    b[i][k] = true;
                    if (directionFacing[i] == 1) {
                        flameDis[i][k] = xpos[i] + 200;
                        bxdir[i][k] = 11 * fps; // was 11
                        bydir[i][k] = 0;
                        bx[i][k] = xpos[i];
                        by[i][k] = ypos[i] + 4;
                        if ((streak[i] < 10) && k % 2 == 0)
                            ammo[i][equip[i]]--;
                        shotType[i][k] = 5;
                        shootCount[i] = 0;
                        return true;
                    } else if (directionFacing[i] == 0) {
                        flameDis[i][k] = xpos[i] - 180;
                        bxdir[i][k] = -11 * fps;// was -11
                        bydir[i][k] = 0;
                        bx[i][k] = xpos[i];
                        by[i][k] = ypos[i] + 4;
                        if ((streak[i] < 10) && k % 2 == 0)
                            ammo[i][equip[i]]--;
                        shotType[i][k] = 5;
                        shootCount[i] = 0;
                        return true;
                    }
                }
            }
        }
    }
    //shotgun
    if (gun[i][equip[i]] == 6) {
        if (shootCount[i] >= 25 && ammo[i][equip[i]] > 0) {
            for (k = 0; k <= 95; k++) {
                if (b[i][k] == false) {
                    for (r = 0; r <= 4; r++) {
                        shotsFired[i]++;
                        b[i][k + r] = true;
                        if (directionFacing[i] == 1) {
                            //shotgunDis[i][k+r] =xpos[i]+220;
                            shotgunDis[i][k + r] = xpos[i] + 160;
                            bxdir[i][k + r] = 15 * fps;//was 15
                            bydir[i][k + r] = (-2 * fps) + (r * fps);//-2
                            bx[i][k + r] = xpos[i];
                            by[i][k + r] = ypos[i] + 4;
                            shotType[i][k + r] = 6;
                            shootCount[i] = 0;
                        } else if (directionFacing[i] == 0) {
                            //shotgunDis[i][k+r] =xpos[i]-200;
                            shotgunDis[i][k + r] = xpos[i] - 140;
                            bxdir[i][k + r] = -15 * fps;//was 15
                            bydir[i][k + r] = (-2 * fps) + (r * fps);//-2
                            bx[i][k + r] = xpos[i];
                            by[i][k + r] = ypos[i] + 4;
                            shotType[i][k + r] = 6;
                            shootCount[i] = 0;
                        }
                    }
                    if (streak[i] < 10) ammo[i][equip[i]]--;
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
        this.server_time = this.local_time;

        //jetpack
        /*for (i = 0; i < playerCount; i++) {
            if (streak[i] >= 3 && ydir[i] != 0 && jetpack[i] == true) {
                if (fuel[i] > 0) {
                    fuel[i] = fuel[i] - fps * modifier;
                    if (ydir[i] >= -7 * fps) {//was -7
                        ydir[i] = ydir[i] - (3 * fps);//was - 3
                    }
                }
                else
                    jetpack[i] = false;
            }
        }*/

        //collisions
        for(i = 0; i < playerCount; i++) {
            if (xpos[i] >= 680) {
                xpos[i] = 679;
            }
            if (xpos[i] <= 0) {
                xpos[i] = 1;
            }
        }

        //updating 2 players
        for (i = 0; i < playerCount; i++) {
            //console.log("in here lol!");
            shootCount[i] = shootCount[i] + fps * modifier;
            if (shooting[i] == true) {
                //console.log("try to create new bullet!");
                if (newBullet(i)) {
                    newBulletType[newBulletCount] = gun[i][equip[i]];
                    newBulletX[newBulletCount] = xpos[i];
                    newBulletY[newBulletCount] = ypos[i] + 4;
                    newBulletSender[newBulletCount] = i;
                    newBulletDir[newBulletCount] = directionFacing[i];
                    newBulletCount++;
                    //console.log("Created!");
                }
            }

            //holding down
            if (down[i] == true) {
                downCount[i] = downCount[i] + fps * modifier;
            }

            //set ydir
            ydir[i] = ydir[i] + playerFallSpeed * modifier;// used to be 1
            //global collision y platforms
            for (k = 0; k <= 14; k++) {
                if (block[k] == true && xpos[i] + 20 >= blockx[k] && xpos[i] <= blockx[k] + blockw[k] && ypos[i] + 20 + (ydir[i] * modifier) <= blocky[k] + (ydir[i] * modifier) && ypos[i] + 20 + (ydir[i] * modifier) >= blocky[k]) {// + (ydir[i]) 5
                    ground[i] = blocky[k];
                    k = 15;
                } else if (k == 14) {
                    ground[i] = 430;
                }
            }

            //y movement
            if (ypos[i] + 20 + (ydir[i] * modifier) >= ground[i] && ydir[i] > 0) {
                ydir[i] = 0;
                ypos[i] = ground[i] - 20;
            }

            //x movement
            if (right[i] == true) {
                directionFacing[i] = 1;
                xdir[i] = playerSpeed;
            } else if (left[i] == true) {
                directionFacing[i] = 0;
                xdir[i] = -playerSpeed;
            } else if (left[i] == false && right[i] == false) {
                xdir[i] = 0;
            }
        }

        //flamethrower fire and shotgun UPDATE
        for (i = 0; i < playerCount; i++) {
            for (k = 0; k <= 99; k++) {
                if (b[i][k] == true && shotType[i][k] == 5) {
                    if (bxdir[i][k] > 0 && bx[i][k] >= flameDis[i][k]) b[i][k] = false;
                    if (bxdir[i][k] < 0 && bx[i][k] <= flameDis[i][k]) b[i][k] = false;
                }
                if (b[i][k] == true && shotType[i][k] == 6) {
                    if (bxdir[i][k] > 0 && bx[i][k] >= shotgunDis[i][k]) b[i][k] = false;
                    if (bxdir[i][k] < 0 && bx[i][k] <= shotgunDis[i][k]) b[i][k] = false;
                }
            }
        }

        for (i = 0; i < playerCount; i++) {
            //do movement

            if (jump[i] == true) {
                jumpCount[i] = jumpCount[i] + fps * modifier;
                xdir[i] = 0;
                ydir[i] = 0;

                if (jumpCount[i] == 2) {
                    if (right[i] == true) xpos[i] = xpos[i] + 20 * fps;
                    if (left[i] == true) xpos[i] = xpos[i] - 20;

                }
                if (jumpCount[i] == 6) {

                    if (right[i] == true) xpos[i] = xpos[i] - 40;
                    if (left[i] == true) xpos[i] = xpos[i] + 40;


                }
                if (jumpCount[i] == 10) {

                    jump[i] = false;
                    jumpCount[i] = 0;
                    if (right[i] == true) xpos[i] = xpos[i] + 40;// || directionFacing[i] == 1 //ON ALL
                    if (left[i] == true) xpos[i] = xpos[i] - 40;

                }
            }
            //console.log("updating x pos: " + xpos[i] + " by " + (xdir[i] * modifier));
            xpos[i] = xpos[i] + (xdir[i] * modifier);
            ypos[i] = ypos[i] + (ydir[i] * modifier);
        }

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
        this.laststate = {};
        this.laststate.hpx = hostX;//this.xpos[0];              //'host position', the game creators position
        this.laststate.hpy = hostY;                //'host position', the game creators position
        this.laststate.hpxdir = hostxdir;             //'host direction'
        this.laststate.hpydir = hostydir;             //'host direction'
        this.laststate.cpx = otherX;               //'client position', the person that joined, their position
        this.laststate.cpy = otherY;               //'client position', the person that joined, their position
        this.laststate.cpxdir = otherxdir;             //'client direction'
        this.laststate.cpydir = otherydir;             //'client direction'
        this.laststate.newBullets = newBulletCount; //amount of new bullets
        if (newBulletCount > 0) {//create the bullets!!!
            //console.log(" about to print! ");
            console.log("Bullet sender: " + newBulletSender[0]);
            this.laststate.newBulletsType = JSON.stringify(newBulletType);
            this.laststate.newBulletXs = JSON.stringify(newBulletX);//newBulletXs
            this.laststate.newBulletYs = JSON.stringify(newBulletY);
            this.laststate.newBulletSend = JSON.stringify(newBulletSender);
            this.laststate.newBulletDirs = JSON.stringify(newBulletDir);

            //new ammos
            this.laststate.newHAmmoAmount = ammo[0][equip[0]];//add ammo
            this.laststate.newCAmmoAmount = ammo[1][equip[1]];//add ammo
        }
        this.laststate.t = this.server_time;                      // our current local time on the server

        //console.log("LOL");

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

        //console.log("DATA HAS BEEN RELEASED! Bullet count: " + newBulletCount);

        //reseting the bullets
        newBulletCount = 0;
        newBulletDir = [];
        newBulletType = [];
        newBulletX = [];
        newBulletY = [];
        newBulletSender = [];

        then = now;

        //client.send('s.p.' + message_parts[1]);
    }
}

function createJSONPairs(newJSON) {

}