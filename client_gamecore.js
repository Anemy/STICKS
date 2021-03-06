/*  Copyright (c) 2014 Rhys Howell & Paul Henninger
    
    Written for: http://stick-battle.com
    
    * Stick Battle
    * Client game core
*/

var version = 1.01;

var canvas;
var gameWidth;
var gameHeight;
var scale = 1.4;//1.8;//fb default: 1.08571428571;

var classicWidth = 700;
var classicHeight = 450;

var then = 0;

//java script b weird
var i = 0;
var k = 0;
var j = 0;
var q = 0;
var t = 0;
var r = 0;
var u = 0;
var num = 0;
var round = 0;
var random = 0;

//menus
var menu = 0;
//0=open screen
//1=player select screen
//3=game countdown
//2=map select screen
//4=empty screen
//5=postgame screen
//6=mode select
//7=multiplayer settings select
//8=select multiplayer mode

//10=searching for game
//11=found game, connecting
//12=hosting game waiting for someong
var mapSelect = 0;
var mapSelectSpeed = 0;
var mapSelectAcc = 0;

var boxx = 420;
var boxy = 140;

var play = false;
var checked = [];
var checkedx = [];
var checkedy = [];
var checkCount = 0;

var rematch = false;
var reset = false;

var startCount = 0;
var winner = "";

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

var players;

var fps = 40;

var jumpSpeed = 15 * fps;//was then 25
var playerSpeed = 8 * fps; //it was 8 at fps = 25(40)
var zombieSpeed = 6 * fps; //it was 6 at fps = 25(40)
var playerFallSpeed = 40 * fps; // was 1
var playerLungeSpeed = 15 * fps; // was 15

//dogs
var dog = [];
var dogxpos = [];
var dogypos = [];
var dogxdir = [];
var dogydir = [];
var dogground = [];
var dogdirectionFacing = [];
var dogleft = [];
var dogright = [];
var dogtargetx = [];
var dogtargety = [];
var dogupPath = [];

//CONSTANTS
var RIGHT = 1;
var LEFT = 0;

var mouseX = 0;
var mouseY = 0;

//loading poppums!!!!
var loadingPActivated = false;
//window.onmousemove = null;
//popXPos , popYPos , popXDir , popYDir , popFacing(0 or 1) , runCount
var dogBase = function () {
    this.xPos = 30;
    this.yPos = 410;

    this.xDir = 0;
    this.yDir = 0;

    this.facing = RIGHT; //1 right 0 left
    this.left = false;
    this.right = false;

    this.runCount = 0;

    this.jump = false;

};
var pop;

//teams
var teams = false;
var team = [];
//player stats
var health = []; // all 25
var fuel = [];
var jetpack = [];
var fuelCount = [];

//flags
var hold = [];
var holding = [];
var flagx = [];
var flagy = [];
var score = [];
var scoreMax = 3;

//fonts
/*var font =( "9px Arial";
var font2 = "14px Arial";
var font3 = "20px Arial";
var font4 = "30px Arial";
var font5 = "120px Arial";*/

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

//weapons
var gun = []; //(25 ,  2); // double 25 2
for (i = 0; i < 25; i++) {
    gun[i] = [];
}
var equip = [];

//flame thrower distance and shotgun distance
var flameDis = []; // doublea 25 100 VVVV(25 ,  100)
var shotgunDis = [];
for (i = 0; i < 25; i++) {
    flameDis[i] = [];
    shotgunDis[i] = [];
}

//sword
var lunge = [];
var lungeCount = [];
var jump = [];
var jumpCount = [];
var stun = [];
var stunCount = [];

//kill limit/survival
var killLimit = 15;
var teamkills = [];

//blood
var bloodx = []; //(25 ,  1000)
var bloody = [];
var blood = [];
var bloodxdir = [];
var bloodydir = [];
var bloodCount = [];
for (i = 0; i < 25; i++) {
    bloodx[i] = [];
    bloody[i] = [];
    blood[i] = [];
    bloodxdir[i] = [];
    bloodydir[i] = [];
    bloodCount[i] = [];
}

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

//modes
var zombie = false;
var custom = false;
var swords = false;
var survival = false;
var lives = [];
var tempLives = 0;


//ai
var cpu = [];
var targetx = [];
var targety = [];
var upPath = [];
var zombieAlive = 1;

var maxZombies = 23;

//Images

//backgrounds
var background = []; // 1 for now
//images
var platformMid = [];   // 1 for now 
var platformLeft = [];  //
var platformRight = []; // 

var gunRight = []; //gun right 10
var gunLeft = []; //gun left
var gunUp = []; //gun up 10 2
var gunDown = [];
for (i = 0; i < 10; i++) {
    gunUp[i] = [];
    gunDown[i] = [];
}

var swordSlash = []; //2
var swordStill = [];
var redSwordSlash = [];
var redSwordStill = [];


var playerR = []; //stand still right 4
var playerL = []; //stand still left
var playerLm = []; //move left 4 2
var playerRm = []; //move right
var playerFall = []; //falling
var playerJump = []; //jumping
var playerIcon = []; //select screen icons

var joinImage = [];
var selectPlayerImage = [];

for (i = 0; i < 4; i++) {
    playerLm[i] = [];
    playerRm[i] = [];
    playerFall[i] = [];
    playerJump[i] = [];
}

var zombieR;
var zombieL;
var zombieLm = []; //2
var zombieRm = [];
var zombieHitCount = 0;

var hp;
var am;
var jet;
var flag = [];

var ex2;
//maps
var map = [];
var blockImage = [];
var on = []; // 25 15 bool
for (i = 0; i < 25; i++) {
    on[i] = [];
}


//menu images
var menuImage = [];
var check = [];
var X;
var control = [];
var numbers = [];
var endgame;
var endgameonline;
var endgameZombie;
var mapSelectImage;
var mapSelectBackgroundImage;
var menuBackgroundImage;
var cloudsImage;
var menuPlayerImage;
var botIcon = [];
var onlinePlayerControlsImage;

var controls = [];
var option = [];
var onlineOption = [];
var optionArrow;
var optionArrowLeft;
var optionY = 0;
var optionX = 0;
var optionXacc = 0;
var cloudsX = [];
var optionPlayerX = [];
var optionSettingsX = [];
var toggle = [];
//dogs
var dogRm = [];
var dogLm = [];
var dogR;
var dogL;

//counters
var runCount = [];
var pleaseReload = 0;

var swap = [];
var swapCount = [];

var deadCount = [];

//split screen
var split = true;
var wx = [];
var wy = [];
var leader = [];

/**/
/*****************/
/**/

//ONLINE VARS
var playerID;
var playerHost; //true/f was player_instance DEPRICATED
var onlinePlayerNum = 0;

var onlineWinner = -1;

//the game types people can be in:
//Also saved in the gamecore
var KILLLIMIT = 1, SURVIVAL = 2;
var QUICK1V1 = 1, FFA = 2, TDM = 3;

var onlineGameMode = 0;//^^
var onlineGameType = 0;

var lastPlayerMovement = 0;

var searchingScreen;
var hostingScreen;
var connectingScreen;

var endGameCounter = 0;

var currentOnlinePlayers = 1;

//ping vars
var lastPingTime = 0.0001;
var netPing = 0.0001;

var mapChosen = false;

var server;

var onlineState = "Offline";
/* onlines states:
* "Offline"
* "Searching for game"
* "Hosting game, waiting"
* "Connecting"
* "Connected please wait"
* "Connected"
* "Disconnected"
*/
//constants for states
var OFFLINE = 'Offline', CONNECTING = 'Connecting', SEARCHING = 'Searching for game', HOSTING = 'Hosting game, waiting', CONNECTED = 'Connected', DISCONNECTED = 'Disconnected', CONNECTEDWAIT = 'Connected please wait', OTHERDISCONNECTED = 'Other player disconnected';

var playerPosition = function(x,y,xd,yd) {
    this.xPos = x;
    this.yPos = y;
    this.xDir = xd;
    this.yDir = yd;
}

var lastPlayerPos = new playerPosition(0, 0, 0, 0);

//lerp function
//take in 2 return %p on how close to 1st one is requested
function lerp(p, first, second) {
    var difference = second - first;
    return first + ((p / 100) * difference);
}

//my own absoluteValue
/*function abs(first, second) {
    var difference = first - second;
    return (difference > 0) ? difference : -difference;
}*/
function abs(num) {
    return (num > 0) ? num : -num;
}

var server_updates = [];

var otherPlayerColor = 0;
var onlinePlayerColor = 0;
function onColorChange(newColor) {
    onlinePlayerColor = newColor;
    this.socket.send('c.' + newColor);
}

var alreadyConnected = false;

var local_time,
    net_latency,
    net_offset,
    server_time,
    time,
    buffer_size,
    _dtev = Date.now(),
    _dt = Date.now();

var instance;

var readyGame = false,
    connectedGame = false;

create_timer = function () {
    setInterval(function () {
        this._dt = Date.now() - this._dte;
        this._dte = Date.now();
        this.local_time += this._dt / 1000.0;
    }.bind(this), 4);
}

function createOnlineGame() {

    console.log("Creating online game");

    create_timer();

    this.net_latency = 0.001;           //the latency between the client and the server (ping/2)
    this.net_ping = 0.001;              //The round trip time from here to the server,and back
    this.last_ping_time = 0.001;        //The time we last sent a ping

    this.net_offset = 100;              //100 ms latency between server and client interpolation for other clients
    this.buffer_size = 2;               //The size of the server history to keep for rewinding/interpolating.
    this.target_time = 0.01;            //the time where we want to be in the server timeline
    this.oldest_tick = 0.01;            //the last time tick we have available in the buffer

    this.time = 0.01;            //Our local 'clock' based on server time - client interpolation(net_offset).
    this.server_time = 0.01;            //The time the server reported it was at, last we heard from it

    //set the random guns!
    //we get no guns!
    for (i = 0; i <= 9; i++) {
        gunx[i] = -3000;
        guny[i] = 3000;
    }
    swords = false;
    zombie = false;
    survival = false;
    split = false;
    custom = true;

    //We create a player set, passing them
    //the game that is running them, as well
    for (i = 0; i < players; i++) {
        ypos[i] = 410;
        xdir[i] = 0;
        ydir[i] = 0;

        equip[1] = 0;
        gun[1][0] = 1;
        ammo[1][0] = 10;
        clips[1][0] = 3;
        gun[1][1] = 0;
        clips[1][1] = 0;
        ammo[1][1] = 0;
    }

    if (teams) {
        xpos[0] = 670;
        xpos[1] = 10;
        xpos[2] = 680;
        xpos[3] = 640;
    } else {
        xpos[0] = 670;
        xpos[1] = 10;
        xpos[2] = 230;
        xpos[3] = 450;
    }

    level = 1;
    loadMap();
    menu = 3;
    loadingPActivated = false;

    lastPlayerMovement = Date.now();

    onlineState = CONNECTED;
}

var recieveCounter = 0;

onserverupdate_recieved = function (data) {
    //MAKE THE NOT COMMENTED
    this.server_time = data.t;
    //Update our local offset time from the last server update
    this.time = this.server_time - (this.net_offset / 1000);
    recieveCounter++;

    //if (recieveCounter % 1000 == 0)
    //    console.log("Server update recieved at server time: " + this.server_time + " Server's host x: " + data.hpx + " Local 0:" + xpos[0]);
    

    //newHealths
    //new HEALTH update (first so the positions arn't reset
    if (!(typeof data.newHealths === 'undefined')) {
        newHealth = JSON.parse(data.newHealths);

        for (i = 0; i < players; i++) {
            //player was shot
            if(health[i] != newHealth[i])
                createNewBlood(i);

            health[i] = newHealth[i];
            if (health[i] == 0) {
                //WHY IS THIS HERE!!! USE TO CHANGE POS ABSOLUTE
            }
        }
    }

    //newSpots
    //positions
    if (!(typeof data.newSpots === 'undefined')) {

        newPos = JSON.parse(data.newSpots);

        for (i = 0; i < players; i++) {
            if (i == onlinePlayerNum) {
                //calculating local player with relation to server
                //don't want to override server
                if (recieveCounter % 1000 == 0) {
                    //console.log('Client position updated. LocalX: ' + xpos[i] + ' Online x: ' + newPos[i].xpos);
                }

                //auto position if player hasn't moved in a while
                if (Date.now() - lastPlayerMovement > 250) { // hasn't moved in quarter second
                    xpos[onlinePlayerNum] = lerp(75, xpos[onlinePlayerNum], newPos[i].xpos);
                    xdir[onlinePlayerNum] = newPos[i].xdir;
                    ypos[onlinePlayerNum] = lerp(75, ypos[onlinePlayerNum], newPos[i].ypos);//75 % to host y pos
                    ydir[onlinePlayerNum] = newPos[i].ydir;
                }
                    //otherwise make it lerp between the two
                    //after checking for large server/client differences
                else {
                    if (netPing < 120) {
                        if (abs(newPos[i].xpos - xpos[onlinePlayerNum]) > 100) { //if there is big server/client dissagreement and ping is lowish then auto snap
                            xpos[onlinePlayerNum] = newPos[i].xpos;
                            xdir[onlinePlayerNum] = newPos[i].xdir;
                        }
                        if (abs(newPos[i].ypos - ypos[onlinePlayerNum]) > 100) { //if there is big server/client dissagreement and ping is lowish then auto snap
                            ypos[onlinePlayerNum] = newPos[i].ypos;
                            ydir[onlinePlayerNum] = newPos[i].ydir;
                        }

                        //lerp between the two positions based on ping
                        xpos[onlinePlayerNum] = lerp(100 * (netPing / 120), xpos[onlinePlayerNum], newPos[i].xpos);
                        ypos[onlinePlayerNum] = lerp(100 * (netPing / 120), ypos[onlinePlayerNum], newPos[i].ypos);
                    }
                }
            } else {
                xpos[i] = newPos[i].xpos;
                ypos[i] = newPos[i].ypos;
                xdir[i] = newPos[i].xdir;
                ydir[i] = newPos[i].ydir;

                if (xdir[i] > 0.1) {
                    directionFacing[i] = 1;
                    right[i] = true;
                    left[i] = false;
                }
                else if (xdir[i] < -0.1) {
                    directionFacing[i] = 0;
                    right[i] = false;
                    left[i] = true;
                }
                else {
                    right[i] = false;
                    left[i] = false;
                }
            }
        }
    }

    //there are bullets to kill
    if (data.amountOfDeadBullets > 0) {
        bulletsToKill = JSON.parse(data.newDeadBullet);
        //console.log("Thar be a bullet to kill!");
        for (i = 0; i < data.amountOfDeadBullets; i++) {
            b[bulletsToKill[i].owner][bulletsToKill[i].ID] = false;
        }
    }

    //new equiped update
    if (!(typeof data.newEquips === 'undefined')) {

        newEquip = JSON.parse(data.newEquips);

        for (i = 0; i < players; i++) {
            if (gun[i][equip[i]] != newEquip[i].gunEquip && reload[i])
                reload[i] = false;

            equip[i] = newEquip[i].equip;
            gun[i][equip[i]] = newEquip[i].gunEquip;
        }
    }

    //see if new clip amount exists newClips
    if (!(typeof data.newClips === 'undefined')) {
        newClip = JSON.parse(data.newClips);

        for (i = 0; i < players; i++) {
            clips[i][equip[i]] = newClip[i];
        }
    }

    //setting the new ammo counts
    if (!(typeof data.newAmmos === 'undefined')) {
        newAmmoCounts = JSON.parse(data.newAmmos);

        for (i = 0; i < players; i++) {
            ammo[i][equip[i]] = newAmmoCounts[i];
        }
    }

    //the newJetPacks !1
    if (data.jetpackActivated) {
        newJets = JSON.parse(data.newJetPacks);
        //console.log("Using jetpack");
        for (i = 0; i < players; i++) {
            if (i == onlinePlayerNum) {
                if (jetpack[i] == false && newJets[i].jetpack == true) {
                    jetpack[i] = true;
                }
                if (netPing < 120) {
                    //lerp between the fuels based on ping
                    fuel[onlinePlayerNum] = lerp(100 * (netPing / 120), fuel[onlinePlayerNum], newJets[i].fuel);
                }
                else {
                    fuel[onlinePlayerNum] = newJets[i].fuel;
                }
            } else {
                jetpack[i] = newJets[i].jetpack;

                fuel[i] = newJets[i].fuel;
            }
        }
    }

    if (data.updateFully == true) { //do everything the server has to ensure integrity.
        //console.log("Fully update me!!!!");

        fullUpdate = JSON.parse(data.fullUpdates);
        for (i = 0; i < players; i++) {
            streak[i] = fullUpdate[i].streak;
            deadCount[i] = fullUpdate[i].deadCount;
            deaths[i] = fullUpdate[i].deaths;
            kills[i] = fullUpdate[i].kills;
            healthpack[i] = fullUpdate[i].healthpack;
        }

        if (data.gameIsOver == true) {
            //console.log("From server: game is over!!! : " + data.gameIsOver);
            //endGameCounter++;
            onlineWinner = data.winner;
            menu = 5;
            play = false;
        }
    }

    var newGunsAdded = [];

    //create new guns
    for (m = 0; m < data.newGunNum; m++) {
        if(m == 0)
            newGunsAdded = JSON.parse(data.newGun);

        //console.log("Hit up another gun type: " + newGunsAdded[m].newGunType + " homies at this x POS: " + newGunsAdded[m].newGunX + " and y: " + newGunsAdded[m].newGunY);

        if (m < 6) {
            gunx[newGunsAdded[m].newGunType] = newGunsAdded[m].newGunX;
            guny[newGunsAdded[m].newGunType] = newGunsAdded[m].newGunY;
        }
    }
    
    var newBulletsAdded = [];
    //console.log("WE GOT NEW BULLETS?! SIZE: " + data.newBulletNum);
    //create new bullets
    for (m = 0; m < data.newBulletNum; m++) {
        //console.log("We got a new bullet yo");

        //first time set the array
        if (m == 0) {
            //newBullets.push(xpos[i], ypos[i] + 4, directionFacing[i], i, gun[i][equip[i]]);
            newBulletsAdded = JSON.parse(data.newBulleters);

            //make reload blue bar thing
            for (i = 0; i < players; i++) {
                if (ammo[i][equip[i]] == 0) {
                    if (clips[i][equip[i]] > 0 && gun[i][equip[i]] > 0 && reload[i] == false && streak[i] < 10) {
                        reload[i] = true;
                        reloadCount[i] = 0;
                    }
                }
            }
        }

        //set the shooter !!1
        i = newBulletsAdded[m].newBulletSender;

        //create the new bullet!
        //pistol
        if (newBulletsAdded[m].newBulletType == 1) {
            //console.log("Shoot the pistol!");
            for (k = 0; k <= 99; k++) {
                if (b[i][k] == false) {
                    b[i][k] = true;
                    if (newBulletsAdded[m].newBulletDir == 1) {
                        bxdir[i][k] = 10 * fps;
                    } else if (newBulletsAdded[m].newBulletDir == 0) {
                        bxdir[i][k] = -10 * fps;
                    }
                    bydir[i][k] = 0;
                    bx[i][k] = newBulletsAdded[m].newBulletX;
                    by[i][k] = newBulletsAdded[m].newBulletY;
                    shotType[i][k] = 1;
                    k = 100;
                }
            }
        }
        //assault
        if (newBulletsAdded[m].newBulletType == 2) {
            for (k = 0; k <= 99; k++) {
                if (b[i][k] == false) {
                    b[i][k] = true;
                    if (newBulletsAdded[m].newBulletDir == 1) {
                        bxdir[i][k] = 14 * fps;//was 14
                    } else if (newBulletsAdded[m].newBulletDir == 0) {
                        bxdir[i][k] = -14 * fps;//-14
                    }
                    bydir[i][k] = 0;
                    bx[i][k] = newBulletsAdded[m].newBulletX;
                    by[i][k] = newBulletsAdded[m].newBulletY;
                    shotType[i][k] = 2;
                    k = 100;
                }
            }
        }
        //uzi
        if (newBulletsAdded[m].newBulletType == 3) {
            for (k = 0; k <= 99; k++) {
                if (b[i][k] == false) {
                    b[i][k] = true;
                    if (newBulletsAdded[m].newBulletDir == 1) {
                        bxdir[i][k] = 14 * fps; // was 14
                    } else if (newBulletsAdded[m].newBulletDir == 0) {
                        bxdir[i][k] = -14 * fps;//was -14
                    }
                    bydir[i][k] = 0;
                    bx[i][k] = newBulletsAdded[m].newBulletX;
                    by[i][k] = newBulletsAdded[m].newBulletY;
                    shotType[i][k] = 3;
                    k = 100;
                }
            }
        }
        //sniper
        if (newBulletsAdded[m].newBulletType == 4) {
            for (k = 0; k <= 99; k++) {
                if (b[i][k] == false) {
                    b[i][k] = true;
                    if (newBulletsAdded[m].newBulletDir == 1) {
                        bxdir[i][k] = 20 * fps;//was 20

                    } else if (newBulletsAdded[m].newBulletDir == 0) {
                        bxdir[i][k] = -20 * fps;//was -20
                    }
                    bydir[i][k] = 0;
                    bx[i][k] = newBulletsAdded[m].newBulletX;
                    by[i][k] = newBulletsAdded[m].newBulletY;
                    shotType[i][k] = 4;
                    k = 100;
                }
            }
        }
        //flamethrower
        if (newBulletsAdded[m].newBulletType == 5) {
            for (k = 0; k <= 99; k++) {
                if (b[i][k] == false) {
                    b[i][k] = true;
                    if (newBulletsAdded[m].newBulletDir == 1) {
                        flameDis[i][k] = newBulletsAdded[m].newBulletX + 200;
                        bxdir[i][k] = 11 * fps; // was 11
                    } else if (newBulletsAdded[m].newBulletDir == 0) {
                        flameDis[i][k] = newBulletsAdded[m].newBulletX - 180;
                        bxdir[i][k] = -11 * fps;// was -11
                    }
                    bydir[i][k] = 0;
                    bx[i][k] = newBulletsAdded[m].newBulletX;
                    by[i][k] = newBulletsAdded[m].newBulletY;
                    shotType[i][k] = 5;
                    k = 100;
                }
            }
        }
        //shotgun
        if (newBulletsAdded[m].newBulletType == 6) {
            for (k = 0; k <= 95; k++) {
                if (b[i][k] == false) {
                    for (r = 0; r <= 4; r++) {
                        b[i][k + r] = true;
                        if (newBulletsAdded[m].newBulletDir == 1) {
                            shotgunDis[i][k + r] = newBulletsAdded[m].newBulletX + 160;
                            bxdir[i][k + r] = 15 * fps;//was 15
                        } else if (newBulletsAdded[m].newBulletDir == 0) {
                            shotgunDis[i][k + r] = newBulletsAdded[m].newBulletX - 140;
                            bxdir[i][k + r] = -15 * fps;//was 15
                        }
                        bydir[i][k + r] = (-2 * fps) + (r * fps);//-2
                        bx[i][k + r] = newBulletsAdded[m].newBulletX;
                        by[i][k + r] = newBulletsAdded[m].newBulletY;
                        shotType[i][k + r] = 6;
                    }
                }
                k = 100;
            }
        }
    }

    //}

    //We can see when the last tick we know of happened.
    //If time gets behind this due to latency, a snap occurs
    //to the last tick. Unavoidable, and a reallly bad connection here.
    //If that happens it might be best to drop the game after a period of time.
    this.oldest_tick = data.t;

}; //onserverupdate_recieved

resetOnlinePlayer = function () {

}

create_ping_timer = function () {

    //Set a ping timer to 1 second, to maintain the ping/latency between
    //client and server and calculated roughly how our connection is doing

    setInterval(function () {

        this.lastPingTime = new Date().getTime();
        this.socket.send('p.' + (this.lastPingTime));

    }.bind(this), 1000);

}; //create_ping_timer

onreadygame = function (data) {

    var server_time = parseFloat(data.replace('-', '.'));

    //var player_host = this.playerHost ? this.players.self : this.players.other;
    //var player_client = this.players.self.host ? this.players.other : this.players.self;

    this.local_time = server_time + this.net_latency;
    if (isNaN(local_time))
        local_time = 0.016;

    console.log('server time is about ' + this.local_time);

    this.onlineState = 'Connected please wait';
    menu = 12;
    loadingPActivated = true;

    this.readyGame = true;

    createOnlineGame();

}; //onreadygame

onjoingame = function (data) {
    //Update the local state
    this.menu = 12;
    this.onlineState = 'Connected please wait';
    this.onlinePlayerColor = '#00bb00';
    loadingPActivated = true;
    //window.onmousemove = mouseMove;
}; //onjoingame

onconnected = function (data) {
    if (onlineState != CONNECTED) {
        console.log("On connected called, with the online State: " + onlineState);

        //The server responded that we are now in a game,
        //this lets us store the information about ourselves and set the colors
        //to show we are now ready to be playing.
        playerID = data.id;
        onlinePlayerColor = '#cc0000';
        onlineState = CONNECTED;

        console.log("On connected.");

        this.connectedGame = true;
    }
}; //onconnected

on_otherclientcolorchange = function (data) {

    otherPlayerColor = data;

}; //on_otherclientcolorchange

onping = function (data) {

    this.netPing = new Date().getTime() - parseFloat(data);
    this.net_latency = this.newPing / 2;

}; //onping

onnetmessage = function (data) {

    var commands = data.split('.');
    var command = commands[0];
    var subcommand = commands[1] || null;
    var commanddata = commands[2] || null;

    if (subcommand != 'p')
        console.log("Message recieved from server with command: " + subcommand);

    switch (command) {
        case 's': //server message

            switch (subcommand) {
                case 'm': //map chosen
                    //console.log("Map chosen message recieved by server");
                    level = commanddata;
                    startThatMap(commanddata);
                    break;

                case 'j': //join a game requested
                    this.onjoingame(commanddata); break;

                case 'r': //ready a game requested
                    this.onreadygame(commanddata); break;

                case 'e': //end game requested
                    this.ondisconnect(commanddata); break;

                case 'p': //server ping
                    this.onping(commanddata); break;

                case 'c': //other player changed colors
                    this.on_otherclientcolorchange(commanddata); break;

                case 'n': //more players joined
                    players = commanddata;
                    currentOnlinePlayers = commanddata; break;

                case 'i': //this players number
                    console.log("This online player num: " + commanddata);
                    onlinePlayerNum = commanddata; break;

            } //subcommand

            break; //'s'
    } //command

}; //onnetmessage

ondisconnect = function (data) {
    console.log("On disconnect called, with online State: " + onlineState);
    if (onlineState == CONNECTED) {
        //send to disconnect from game
        this.socket.send('d.disconnect');
        //socket.disconnect();

        console.log("Disconnected.");
        resetGame();

        alreadyConnected = true;

        //onlineState = DISCONNECTED;

        //return to game select screen
        menu = 8;

        custom = true;
        zombie = false;
        checked[0] = false;
        checkedx[0] = -50;
        optionY = 0;
    }

    /*//When we disconnect, we don't know if the other player is
    //connected or not, and since we aren't, everything goes to offline

    this.players.self.info_color = 'rgba(255,255,255,0.1)';
    this.players.self.state = 'not-connected';
    this.players.self.online = false;

    this.players.other.info_color = 'rgba(255,255,255,0.1)';
    this.players.other.state = 'not-connected';*/

}; //ondisconnect

find_a_game = function (gameType) {
    if (alreadyConnected) {
        var server_packet = 'f.';
        server_packet += gameType;//tell the server to find a game for this client

        //Go
        this.socket.send(server_packet);
    }
}

connect_to_server = function (gameTypeToFind) {

    //Store a local reference to our connection to the server
    //was this. everywhere
    if (alreadyConnected == false) {
        socket = io.connect();
        alreadyConnected = true;

        //Sent when we are disconnected (network, server down, etc)
        socket.on('disconnect', this.ondisconnect.bind(this));
        //Sent each tick of the server simulation. This is our authoritive update
        socket.on('onserverupdate', this.onserverupdate_recieved.bind(this));
        //Handle when we connect to the server, showing state and storing id's.
        socket.on('onconnected', this.onconnected.bind(this));
        //On error we just show that we are not connected for now. Can print the data.
        socket.on('error', this.ondisconnect.bind(this));
        //On message from the server, we parse the commands and send it to the handlers
        socket.on('message', this.onnetmessage.bind(this));

        //A list of recent server updates we interpolate across
        //This is the buffer that is the driving factor for our networking
        this.server_updates = [];

        //Connect to the socket.io server!
        //this.connect_to_server();

        //We start pinging the server to determine latency
        this.create_ping_timer();

        //When we connect, we are not 'connected' until we have a server id
        //and are placed in a game by the server. The server sends us a message for that.
        socket.on('connect', function () {
            //console.log("Connected to something...");
            onlineState = 'Searching for game';
            find_a_game(gameTypeToFind);
        }.bind(this));
    }
    else {
        //console.log("Already connected firing (doing nothing)");
        onlineState = 'Searching for game';
        find_a_game(gameTypeToFind);
        /*socket.socket.connect();
        var server_packet = 'f.';
        server_packet += 'Hellozdfwefscx';//tell the server to find a game for this client

        //Go
        this.socket.send(server_packet);
        console.log("Sent reconnect packet.");*/
    }
}; //connect_to_server


function init() {//instance\

    mapChosen = false;

    console.log("On init");

    pop = new dogBase();

    //game.canvas = document.createElement("canvas");

    //Store the instance, if any
    //this.instance = game_instance;
    //Store a flag if we are the server
    //this.server = this.instance !== undefined;

    //A local timer for precision on server and client
    this.local_time = 0.016;            //The local timer

    canvas = document.createElement("canvas");
    //var context = canvas.getContext("2d");
    gameWidth = classicWidth * scale;
    gameHeight = classicHeight * scale;
    canvas.width = gameWidth;
    canvas.height = gameHeight;

    document.body.appendChild(canvas);

    for (i = 0; i <= 3; i++) {
        healthpacky[i] = -20;
    }

    loadImages();

    //max ammo
    maxAmmo[0] = 10;
    maxAmmo[1] = 12;
    maxAmmo[2] = 20;
    maxAmmo[3] = 4;
    maxAmmo[4] = 60;
    maxAmmo[5] = 5;
    maxAmmo[6] = 4;
    maxAmmo[7] = 6;

    optionPlayerX[0] = 0;
    optionPlayerX[1] = 0;
    optionPlayerX[2] = 2;
    optionPlayerX[3] = 2;
    optionPlayerX[4] = 2;

    optionSettingsX[0] = 0;
    optionSettingsX[1] = 0;
    optionSettingsX[2] = 2;
    optionSettingsX[3] = 0;
    optionSettingsX[4] = 0;

    resetGame();

    //setting the AIs to false
    for (i = 0; i < 24; i++) {
        cpu[i] = false;  //ADDED cpu VALUES!!1 WILL CAUSE PROBLEMS?!!? @@@@@@@@@@@@@@@@@@@@@@@
    }

    then = Date.now();
    map[1].onload = function () {
        console.log("Start game loop");
        startGameLoop();
        //setTimeout(function () { startGameLoop(context) }, 1000);
    };

} //init

//resets all vars
function resetGame() {

    loadingPActivated = false;
    //window.onmousemove = null;

    //online vars
    netPing = 0.0001;
    lastPingTime = 0.0001;

    endGameCounter = 0;
    
    onlineState = 'Offline';
    optionY = 0;
    optionX = 0;
    //optionPlayerX[0] = 0;
    //optionPlayerX[1] = 0;
    //optionPlayerX[2] = 2;
    //optionPlayerX[3] = 2;
    //optionPlayerX[4] = 1;
    cloudsX[0] = 0;
    cloudsX[1] = gameWidth;


    
    optionXacc = 0;
    for (i = 0; i <= 3; i++) {
        checked[i] = false;
        deadCount[i] = 100;
    }
    //swords = false;
    //survival = false;

    play = false;
    startCount = 0;
    zombieAlive = 1;
    for (i = 0; i <= 24; i++) {
        for (k = 0; k <= 999; k++) {
            if (k <= 99)
                b[i][k] = false;
            blood[i][k] = false;
        }
        stunCount[i] = 0;
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
        targetx[i] = gameWidth / 2;
        targety[i] = 0; //ADDED DEFAULT TARGET VALUES!!1 WILL CAUSE PROBLEMS?!!? @@@@@@@@@@@@@@@@@@@@@@@
        gun[i][equip[i]] = 1;
        right[i] = false;
        fuelCount[i] = 0;
        fuel[i] = 0;

        //OIWERNERGEDGHSFH
        //cpu[i] = false;
    }
    //start positionss
    xpos[0] = 670;
    xpos[2] = 230;
    xpos[3] = 450;
    xpos[1] = 10;
    directionFacing[0] = 0;
    directionFacing[3] = 0;
    if(teams){
        xpos[0] = 0;
        ypos[0] = 410;
        xpos[1] = 40;
        ypos[1] = 410;

        directionFacing[0] = 1;
        directionFacing[1] = 1;
        directionFacing[2] = 0;
        directionFacing[3] = 0;

        xpos[2] = 680;
        ypos[2] = 410;
        xpos[3] = 640;
        ypos[3] = 410;
    }
    
    for (i = 0; i <= 24; i++) {
        ypos[i] = 410;
    }
    for (i = 0; i <= 24; i++) {
        //dogs are not alive
        dog[i] = false;
        //starting guns
        gun[i][0] = 1;
        ammo[i][0] = 10;
        clips[i][0] = 3;
        gun[i][1] = 0;
        ammo[i][1] = 0;
        clips[i][1] = 0;
        equip[i] = 0;
        streak[i] = 0;
        //starting health
        health[i] = 20;
    }
    teamkills[0] = 0;
    teamkills[1] = 0;

    //set falling guns
    for (i = 0; i <= 9; i++) {
        if (level != 5) gunx[i] = (Math.random() * 680) + 2;
        if (level == 5) gunx[i] = (Math.random() * 1380) + 2;
        guny[i] = -20 - ((Math.random() * 1500));
    }
    if (reset == true) {
        menu = 0;
        for (i = 0; i <= 14; i++) {
            block[i] = false;
        }
        boxx = 420;
        boxy = 140;
        zombie = false;
        custom = false;
        for(i = 0; i<4;i++){            
            lives[i] = tempLives;
        }
        players = 0;
        checkCount = 0;
        level = 0;
        split = false;
    } else if (rematch == true) {
        menu = 3;
        if (teams == true && split == false) {
            xpos[0] = 0;
            ypos[0] = 410;
            xpos[1] = 40;
            ypos[1] = 410;

            directionFacing[0] = 1;
            directionFacing[1] = 1;
            directionFacing[2] = 0;
            directionFacing[3] = 0;

            xpos[2] = 680;
            ypos[2] = 410;
            xpos[3] = 640;
            ypos[3] = 410;
        }
        if (split == true) {
            split = true;
            teams = true;

            for (i = 0; i <= 24; i++) {
                hold[i] = false;
                stunCount[i] = 0;
            }
            score[0] = 0;
            score[1] = 0;

            flagx[0] = 10;
            flagy[0] = 33;

            flagx[1] = 1370;
            flagy[1] = 330;


            leader[0] = true;
            leader[1] = false;
            leader[2] = true;
            leader[3] = false;

            xpos[0] = 1;
            ypos[0] = 410;
            xpos[1] = 40;
            ypos[1] = 410;

            directionFacing[0] = 1;
            directionFacing[1] = 1;
            directionFacing[2] = 0;
            directionFacing[3] = 0;


            xpos[2] = 1380;
            ypos[2] = 410;
            xpos[3] = 1340;
            ypos[3] = 410;

            level = 5;
            wx[0] = 0;
            wy[0] = 0;
            wx[1] = -350;
            wy[1] = 0;

            wx[2] = 1050;
            wy[2] = 225;
            wx[3] = 700;
            wy[3] = 225;

            for (k = 0; k <= 9; k++) {
                gunx[k] = (Math.random() * 1380) + 2;
                guny[k] = -20 - ((Math.random() * 1500));
            }
        }
        if (zombie == true) {
            for (k = 1; k <= 24; k++) {
                health[k] = 10;
            }
        }
        for (i = 0; i < 4; i++) {
            if (swords == true) {
                ammo[i][0] = 4;
                ammo[i][1] = 6;
            }
            lives[i] = tempLives;

        }
    }
}
//end reset game

function startGameLoop() {
    setInterval(gameLoop, 0); //it was fps - function () { gameLoop(contex); }
}

function loadImages() {
    //Images
    //backgrounds
    background[0] = new Image();
    background[0].src = (("images/background0.png"));

    background[1] = new Image();
    background[1].src = (("images/background1.png"));

    background[2] = new Image();
    background[2].src = (("images/Background2.png"));

    background[3] = new Image();
    background[3].src = (("images/Background3.png"));

    background[5] = new Image();
    background[5].src = (("images/Background4.png"));
    //platforms	
    platformMid[0] = new Image();
    platformMid[0].src = (("images/platformMid0.png"));
    platformRight[0] = new Image();
    platformRight[0].src = (("images/platformRight0.png"));
    platformLeft[0] = new Image();
    platformLeft[0].src = (("images/platformLeft0.png"));

    platformMid[1] = new Image();
    platformMid[1].src = (("images/platformMid1.png"));
    platformRight[1] = new Image();
    platformRight[1].src = (("images/platformRight1.png"));
    platformLeft[1] = new Image();
    platformLeft[1].src = (("images/platformLeft1.png"));

    platformMid[2] = new Image();
    platformMid[2].src = (("images/platformMid2.png"));
    platformRight[2] = new Image();
    platformRight[2].src = (("images/platformRight2.png"));
    platformLeft[2] = new Image();
    platformLeft[2].src = (("images/platformLeft2.png"));

    platformMid[3] = new Image();
    platformMid[3].src = (("images/platformMid3.png"));
    platformRight[3] = new Image();
    platformRight[3].src = (("images/platformRight3.png"));
    platformLeft[3] = new Image();
    platformLeft[3].src = (("images/platformLeft3.png"));

    platformMid[5] = new Image();
    platformMid[5].src = (("images/platformMid4.png"));
    platformRight[5] = new Image();
    platformRight[5].src = (("images/platformRight4.png"));
    platformLeft[5] = new Image();
    platformLeft[5].src = (("images/platformLeft4.png"));

    controls[0] = new Image();
    controls[0].src = (("images/p1controls.png"));

    //gun equipped
    gunRight[0] = new Image();
    gunRight[0].src = (("images/PistolRight.png"));
    gunRight[1] = new Image();
    gunRight[1].src = (("images/AssaultRight.png"));
    gunRight[2] = new Image();
    gunRight[2].src = (("images/UziRight.png"));
    gunRight[3] = new Image();
    gunRight[3].src = (("images/SniperRight.png"));
    gunRight[4] = new Image();
    gunRight[4].src = (("images/FlameRight3.png"));
    gunRight[5] = new Image();
    gunRight[5].src = (("images/ShotgunRight.png"));
    gunRight[6] = new Image();
    gunRight[6].src = (("images/SwordRight.png"));
    gunRight[7] = new Image();
    gunRight[7].src = (("images/RedSwordRight.png"));

    gunLeft[0] = new Image();
    gunLeft[0].src = (("images/PistolLeft.png"));
    gunLeft[1] = new Image();
    gunLeft[1].src = (("images/AssaultLeft.png"));
    gunLeft[2] = new Image();
    gunLeft[2].src = (("images/UziLeft.png"));
    gunLeft[3] = new Image();
    gunLeft[3].src = (("images/SniperLeft.png"));
    gunLeft[4] = new Image();
    gunLeft[4].src = (("images/FlameLeft3.png"));
    gunLeft[5] = new Image();
    gunLeft[5].src = (("images/ShotgunLeft.png"));
    gunLeft[6] = new Image();
    gunLeft[6].src = (("images/SwordLeft.png"));
    gunLeft[7] = new Image();
    gunLeft[7].src = (("images/RedSwordLeft.png"));

    //gun not equipped
    //up guns
    gunUp[1][0] = new Image();
    gunUp[1][0].src = (("images/AssaultUp.png"));
    gunUp[1][1] = new Image();
    gunUp[1][1].src = (("images/AssaultUpLeft.png"));

    gunUp[3][0] = new Image();
    gunUp[3][0].src = (("images/SniperUp.png"));
    gunUp[3][1] = new Image();
    gunUp[3][1].src = (("images/SniperUpLeft.png"));

    gunUp[4][1] = new Image();
    gunUp[4][1].src = (("images/FlameUpLeft3.png"));
    gunUp[4][0] = new Image();
    gunUp[4][0].src = (("images/FlameUpRight3.png"));

    gunUp[5][0] = new Image();
    gunUp[5][0].src = (("images/ShotgunUp.png"));
    gunUp[5][1] = new Image();
    gunUp[5][1].src = (("images/ShotgunUpLeft.png"));

    //down guns
    gunDown[0][0] = new Image();
    gunDown[0][0].src = (("images/PistolDown.png"));
    gunDown[0][1] = new Image();
    gunDown[0][1].src = (("images/PistolDownLeft.png"));

    gunDown[2][0] = new Image();
    gunDown[2][0].src = (("images/UziDown.png"));
    gunDown[2][1] = new Image();
    gunDown[2][1].src = (("images/UziDownLeft.png"));

    gunDown[6][0] = new Image();
    gunDown[6][0].src = (("images/SwordDown.png"));
    gunDown[6][1] = new Image();
    gunDown[6][1].src = (("images/SwordDownLeft.png"));

    gunDown[7][0] = new Image();
    gunDown[7][0].src = (("images/RedSwordDownRight.png"));
    gunDown[7][1] = new Image();
    gunDown[7][1].src = (("images/RedSwordDownLeft.png"));

    //sword slash blue
    swordSlash[1] = new Image();
    swordSlash[1].src = (("images/SwordSlashRight.png"));
    swordSlash[0] = new Image();
    swordSlash[0].src = (("images/SwordSlashLeft.png"));
    //sword still blue
    swordStill[1] = new Image();
    swordStill[1].src = (("images/SwordRightStill.png"));
    swordStill[0] = new Image();
    swordStill[0].src = (("images/SwordLeftStill.png"));

    //sword slash red
    redSwordSlash[1] = new Image();
    redSwordSlash[1].src = (("images/RedSwordSlashRight.png"));
    redSwordSlash[0] = new Image();
    redSwordSlash[0].src = (("images/RedSwordSlashLeft.png"));
    //sword still red
    redSwordStill[1] = new Image();
    redSwordStill[1].src = (("images/RedSwordRightStill.png"));
    redSwordStill[0] = new Image();
    redSwordStill[0].src = (("images/RedSwordLeftStill.png"));


    //online screens
    searchingScreen = new Image();
    searchingScreen.src = (("images/Searching.png"));
    hostingScreen = new Image();
    hostingScreen.src = (("images/Hosting.png"));
    connectingScreen = new Image();
    connectingScreen.src = (("images/Connecting.png"));


    //explosion
    ex2 = new Image();
    ex2.src = (("images/ex2.png"));
    
    //selectPlayer images
    selectPlayerImage[0] = new Image();
    selectPlayerImage[0].src = (("images/Player0Icon1.png"));
    selectPlayerImage[1] = new Image();
    selectPlayerImage[1].src = (("images/Player1Icon1.png"));
    selectPlayerImage[2] = new Image();
    selectPlayerImage[2].src = (("images/Player2Icon1.png"));
    selectPlayerImage[3] = new Image();
    selectPlayerImage[3].src = (("images/Player3Icon1.png"));
    onlinePlayerControlsImage = new Image();
    onlinePlayerControlsImage.src = (("images/OnlinePlayerControls.png"));

    joinImage[0] = new Image();
    joinImage[0].src = (("images/join0.png"));
    joinImage[1] = new Image();
    joinImage[1].src = (("images/join1.png"));
    joinImage[2] = new Image();
    joinImage[2].src = (("images/join2.png"));
    joinImage[3] = new Image();
    joinImage[3].src = (("images/join3.png"));

    //player icons
    playerIcon[0] = new Image();
    playerIcon[0].src = (("images/player0Icon.png"));
    playerIcon[1] = new Image();
    playerIcon[1].src = (("images/player1Icon.png"));
    playerIcon[2] = new Image();
    playerIcon[2].src = (("images/player2Icon.png"));
    playerIcon[3] = new Image();
    playerIcon[3].src = (("images/player3Icon.png"));
    //stand right
    playerR[0] = new Image();
    playerR[0].src = (("images/Player0Right.png"));
    playerR[1] = new Image();
    playerR[1].src = (("images/Player1Right.png"));
    playerR[2] = new Image();
    playerR[2].src = (("images/Player2Right.png"));
    playerR[3] = new Image();
    playerR[3].src = (("images/Player3Right.png"));
    //stand left
    playerL[0] = new Image();
    playerL[0].src = (("images/Player0Left.png"));
    playerL[1] = new Image();
    playerL[1].src = (("images/Player1Left.png"));
    playerL[2] = new Image();
    playerL[2].src = (("images/Player2Left.png"));
    playerL[3] = new Image();
    playerL[3].src = (("images/Player3Left.png"));
    
    ////////////////////////////////jump
    //p0
    playerJump[0][0] = new Image();
    playerJump[0][0].src = (("images/Player0LeftJump.PNG"));   
    playerJump[0][1] = new Image();
    playerJump[0][1].src = (("images/Player0RightJump.PNG"));
    //p1
    playerJump[1][0] = new Image();
    playerJump[1][0].src = (("images/Player1LeftJump.PNG"));   
    playerJump[1][1] = new Image();
    playerJump[1][1].src = (("images/Player1RightJump.PNG"));
    //p2
    playerJump[2][0] = new Image();
    playerJump[2][0].src = (("images/Player2LeftJump.PNG"));
    playerJump[2][1] = new Image();
    playerJump[2][1].src = (("images/Player2RightJump.PNG"));
    //p3
    playerJump[3][0] = new Image();
    playerJump[3][0].src = (("images/Player3LeftJump.PNG"));
    playerJump[3][1] = new Image();
    playerJump[3][1].src = (("images/Player3RightJump.PNG"));
    ////////////////////////////////fall
    //p0
    playerFall[0][0] = new Image();
    playerFall[0][0].src = (("images/Player0LeftFall.PNG"));
    playerFall[0][1] = new Image();
    playerFall[0][1].src = (("images/Player0RightFall.PNG"));
    //p1
    playerFall[1][0] = new Image();
    playerFall[1][0].src = (("images/Player1LeftFall.PNG"));   
    playerFall[1][1] = new Image();
    playerFall[1][1].src = (("images/Player1RightFall.PNG"));    
    //p2
    playerFall[2][0] = new Image();
    playerFall[2][0].src = (("images/Player2LeftFall.PNG"));
    playerFall[2][1] = new Image();
    playerFall[2][1].src = (("images/Player2RightFall.PNG"));
    //p3
    playerFall[3][0] = new Image();
    playerFall[3][0].src = (("images/Player3LeftFall.PNG"));
    playerFall[3][1] = new Image();
    playerFall[3][1].src = (("images/Player3RightFall.PNG"));
    ////////////////////////////////move right
    //p0    
    playerRm[0][0] = new Image();
    playerRm[0][0].src = (("images/Player0RightRun1.png"));
    playerRm[0][1] = new Image();
    playerRm[0][1].src = (("images/Player0RightRun2.png"));
    playerRm[0][2] = new Image();
    playerRm[0][2].src = (("images/Player0RightRun3.png"));
    playerRm[0][3] = new Image();
    playerRm[0][3].src = (("images/Player0RightRun4.png"));
    
    //p1
    playerRm[1][0] = new Image();
    playerRm[1][0].src = (("images/Player1RightRun1.png"));
    playerRm[1][1] = new Image();
    playerRm[1][1].src = (("images/Player1RightRun2.png"));
    playerRm[1][2] = new Image();
    playerRm[1][2].src = (("images/Player1RightRun3.png"));
    playerRm[1][3] = new Image();
    playerRm[1][3].src = (("images/Player1RightRun4.png"));
    
    //p2
    playerRm[2][0] = new Image();
    playerRm[2][0].src = (("images/Player2RightRun1.png"));
    playerRm[2][1] = new Image();
    playerRm[2][1].src = (("images/Player2RightRun2.png"));
    playerRm[2][2] = new Image();
    playerRm[2][2].src = (("images/Player2RightRun3.png"));
    playerRm[2][3] = new Image();
    playerRm[2][3].src = (("images/Player2RightRun4.png"));
    
    //p3
    playerRm[3][0] = new Image();
    playerRm[3][0].src = (("images/Player3RightRun1.png"));
    playerRm[3][1] = new Image();
    playerRm[3][1].src = (("images/Player3RightRun2.png"));
    playerRm[3][2] = new Image();
    playerRm[3][2].src = (("images/Player3RightRun3.png"));
    playerRm[3][3] = new Image();
    playerRm[3][3].src = (("images/Player3RightRun4.png"));
    
    /////////////////////////////////move left
    //p0    
    playerLm[0][0] = new Image();
    playerLm[0][0].src = (("images/Player0LeftRun1.png"));
    playerLm[0][1] = new Image();
    playerLm[0][1].src = (("images/Player0LeftRun2.png"));
    playerLm[0][2] = new Image();
    playerLm[0][2].src = (("images/Player0LeftRun3.png"));
    playerLm[0][3] = new Image();
    playerLm[0][3].src = (("images/Player0LeftRun4.png"));
   
    //p1
    playerLm[1][0] = new Image();
    playerLm[1][0].src = (("images/Player1LeftRun1.png"));
    playerLm[1][1] = new Image();
    playerLm[1][1].src = (("images/Player1LeftRun2.png"));
    playerLm[1][2] = new Image();
    playerLm[1][2].src = (("images/Player1LeftRun3.png"));
    playerLm[1][3] = new Image();
    playerLm[1][3].src = (("images/Player1LeftRun4.png"));
    
    //p2
    playerLm[2][0] = new Image();
    playerLm[2][0].src = (("images/Player2LeftRun1.png"));
    playerLm[2][1] = new Image();
    playerLm[2][1].src = (("images/Player2LeftRun2.png"));
    playerLm[2][2] = new Image();
    playerLm[2][2].src = (("images/Player2LeftRun3.png"));
    playerLm[2][3] = new Image();
    playerLm[2][3].src = (("images/Player2LeftRun4.png"));
    
    //p3
    playerLm[3][0] = new Image();
    playerLm[3][0].src = (("images/Player3LeftRun1.png"));
    playerLm[3][1] = new Image();
    playerLm[3][1].src = (("images/Player3LeftRun2.png"));
    playerLm[3][2] = new Image();
    playerLm[3][2].src = (("images/Player3LeftRun3.png"));
    playerLm[3][3] = new Image();
    playerLm[3][3].src = (("images/Player3LeftRun4.png"));

    //zombies
    zombieR = new Image();
    zombieR.src = (("images/zombieR.png"));
    zombieL = new Image();
    zombieL.src = (("images/zombieL.png"));
    zombieRm[0] = new Image();
    zombieRm[0].src = (("images/zombieR1.png"));
    zombieRm[1] = new Image();
    zombieRm[1].src = (("images/zombieR2.png"));
    zombieLm[0] = new Image();
    zombieLm[0].src = (("images/zombieL1.png"));
    zombieLm[1] = new Image();
    zombieLm[1].src = (("images/zombieL2.png"));

    //healthpack
    hp = new Image();
    hp.src = (("images/Firstaid.png"));
    //ammo pack
    am = new Image();
    am.src = (("images/ammo.png"));
    //jetpack
    jet = new Image();
    jet.src = (("images/Jetpack.png"));


    //menu
    menuImage[0] = new Image();
    menuImage[0].src = (("images/Title.png"));
    menuImage[1] = new Image();
    menuImage[1].src = (("images/SelectPlayers1.png"));
    menuImage[2] = new Image();
    menuImage[2].src = (("images/SelectMap.png"));
    menuImage[6] = new Image();
    menuImage[6].src = (("images/SelectMode.png"));
    menuImage[7] = new Image();
    menuImage[7].src = (("images/SelectModeMulti.png"));
    menuImage[8] = new Image();
    menuImage[8].src = (("images/Mode.png"));
    mapSelectImage = new Image();
    mapSelectImage.src = (("images/mapSelectImage2.png"));
    mapSelectBackgroundImage = new Image();
    mapSelectBackgroundImage.src = (("images/mapSelectBackgroundImage2.png"));
    menuBackgroundImage = new Image();
    menuBackgroundImage.src = (("images/menuBackground.png"));
    cloudsImage = new Image();    
    cloudsImage.src = (("images/clouds.png"));
    menuPlayerImage = new Image();
    menuPlayerImage.src = (("images/menuPlayerImage.png"));

    botIcon[0] = new Image();
    botIcon[0].src = (("images/Bot0Icon.png"));
    botIcon[1] = new Image();
    botIcon[1].src = (("images/Bot1Icon.png"));
    botIcon[2] = new Image();
    botIcon[2].src = (("images/Bot2Icon.png"));
    botIcon[3] = new Image();
    botIcon[3].src = (("images/Bot3Icon.png"));

    option[0] = new Image();
    option[0].src = (("images/option0.png"));
    option[1] = new Image();
    option[1].src = (("images/Option1.png"));

    onlineOption[0] = new Image();
    onlineOption[0].src = (("images/onlineOption1.png"));
    onlineOption[1] = new Image();
    onlineOption[1].src = (("images/onlineOption2.png"));
   
    optionArrow = new Image();
    optionArrow.src = (("images/optionArrow1.png"));
    optionArrowLeft = new Image();
    optionArrowLeft.src = (("images/optionArrowLeft1.png"));
    
    toggle[0] = new Image();
    toggle[0].src = (("images/toggle0.png"));
    toggle[1] = new Image();
    toggle[1].src = (("images/toggle1.png"));
    toggle[2] = new Image();
    toggle[2].src = (("images/toggle2.png"));
    toggle[3] = new Image();
    toggle[3].src = (("images/toggle3.png"));
    
    check[0] = new Image();
    check[0].src = (("images/Check.png"));
    check[1] = new Image();
    check[1].src = (("images/CheckFull.png"));
    X = new Image();
    X.src = (("images/X.png"));

    control[0] = new Image();
    control[0].src = (("images/control1.png"));
    control[1] = new Image();
    control[1].src = (("images/control1.png"));
    control[2] = new Image();
    control[2].src = (("images/control1.png"));
    control[3] = new Image();
    control[3].src = (("images/control1.png"));

    numbers[0] = new Image();
    numbers[0].src = (("images/1.png"));
    numbers[1] = new Image();
    numbers[1].src = (("images/2.png"));
    numbers[2] = new Image();
    numbers[2].src = (("images/3.png"));

    endgame = new Image();
    endgame.src = (("images/endgame.png"));
    endgameonline = new Image();
    endgameonline.src = (("images/endgameonline.png"));
    endgameZombie = new Image();
    endgameZombie.src = (("images/endgameZombie.png"));

    //maps
    map[0] = new Image();
    map[0].src = (("images/map1.png"));
    map[1] = new Image();
    map[1].src = (("images/map2.png"));
    map[2] = new Image();
    map[2].src = (("images/back.png"));
    map[3] = new Image();
    map[3].src = (("images/back3.png"));


    //blocks
    blockImage[3] = new Image();
    blockImage[3].src = (("images/Block4.png"));

    //flags
    flag[0] = new Image();
    flag[0].src = (("images/RedFlag.png"));
    flag[1] = new Image();
    flag[1].src = (("images/BlueFlag.png"));

    //dogs
    dogRm[0] = new Image();
    dogRm[0].src = (("images/DogRm0.png"));
    dogRm[1] = new Image();
    dogRm[1].src = (("images/DogRm1.png"));
    dogLm[0] = new Image();
    dogLm[0].src = (("images/DogLm0.png"));
    dogLm[1] = new Image();
    dogLm[1].src = (("images/DogLm1.png"));
    dogR = new Image();
    dogR.src = (("images/DogR.png"));
    dogL = new Image();
    dogL.src = (("images/DogL.png"));
}
//end load images

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

function render() {//ctx
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, gameWidth, gameHeight);

    //background -> CYAn 
    ctx.fillStyle = "rgba(0, 255, 255 , 1)";
    ctx.fillRect(0, 0, gameWidth, gameHeight);


    //ORIGINAL paint
    if ((menu == 3 || play == true || menu == 5)) {
        //if (level == 1) ctx.drawImage(map[0], 0, 0, gameWidth, gameHeight);
        //if (level == 4) ctx.drawImage(map[1], 0, 0, gameWidth, gameHeight);
        //if (onlineState == CONNECTED)
        //    console.log("Level: " + level);
        ctx.drawImage(background[level - 1], 0, 0, gameWidth, gameHeight);
        //ctx.drawImage(background[level - 1], 0, 0, gameWidth, gameHeight);

        //blocks
        for (i = 0; i <= 14; i++) {
            if (block[i] == true) {
                ctx.fillStyle = "rgba(0, 0, 0 , 1)";
                //if (level == 4) ctx.drawImage(blockImage[3], blockx[i] * scale, blocky[i] * scale, blockw[i] * scale, blockh[i] * scale);
                //else ctx.fillRect(blockx[i] * scale, blocky[i] * scale, blockw[i] * scale, blockh[i] * scale);
                ctx.drawImage(platformLeft[level - 1], blockx[i] * scale, (blocky[i]) * scale, 20 * scale, blockh[i] * scale);
                ctx.drawImage(platformRight[level - 1], (blockx[i] + (blockw[i] / 20 - 1) * 20) * scale, (blocky[i]) * scale, 20 * scale, blockh[i] * scale);
                for (k = 1; k < blockw[i] / 20 - 1; k++) {
                    if (blockw[i] % 20 != 0 && k == blockw[i] / 20 - 2)
                        ctx.drawImage(platformMid[level - 1], (blockx[i] + (k * 20)) * scale, (blocky[i]) * scale, blockw[i] % 20 * scale, blockh[i] * scale);
                    else
                        ctx.drawImage(platformMid[level - 1], (blockx[i] + (k * 20)) * scale, (blocky[i]) * scale, 20 * scale, blockh[i] * scale);
                }
            }
        }

        for (i = 0; i < players; i++) {
            for (k = 0; k <= 99; k++) {
                if (b[i][k] == true) {
                    if (shotType[i][k] == 5) {
                        ctx.drawImage(ex2, bx[i][k] * scale, (by[i][k] - 6) * scale, 15 * scale, 15 * scale);
                    } else {
                        ctx.fillStyle = "rgba(0, 0, 0 , 1)";
                        ctx.moveTo(bx[i][k] * scale, by[i][k] * scale);
                        ctx.lineTo((bx[i][k] + 15) * scale, by[i][k] * scale);
                        ctx.stroke();
                        //ctx.fillRect(bx[i][k] * scale, by[i][k] * scale, (15) * scale, 1);
                    }
                }
            }
        }

        //players

        for (i = 0; i < players; i++) {
            if (dog[i] == true) {
                if (dogleft[i] == true && dogydir[i] == 0) {
                    if (runCount[i] <= 10) {
                        ctx.drawImage(dogLm[0], dogxpos[i] * scale, dogypos[i] * scale, 20 * scale, 20 * scale);
                    }
                    if (runCount[i] > 10) {
                        ctx.drawImage(dogLm[1], dogxpos[i] * scale, dogypos[i] * scale, 20 * scale, 20 * scale);
                    }
                } else if (dogright[i] == true && dogydir[i] == 0) {
                    if (runCount[i] <= 10) {
                        ctx.drawImage(dogRm[0], dogxpos[i] * scale, dogypos[i] * scale, 20 * scale, 20 * scale);
                    }
                    if (runCount[i] > 10) {
                        ctx.drawImage(dogRm[1], dogxpos[i] * scale, dogypos[i] * scale, 20 * scale, 20 * scale);
                    }
                } else {
                    if (dogdirectionFacing[i] == 0) ctx.drawImage(dogL, dogxpos[i] * scale, dogypos[i] * scale, 20 * scale, 20 * scale);
                    else if (dogdirectionFacing[i] == 1) ctx.drawImage(dogR, dogxpos[i] * scale, dogypos[i] * scale, 20 * scale, 20 * scale);
                }
            }
            if (custom == true || split == true) {
                
                if (left[i] == true && ydir[i] == 0) {
                    if (runCount[i] <= 4) {
                        ctx.drawImage(playerLm[i][0], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                    }
                    else if (runCount[i] > 4 && runCount[i] <= 8) {
                        ctx.drawImage(playerLm[i][1], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                    }
                    else if (runCount[i] > 8 && runCount[i] <= 14) {
                        ctx.drawImage(playerLm[i][2], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                    }
                    else if (runCount[i] > 14 && runCount[i] <= 18) {
                        ctx.drawImage(playerLm[i][3], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                    }
                   
                } else if (right[i] == true && ydir[i] == 0) {
                    if (runCount[i] <= 4) {
                        ctx.drawImage(playerRm[i][0], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                    }
                    else if (runCount[i] > 4 && runCount[i] <= 8) {
                        ctx.drawImage(playerRm[i][1], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                    }
                    else if (runCount[i] > 8 && runCount[i] <= 14) {
                        ctx.drawImage(playerRm[i][2], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                    }
                    else if (runCount[i] > 14 && runCount[i] <= 18) {
                        ctx.drawImage(playerRm[i][3], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                    }
                }
                else if(ydir[i] < 0){
                    ctx.drawImage(playerJump[i][directionFacing[i]], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                } else if(ydir[i] > 0){
                    ctx.drawImage(playerFall[i][directionFacing[i]], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                 } else {
                    if (directionFacing[i] == 0) ctx.drawImage(playerL[i], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                    else if (directionFacing[i] == 1) ctx.drawImage(playerR[i], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                }
                
            } else if (zombie == true) {
                if (i == 0) {
                    if (left[i] == true && ydir[i] == 0) {
                        if (runCount[i] <= 10) {
                            ctx.drawImage(playerLm[1][0], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                        }
                        if (runCount[i] > 10) {
                            ctx.drawImage(playerLm[1][1], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                        }
                    } else if (right[i] == true && ydir[i] == 0) {
                        if (runCount[i] <= 10) {
                            ctx.drawImage(playerRm[1][0], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                        }
                        if (runCount[i] > 10) {
                            ctx.drawImage(playerRm[1][1], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                        }
                    } else {
                        if (directionFacing[i] == 0) ctx.drawImage(playerL[1], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                        else if (directionFacing[i] == 1) ctx.drawImage(playerR[1], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                    }
                } else {
                    if (left[i] == true && ydir[i] == 0) {
                        if (runCount[i] <= 10) {
                            ctx.drawImage(zombieLm[0], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                        }
                        if (runCount[i] > 10) {
                            ctx.drawImage(zombieLm[1], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                        }
                    } else if (right[i] == true && ydir[i] == 0) {
                        if (runCount[i] <= 10) {
                            ctx.drawImage(zombieRm[0], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                        }
                        if (runCount[i] > 10) {
                            ctx.drawImage(zombieRm[1], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                        }
                    } else {
                        if (directionFacing[i] == 0) ctx.drawImage(zombieL, xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                        else if (directionFacing[i] == 1) ctx.drawImage(zombieR, xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                    }
                }
            }




            //health
            ctx.fillStyle = "rgba(250, 0, 0 , 1)";
            ctx.fillRect(xpos[i] * scale, (ypos[i] - 15) * scale, 20 * scale, 5 * scale);
            ctx.fillStyle = "rgba(0, 250, 0 , 1)";
            if (zombie == true && i != 0) ctx.fillRect(xpos[i] * scale, (ypos[i] - 15) * scale, (health[i] * 2) * scale, 5 * scale);
            else ctx.fillRect(xpos[i] * scale, (ypos[i] - 15) * scale, (health[i]) * scale, 5 * scale);
            ctx.fillStyle = "rgba(0, 0, 0 , 1)";
            //ctx.drawRect(xpos[i] * scale, (ypos[i] - 15) * scale, 20 * scale, 5 * scale);//drawRect
            ctx.beginPath();
            ctx.rect(xpos[i] * scale, (ypos[i] - 15) * scale, 20 * scale, 5 * scale);
            ctx.stroke();
            //ammo
            if (ammo[i][equip[i]] > 0 && reload[i] == false && (custom == true || split == true || (zombie == true && i == 0))) {
                for (k = 1; k <= ammo[i][equip[i]]; k++) {
                    ctx.fillRect((xpos[i] + k * 2 - 1) * scale, (ypos[i] - 5) * scale, 1, 5 * scale);
                }
            } else if (ammo[i][equip[i]] == 0 && gun[i][equip[i]] > 0 && reload[i] == false) {
                if (pleaseReload >= 25) {
                    ctx.font = ("9px Arial");
                    ctx.fillText("No ammo", (xpos[i] - 1) * scale, (ypos[i] - 2) * scale);

                }
            }
                //reload
            else if (reload[i] == true) {
                ctx.fillStyle = "rgb(0, 0, 250)";
                if (gun[i][equip[i]] == 1 || gun[i][equip[i]] == 7 || gun[i][equip[i]] == 8) ctx.fillRect(xpos[i] * scale, (ypos[i] - 10) * scale, reloadCount[i] * scale, 5 * scale);

                else if (gun[i][equip[i]] == 2 || gun[i][equip[i]] == 3 || gun[i][equip[i]] == 6) ctx.fillRect(xpos[i] * scale, (ypos[i] - 10) * scale, (reloadCount[i] / 2) * scale, 5 * scale);

                else if (gun[i][equip[i]] == 4 || gun[i][equip[i]] == 5) ctx.fillRect(xpos[i] * scale, (ypos[i] - 10) * scale, (reloadCount[i] / 4) * scale, 5 * scale);

                ctx.fillStyle = "rgb(0, 0, 0)";
                //ctx.drawRect(xpos[i], ypos[i] - 10, 20 * scale, 5 * scale);//drawRect
                ctx.beginPath();
                ctx.rect(xpos[i] * scale, (ypos[i] - 10) * scale, 20 * scale, 5 * scale);
                ctx.stroke();
            }
            //mags
            if (clips[i][equip[i]] > 0 && (custom == true || split == true || (zombie == true && i == 0)) && swords == false) {
                ctx.font = ("10px Arial");
                if (clips[i][equip[i]] < 10) ctx.fillText("X" + clips[i][equip[i]], (xpos[i] - 12) * scale, (ypos[i] - 3) * scale);
                else ctx.fillText("X" + clips[i][equip[i]], (xpos[i] - 16) * scale, (ypos[i] - 3) * scale);
            }
            //jetpack
            if (jetpack[i] == true) {
                ctx.drawImage(jet, xpos[i] * scale, (ypos[i] + 20) * scale, 20 * scale, 20 * scale);

            }
            if (streak[i] >= 3 && streak[i] < 6) {
                ctx.fillStyle = "rgb(250, 0, 0)";
                ctx.fillRect(xpos[i] * scale, (ypos[i] - 20) * scale, 20 * scale, 5 * scale);
                ctx.fillStyle = "rgb(250, 250, 0)";
                ctx.fillRect(xpos[i] * scale, (ypos[i] - 20) * scale, fuel[i] * scale, 5 * scale);
                ctx.fillStyle = "rgb(0, 0, 0)";
                // ctx.drawRect(xpos[i] * scale, (ypos[i] - 20) * scale, 20 * scale, 5 * scale);//drawRect
                ctx.beginPath();
                ctx.rect(xpos[i] * scale, (ypos[i] - 20) * scale, 20 * scale, 5 * scale);
                ctx.stroke();
            }
            if (streak[i] >= 6) {
                ctx.fillStyle = "rgb(250, 0, 0)";
                ctx.fillRect(xpos[i] * scale, (ypos[i] - 20) * scale, 20 * scale, 5 * scale);
                ctx.fillStyle = "rgb(250, 250, 0)";
                ctx.fillRect(xpos[i] * scale, (ypos[i] - 20) * scale, (fuel[i] / 2) * scale, 5 * scale);
                ctx.fillStyle = "rgb(0, 0, 0)";
                // ctx.drawRect(xpos[i] * scale, (ypos[i] - 20) * scale, 20 * scale, 5 * scale);//drawRect
                ctx.beginPath();
                ctx.rect(xpos[i] * scale, (ypos[i] - 20) * scale, 20 * scale, 5 * scale);
                ctx.stroke();
            }

            //draw killstreak string
            if (streak[i] >= 2) {
                ctx.fillStyle = "rgb(0, 0, 0)";
                ctx.font = ("9px Arial");
                if (killcount[i] <= 50) {
                    if (custom == true) {
                        if (streak[i] < 3) ctx.fillText(streak[i] + " killstreak", (xpos[i] - 10) * scale, (ypos[i] - 18) * scale);
                        else ctx.fillText(streak[i] + " killstreak", (xpos[i] - 10) * scale, (ypos[i] - 24) * scale);
                    } else if (zombie == true) {
                        if (kills[0] == 1) {
                            if (streak[i] < 3) ctx.fillText(kills[0] + " kill", (xpos[i] - 5) * scale, (ypos[i] - 18) * scale);
                            else ctx.fillText(kills[0] + " kill", (xpos[i] - 5) * scale, (ypos[i] - 24) * scale);
                        }
                        if (kills[0] > 1) {
                            if (streak[i] < 3) ctx.fillText(kills[0] + " kills", (xpos[i] - 5) * scale, (ypos[i] - 18) * scale);
                            else ctx.fillText(kills[0] + " kills", (xpos[i] - 5) * scale, (ypos[i] - 24) * scale);
                        }
                    }
                }
                if (killcount[i] > 50 && killcount[i] < 120 && streak[i] == 2) {
                    ctx.fillText("First aid", (xpos[i] - 10) * scale, (ypos[i] - 18) * scale);
                }
                if (killcount[i] > 50 && killcount[i] < 120 && streak[i] == 3) {
                    ctx.fillText("Jetpack", (xpos[i] - 6) * scale, (ypos[i] - 2) * scale);
                }
                if (killcount[i] > 50 && killcount[i] < 120 && streak[i] == 4) {
                    ctx.fillText("First aid", (xpos[i] - 10) * scale, (ypos[i] - 24) * scale);
                }
                if (killcount[i] > 50 && killcount[i] < 120 && streak[i] == 5) {
                    ctx.fillText("Puppums", (xpos[i] - 10) * scale, (ypos[i] - 24) * scale);
                }
                if (killcount[i] > 50 && killcount[i] < 120 && streak[i] == 6) {
                    ctx.fillText("Double fuel", (xpos[i] - 14) * scale, (ypos[i] - 24) * scale);
                }
                if (killcount[i] > 50 && killcount[i] < 120 && streak[i] == 7) {
                    ctx.fillText("First aid", (xpos[i] - 10) * scale, (ypos[i] - 24) * scale);
                }
                if (killcount[i] > 50 && killcount[i] < 120 && streak[i] == 10 && zombie == false) {
                    ctx.fillText("Infinite ammo", (xpos[i] - 16) * scale, (ypos[i] - 24) * scale);
                }
            }


        }
        //guns
        for (i = 0; i < players; i++) {
            if (zombie == false || (zombie == true && i == 0)) {
                if (equip[i] == 0) {
                    //not equipped gun
                    if (gun[i][1] == 1) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunDown[gun[i][1] - 1][0], (xpos[i] + 6) * scale, (ypos[i] + 10) * scale, 4 * scale, 7 * scale);
                        else ctx.drawImage(gunDown[gun[i][1] - 1][1], (xpos[i] + 11) * scale, (ypos[i] + 10) * scale, 4 * scale, 7 * scale);
                    }
                    if (gun[i][1] == 2) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunUp[gun[i][1] - 1][1], (xpos[i] + 4) * scale, (ypos[i] - 5) * scale, 3 * scale, 17 * scale);
                        else ctx.drawImage(gunUp[gun[i][1] - 1][0], (xpos[i] + 13) * scale, (ypos[i] - 5) * scale, 3 * scale, 17 * scale);
                    }
                    if (gun[i][1] == 3) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunDown[gun[i][1] - 1][1], (xpos[i] + 4) * scale, (ypos[i] + 8) * scale, 5 * scale, 11 * scale);
                        else ctx.drawImage(gunDown[gun[i][1] - 1][0], (xpos[i] + 12) * scale, (ypos[i] + 8) * scale, 5 * scale, 11 * scale);
                    }
                    if (gun[i][1] == 4) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunUp[gun[i][1] - 1][1], (xpos[i] + 1) * scale, (ypos[i] - 12) * scale, 7 * scale, 28 * scale);
                        else ctx.drawImage(gunUp[gun[i][1] - 1][0], (xpos[i] + 12) * scale, (ypos[i] - 12) * scale, 7 * scale, 28 * scale);
                    }
                    if (gun[i][1] == 5) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunUp[gun[i][1] - 1][1], (xpos[i] + 1) * scale, (ypos[i] - 12) * scale, 7 * scale, 28 * scale);
                        else ctx.drawImage(gunUp[gun[i][1] - 1][0], (xpos[i] + 12) * scale, (ypos[i] - 12) * scale, 7 * scale, 28 * scale);
                    }
                    if (gun[i][1] == 6) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunUp[gun[i][1] - 1][1], (xpos[i] + 4) * scale, (ypos[i] - 5) * scale, 3 * scale, 17 * scale);
                        else ctx.drawImage(gunUp[gun[i][1] - 1][0], (xpos[i] + 13) * scale, (ypos[i] - 5) * scale, 3 * scale, 17 * scale);
                    }
                    if (gun[i][1] == 7 && (onlineState != CONNECTED)) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunDown[gun[i][1] - 1][0], (xpos[i] - 2) * scale, (ypos[i] + 2) * scale, 20 * scale, 20 * scale);
                        else ctx.drawImage(gunDown[gun[i][1] - 1][1], (xpos[i] + 2) * scale, (ypos[i] + 2) * scale, 20 * scale, 20 * scale);
                    }
                    if (gun[i][1] == 8 && (onlineState != CONNECTED)) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunDown[gun[i][1] - 1][0], xpos[i] * scale, (ypos[i] + 2) * scale, 20 * scale, 20 * scale);
                        else ctx.drawImage(gunDown[gun[i][1] - 1][1], xpos[i] * scale, (ypos[i] + 2) * scale, 20 * scale, 20 * scale);
                    }
                } else if (equip[i] == 1) {
                    //not equipped gun
                    if (gun[i][0] == 1) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunDown[gun[i][0] - 1][0], (xpos[i] + 6) * scale, (ypos[i] + 10) * scale, 4 * scale, 7 * scale);
                        else ctx.drawImage(gunDown[gun[i][0] - 1][1], (xpos[i] + 11) * scale, (ypos[i] + 10) * scale, 4 * scale, 7 * scale);
                    }
                    if (gun[i][0] == 2) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunUp[gun[i][0] - 1][1], (xpos[i] + 4) * scale, (ypos[i] - 5) * scale, 3 * scale, 17 * scale);
                        else ctx.drawImage(gunUp[gun[i][0] - 1][0], (xpos[i] + 13) * scale, (ypos[i] - 5) * scale, 3 * scale, 17 * scale);
                    }
                    if (gun[i][0] == 3) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunDown[gun[i][0] - 1][1], (xpos[i] + 4) * scale, (ypos[i] + 8) * scale, 5 * scale, 11 * scale);
                        else ctx.drawImage(gunDown[gun[i][0] - 1][0], (xpos[i] + 12) * scale, (ypos[i] + 8) * scale, 5 * scale, 11 * scale);
                    }
                    if (gun[i][0] == 4) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunUp[gun[i][0] - 1][1], (xpos[i] + 1) * scale, (ypos[i] - 12) * scale, 7 * scale, 28 * scale);
                        else ctx.drawImage(gunUp[gun[i][0] - 1][0], (xpos[i] + 12) * scale, (ypos[i] - 12) * scale, 7 * scale, 28 * scale);
                    }
                    if (gun[i][0] == 5) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunUp[gun[i][0] - 1][1], (xpos[i] + 1) * scale, (ypos[i] - 12) * scale, 7 * scale, 28 * scale);
                        else ctx.drawImage(gunUp[gun[i][0] - 1][0], (xpos[i] + 12) * scale, (ypos[i] - 12) * scale, 7 * scale, 28 * scale);
                    }
                    if (gun[i][0] == 6) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunUp[gun[i][0] - 1][1], (xpos[i] + 4) * scale, (ypos[i] - 5) * scale, 3 * scale, 17 * scale);
                        else ctx.drawImage(gunUp[gun[i][0] - 1][0], (xpos[i] + 13) * scale, (ypos[i] - 5) * scale, 3 * scale, 17 * scale);
                    }
                    if (gun[i][0] == 7 && (onlineState != CONNECTED)) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunDown[gun[i][0] - 1][0], (xpos[i] - 2) * scale, (ypos[i] + 2) * scale, 20 * scale, 20 * scale);
                        else ctx.drawImage(gunDown[gun[i][0] - 1][1], (xpos[i] + 2) * scale, (ypos[i] + 2) * scale, 20 * scale, 20 * scale);
                    }
                    if (gun[i][0] == 8 && (onlineState != CONNECTED)) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunDown[gun[i][0] - 1][0], (xpos[i]) * scale, (ypos[i] + 2) * scale, 20 * scale, 20 * scale);
                        else ctx.drawImage(gunDown[gun[i][0] - 1][1], (xpos[i]) * scale, (ypos[i] + 2) * scale, 20 * scale, 20 * scale);
                    }
                }

                //equipped gun
                if (gun[i][equip[i]] == 1) {
                    if (directionFacing[i] == 1) ctx.drawImage(gunRight[gun[i][equip[i]] - 1], (xpos[i] + 15) * scale, (ypos[i] + 4) * scale, 7 * scale, 4 * scale);
                    else ctx.drawImage(gunLeft[gun[i][equip[i]] - 1], (xpos[i] - 1) * scale, (ypos[i] + 4) * scale, 7 * scale, 4 * scale);
                }
                if (gun[i][equip[i]] == 2) {
                    if (directionFacing[i] == 1) ctx.drawImage(gunRight[gun[i][equip[i]] - 1], (xpos[i] + 4) * scale, (ypos[i] + 4) * scale, 17 * scale, 3 * scale);
                    else ctx.drawImage(gunLeft[gun[i][equip[i]] - 1], (xpos[i] - 1) * scale, (ypos[i] + 4) * scale, 17 * scale, 3 * scale);
                }
                if (gun[i][equip[i]] == 3) {
                    if (directionFacing[i] == 1) ctx.drawImage(gunRight[gun[i][equip[i]] - 1], (xpos[i] + 11) * scale, (ypos[i] + 4) * scale, 11 * scale, 5 * scale);
                    else ctx.drawImage(gunLeft[gun[i][equip[i]] - 1], (xpos[i] - 1) * scale, (ypos[i] + 4) * scale, 11 * scale, 5 * scale);
                }
                if (gun[i][equip[i]] == 4) {
                    if (directionFacing[i] == 1) ctx.drawImage(gunRight[gun[i][equip[i]] - 1], (xpos[i] + 4) * scale, (ypos[i] + 1) * scale, 28 * scale, 7 * scale);
                    else ctx.drawImage(gunLeft[gun[i][equip[i]] - 1], (xpos[i] - 11) * scale, (ypos[i] + 1) * scale, 28 * scale, 7 * scale);
                }
                if (gun[i][equip[i]] == 5) {
                    if (directionFacing[i] == 1) ctx.drawImage(gunRight[gun[i][equip[i]] - 1], (xpos[i] + 4) * scale, (ypos[i] + 1) * scale, 28 * scale, 7 * scale);
                    else ctx.drawImage(gunLeft[gun[i][equip[i]] - 1], (xpos[i] - 11) * scale, (ypos[i] + 1) * scale, 28 * scale, 7 * scale);
                }
                if (gun[i][equip[i]] == 6) {
                    if (directionFacing[i] == 1) ctx.drawImage(gunRight[gun[i][equip[i]] - 1], (xpos[i] + 4) * scale, (ypos[i] + 4) * scale, 17 * scale, 3 * scale);
                    else ctx.drawImage(gunLeft[gun[i][equip[i]] - 1], (xpos[i] - 1) * scale, (ypos[i] + 4) * scale, 17 * scale, 3 * scale);
                }
                if (gun[i][equip[i]] == 7 && (onlineState != CONNECTED)) {
                    if ([i] != 0 && lunge[i] == false) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunRight[gun[i][equip[i]] - 1], (xpos[i] - 6) * scale, (ypos[i] + 2) * scale, 20 * scale, 20 * scale);
                        else ctx.drawImage(gunLeft[gun[i][equip[i]] - 1], (xpos[i] + 6) * scale, (ypos[i] + 2) * scale, 20 * scale, 20 * scale);
                    } else if (xdir[i] == 0 && directionFacing[i] == 1 && lunge[i] == false) ctx.drawImage(swordStill[1], (xpos[i] + 7) * scale, (ypos[i] - 6) * scale, 20 * scale, 20 * scale);
                    else if (xdir[i] == 0 && directionFacing[i] == 0 && lunge[i] == false) ctx.drawImage(swordStill[0], (xpos[i] - 7) * scale, (ypos[i] - 6) * scale, 20 * scale, 20 * scale);
                    else if (lunge[i] == true && directionFacing[i] == 1) ctx.drawImage(swordSlash[1], (xpos[i] + 10) * scale, (ypos[i] - 2) * scale, 20 * scale, 20 * scale);
                    else if (lunge[i] == true && directionFacing[i] == 0) ctx.drawImage(swordSlash[0], (xpos[i] - 10) * scale, (ypos[i] - 2) * scale, 20 * scale, 20 * scale);
                }
                if (gun[i][equip[i]] == 8 && (onlineState != CONNECTED)) {
                    if (xdir[i] != 0 && lunge[i] == false) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunRight[gun[i][equip[i]] - 1], (xpos[i]) * scale, (ypos[i] - 2) * scale, 20 * scale, 20 * scale);
                        else ctx.drawImage(gunLeft[gun[i][equip[i]] - 1], (xpos[i]) * scale, (ypos[i] - 2) * scale, 20 * scale, 20 * scale);
                    } else if (xdir[i] == 0 && directionFacing[i] == 1 && lunge[i] == false) ctx.drawImage(redSwordStill[1], (xpos[i] + 7) * scale, (ypos[i] - 6) * scale, 20 * scale, 20 * scale);
                    else if (xdir[i] == 0 && directionFacing[i] == 0 && lunge[i] == false) ctx.drawImage(redSwordStill[0], (xpos[i] - 7) * scale, (ypos[i] - 6) * scale, 20 * scale, 20 * scale);
                    else if (lunge[i] == true && directionFacing[i] == 1) ctx.drawImage(redSwordSlash[1], (xpos[i] + 7) * scale, (ypos[i] - 2) * scale, 20 * scale, 20 * scale);
                    else if (lunge[i] == true && directionFacing[i] == 0) ctx.drawImage(redSwordSlash[0], (xpos[i] - 7) * scale, (ypos[i] - 2) * scale, 20 * scale, 20 * scale);
                }
            }
        }

        //falling guns
        ctx.drawImage(am, gunx[0] * scale, guny[0] * scale, 20 * scale, 20 * scale);
        ctx.drawImage(gunRight[1], gunx[1] * scale, guny[1] * scale, 17 * scale, 3 * scale);
        ctx.drawImage(gunRight[2], gunx[2] * scale, guny[2] * scale, 11 * scale, 5 * scale);
        ctx.drawImage(gunRight[3], gunx[3] * scale, guny[3] * scale, 28 * scale, 7 * scale);
        ctx.drawImage(gunRight[4], gunx[4] * scale, guny[4] * scale, 28 * scale, 7 * scale);
        ctx.drawImage(gunRight[5], gunx[5] * scale, guny[5] * scale, 17 * scale, 3 * scale);
        ctx.drawImage(gunRight[6], gunx[6] * scale, guny[6] * scale, 20 * scale, 20 * scale);
        if (onlineState != CONNECTED)
            ctx.drawImage(redSwordStill[1], gunx[7] * scale, guny[7] * scale, 20 * scale, 20 * scale);

        //health packs
        for (i = 0; i < players; i++) {
            ctx.drawImage(hp, healthpackx[i] * scale, healthpacky[i] * scale, 20 * scale, 20 * scale);
        }
        //blood
        for (i = 0; i < players; i++) {
            ctx.fillStyle = "rgba(250, 0, 0 , 1)";
            for (k = 0; k <= 999; k++) {
                if (blood[i][k] == true) {
                    ctx.beginPath();
                    //ctx.fillOval(bloodx[i][k] * scale, bloody[i][k] * scale, 3 * scale, 3 * scale);//fillOval
                    ctx.arc(bloodx[i][k] * scale, bloody[i][k] * scale, 2 * scale, 0, 2 * Math.PI, false);
                    ctx.fill();
                }
            }
        }
        if (split == true) {
            ctx.drawImage(flag[0], flagx[0] * scale, flagy[0] * scale, 20 * scale, 20 * scale);
            ctx.drawImage(flag[1], flagx[1] * scale, flagy[1] * scale, 20 * scale, 20 * scale);

            ctx.font = ("14px Arial");
            ctx.fillStyle = "#000000";
            ctx.fillText("Red: " + score[0], 1350 * scale, 20 * scale);
            ctx.fillText("Blue: " + score[1], 1350 * scale, 40 * scale);


        } else {
            //score
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.font = ("14px Arial");
            if (custom == true) {
                if (survival == true) {
                    ctx.fillText("Lives", 622 * scale, 20 * scale);
                    ctx.fillText("Red: " + lives[0], 620 * scale, 40 * scale);
                    ctx.fillText("Blue: " + lives[1], 620 * scale, 60 * scale);
                    if (players > 2) ctx.fillText("Black: " + lives[2], 620 * scale, 80 * scale);
                    if (players == 4) ctx.fillText("Yellow: " + lives[3], 620 * scale, 100 * scale);
                }
                if (survival == false) {
                    if (teams == false) {
                        ctx.fillText("Kills", 622 * scale, 20 * scale);
                        ctx.fillText("Red: " + kills[0], 620 * scale, 40 * scale);
                        ctx.fillText("Blue: " + kills[1], 620 * scale, 60 * scale);
                        if (players > 2) ctx.fillText("Black: " + kills[2], 620 * scale, 80 * scale);
                        if (players == 4) ctx.fillText("Yellow: " + kills[3], 620 * scale, 100 * scale);
                    } else if (teams == true) {
                        ctx.fillText("Kills", 622 * scale, 20 * scale);
                        if (onlineState == 'Connected') {
                            teamkills[0] = kills[0] + kills[1];
                            teamkills[1] = kills[2] + kills[3];
                        }
                        ctx.fillText("Fire and Water: " + teamkills[0], 560 * scale, 40 * scale);
                        ctx.fillText("Lightning Slaves: " + teamkills[1], 560 * scale, 60 * scale);
                    }
                }
            } else if (zombie == true) {
                ctx.font = ("20px Arial");
                ctx.fillText("Level: " + zombieAlive, 610 * scale, 20 * scale);
                ctx.fillText("Kills: " + kills[0], 620 * scale, 50 * scale);
            }
        }

    }
        //END ORIGINAL paint


        //menus
        //main menu
    
    else if (menu == 0) {
        ctx.drawImage(menuBackgroundImage,0,0,gameWidth,gameHeight);        
        ctx.drawImage(cloudsImage,cloudsX[0],0,gameWidth,100* scale);  
        ctx.drawImage(cloudsImage,cloudsX[1],0,gameWidth,100 * scale);  
        ctx.drawImage(menuImage[0], 0, 0, gameWidth, gameHeight);
        ctx.drawImage(menuPlayerImage, 0, 0, gameWidth, gameHeight);
    }
        //player select for custom game
    else if (menu == 1) {
        ctx.drawImage(menuBackgroundImage,0,0,gameWidth,gameHeight);        
        ctx.drawImage(cloudsImage,cloudsX[0],0,gameWidth,100* scale);  
        ctx.drawImage(cloudsImage,cloudsX[1],0,gameWidth,100 * scale);         
        ctx.drawImage(menuImage[1], 0, 0, 700 * scale, 450 * scale);
        
        //if(optionY <= 3) ctx.drawImage(optionArrow, (35 + optionX + optionPlayerX[optionY]*100) * scale, (55 + optionY*85) * scale, 32 * scale, 52 * scale); 
        if(optionPlayerX[4] == 0)        
            ctx.drawImage(optionArrow, (100 + optionX) * scale, (65 + 4*83) * scale, 32 * scale, 52 * scale);     
        else if(optionPlayerX[4] == 1) 
            ctx.drawImage(optionArrow, (255 + optionX) * scale, (65 + 4*83) * scale, 32 * scale, 52 * scale);
        else
            ctx.drawImage(optionArrow, (520 + optionX) * scale, (65 + 4*83) * scale, 32 * scale, 52 * scale);   
        //ctx.drawImage(playerIcon[0], (65 + optionPlayerX[0]*100) * scale, (60 + 0*85) * scale, 40 * scale, 40 * scale); 
        //ctx.drawImage(playerIcon[1], (65 + optionPlayerX[1]*100) * scale, (60 + 1*85) * scale, 40 * scale, 40 * scale); 
        //ctx.drawImage(playerIcon[2], (65 + optionPlayerX[2]*100) * scale, (60 + 2*85) * scale, 40 * scale, 40 * scale); 
        //ctx.drawImage(playerIcon[3], (65 + optionPlayerX[3]*100) * scale, (60 + 3*85) * scale, 40 * scale, 40 * scale);
        
        ctx.drawImage(selectPlayerImage[0], (55) * scale, (40 + 0*75) * scale, 230 * scale, 100 * scale); 
        ctx.drawImage(selectPlayerImage[1], (55) * scale, (40 + 1*75) * scale, 230 * scale, 100 * scale); 
        if(optionPlayerX[2] == 2)        
            ctx.drawImage(joinImage[2], (35) * scale, (50 + 2*75) * scale, 500 * scale, 100 * scale); 
        else if(optionPlayerX[2] == 1) 
            ctx.drawImage(botIcon[2], (55) * scale, (50 + 2*75) * scale, 230 * scale, 100 * scale); 
        else if(optionPlayerX[2] == 0) 
            ctx.drawImage(selectPlayerImage[2], (55) * scale, (50 + 2*75) * scale, 230 * scale, 100 * scale); 
       
        if(optionPlayerX[3] == 2)        
            ctx.drawImage(joinImage[3], (35) * scale, (50 + 3*75) * scale, 500 * scale, 100 * scale); 
        else if(optionPlayerX[3] == 1) 
            ctx.drawImage(botIcon[3], (55) * scale, (50 + 3*75) * scale, 230 * scale, 100 * scale); 
        else if(optionPlayerX[3] == 0) 
            ctx.drawImage(selectPlayerImage[3], (55) * scale, (50 + 3*75) * scale, 230 * scale, 100 * scale); 

        //ctx.drawImage(toggle[0], (2) * scale, (40 + 0*75) * scale, 500 * scale, 100 * scale); 
        //ctx.drawImage(toggle[1], (2) * scale, (40 + 1*75) * scale, 500 * scale, 100 * scale); 
        if(optionPlayerX[2]!=2)
            ctx.drawImage(toggle[2], (5) * scale, (58 + 2*75) * scale, 500 * scale, 100 * scale); 
        if(optionPlayerX[3]!=2)
            ctx.drawImage(toggle[3], (5) * scale, (58 + 3*75) * scale, 500 * scale, 100 * scale); 

        
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.font = ("Bold 24px Arial");   
        ctx.fontStyle = ("Bold");     
        if(teams)
        ctx.fillText("Teams", 510 * scale, 60*scale);
        else
        ctx.fillText("Free for All", 510*scale, 60*scale);        
        if(survival){        
            ctx.fillText("Survival", 510 * scale, 100 * scale); 
            ctx.fillText("Lives: " + tempLives, 510 * scale, 140*scale);
        }
        else if(!survival){
            ctx.fillText("Deathmatch", 510 * scale, 100 * scale); 
            ctx.fillText("Kill Limit: " + killLimit, 510 * scale, 140 * scale); 
        }
        if(swords)
        ctx.fillText("Swords and Daggers", 510 * scale, 180 * scale);
        else if(!swords)
        ctx.fillText("All Weapons", 510 * scale, 180 * scale);
    }
    //select multiplayer settings
    else if (menu == 7) {
        ctx.drawImage(menuBackgroundImage,0,0,gameWidth,gameHeight);        
        ctx.drawImage(cloudsImage,cloudsX[0],0,gameWidth,100* scale);  
        ctx.drawImage(cloudsImage,cloudsX[1],0,gameWidth,100 * scale);              
        ctx.drawImage(menuImage[7], 0, 0, gameWidth, gameHeight);
        
        if(optionY <= 3) ctx.drawImage(optionArrow, (50 + optionX) * scale, (106 + optionY*67) * scale, 32 * scale, 52 * scale); 
        if(optionY == 4) ctx.drawImage(optionArrow, (275 + optionX) * scale, (53 + optionY*83) * scale, 32 * scale, 52 * scale);         
        ctx.drawImage(check[1], (265 + optionSettingsX[0]*215) * scale, (110 + 0*85) * scale, 30 * scale, 30 * scale); 
        ctx.drawImage(check[1], (265 + optionSettingsX[1]*240) * scale, (90 + 1*85) * scale, 30 * scale, 30 * scale); 
        ctx.drawImage(check[1], (375 + optionSettingsX[2]*72) * scale, (75 + 2*85) * scale, 30 * scale, 30 * scale); 
        ctx.drawImage(check[1], (265 + optionSettingsX[3]*300) * scale, (60 + 3*85) * scale, 30 * scale, 30 * scale);
    }
        //select multiplayer mode
    else if (menu == 8) {
        ctx.drawImage(menuBackgroundImage,0,0,gameWidth,gameHeight);
        ctx.drawImage(cloudsImage,cloudsX[0],0,gameWidth,100* scale);  
        ctx.drawImage(cloudsImage,cloudsX[1],0,gameWidth,100 * scale);            
        ctx.drawImage(menuImage[8], 0, 0, gameWidth, gameHeight);
        ctx.drawImage(option[1], 0, 0, gameWidth, gameHeight);
        ctx.drawImage(optionArrow, (211+ optionX) * scale, (151 + optionY*85) * scale, 32 * scale, 52 * scale); 
        ctx.drawImage(menuPlayerImage, 0, 0, gameWidth, gameHeight);
    }
        //select game mode  zombie or custom
    else if (menu == 6) {
        ctx.drawImage(menuBackgroundImage,0,0,gameWidth,gameHeight);
        ctx.drawImage(cloudsImage,cloudsX[0],0,gameWidth,100* scale);  
        ctx.drawImage(cloudsImage,cloudsX[1],0,gameWidth,100 * scale);          
        ctx.drawImage(menuImage[6], 0, 0, gameWidth, gameHeight);
        ctx.drawImage(option[0], 0, 0, gameWidth, gameHeight);
        ctx.drawImage(optionArrow, (211 + optionX) * scale, (151 + optionY*60) * scale, 32 * scale, 52 * scale);
        ctx.drawImage(menuPlayerImage, 0, 0, gameWidth, gameHeight);  

        //ctx.drawImage(controls[0], gameWidth - 256 * scale, gameHeight - 256 * scale, 256 * scale, 256 * scale);
    }
        //choose map
    else if (menu == 2) {
        /*ctx.drawImage(menuImage[2], 0, 0, gameWidth, gameHeight);
        ctx.fillStyle = "rgba(250, 250, 250 , 1)";
        //ctx.drawRect(boxx * scale, boxy * scale, 177 * scale, 106 * scale);//drawRectv
        ctx.beginPath();
        ctx.rect(boxx * scale, boxy * scale, 177 * scale, 106 * scale);
        ctx.stroke();
        //ctx.drawRect((boxx + 1) * scale, (boxy + 1) * scale, 175 * scale, 104 * scale);//drawRect
        ctx.beginPath();
        ctx.rect((boxx + 1) * scale, (boxy + 1) * scale, 175 * scale, 104 * scale);
        ctx.stroke();*/
	    ctx.drawImage(menuBackgroundImage,0,0,gameWidth,gameHeight);
        ctx.drawImage(cloudsImage,cloudsX[0],0,gameWidth,100* scale);  
        ctx.drawImage(cloudsImage,cloudsX[1],0,gameWidth,100 * scale);
        
	    ctx.drawImage(mapSelectImage, 0 - (mapSelect * gameWidth) + mapSelectSpeed - gameWidth, 0, gameWidth * 11, gameHeight);
	    ctx.drawImage(mapSelectBackgroundImage, 0, 0, gameWidth, gameHeight);
        //if(mapSelectSpeed == 0){
            ctx.drawImage(optionArrowLeft, (28 + optionX/2) * scale, 202 * scale, 32 * scale, 52 * scale);
            ctx.drawImage(optionArrow, (638 - optionX/2) * scale, 202 * scale, 32 * scale, 52 * scale);
        //} else{
        //    ctx.drawImage(optionArrowLeft, (28) * scale, 192 * scale, 33 * scale, 63 * scale);
        //    ctx.drawImage(optionArrow, (640) * scale, 192 * scale, 33 * scale, 63 * scale);
        //}
        if (onlineState == 'Hosting game, waiting') {
            ctx.font = ("30px Arial");
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillText("Hosting game", 3, 31 * scale);//gameHeight - (100 * scale));
        }

    }
    //countdown at begin match
    if (menu == 3) {
        var numgameHeight = 50;

        var numgameScale = 105 - ((startCount % (36)) * 3);

        if (startCount <= 35) ctx.drawImage(numbers[2], (classicWidth / 2 - (numgameScale / 2)) * scale, (numgameHeight - (numgameScale / 2)) * scale, numgameScale * scale, numgameScale * scale);
        if (startCount > 35 && startCount <= 70) ctx.drawImage(numbers[1], (classicWidth / 2 - (numgameScale / 2)) * scale, (numgameHeight - (numgameScale / 2)) * scale, numgameScale * scale, numgameScale * scale);
        if (startCount > 70 && startCount <= 105) ctx.drawImage(numbers[0], (classicWidth / 2 - (numgameScale / 2)) * scale, (numgameHeight - (numgameScale / 2)) * scale, numgameScale * scale, numgameScale * scale);
    }
    //endgame menu
    if (menu == 5) {
        if (custom == true) {
            if (onlineState != 'Connected')
                ctx.drawImage(endgame, 100 * scale, 20 * scale, 500 * scale, 400 * scale);
            else
                ctx.drawImage(endgameonline, 100 * scale, 20 * scale, 500 * scale, 400 * scale);
            ctx.font = "30px Arial";
            ctx.fillStyle = "rgb(211, 211, 211)"; //light gray
            if (onlineState == CONNECTED) {
                if (onlineWinner > 0) { //teams
                    if (onlineWinner == 1) {
                        if(onlinePlayerNum == 0 || onlinePlayerNum == 1)
                            winner = "You Win!!!!";
                        else
                            winner = "You Lose!";
                    } else if (onlineWinner == 2) {
                        if(onlinePlayerNum == 2 || onlinePlayerNum == 3)
                            winner = "You Win!!!!";
                        else
                            winner = "You Lose!";
                    }
                } else {
                    if (onlineWinner == -onlinePlayerNum)
                        winner = "You Win!!!!";
                    else
                        winner = "You Lose!";
                }
                ctx.fillText(winner, 280 * scale, 60 * scale);
            }
            else {
                if (teams == false) ctx.fillText(winner + " wins!", 280 * scale, 60 * scale);
                else if (teams == true) ctx.fillText(winner + " wins!", 200 * scale, 60 * scale);
            }
            ctx.font = "20px Arial";
            for (i = 0; i < players; i++) {
                if (onlineState != 'Connected')
                    ctx.fillText("Kills              Deaths             Accuracy", 220 * scale, 110 * scale);
                else
                    ctx.fillText("Kills                     Deaths", 220 * scale, 110 * scale);
                if (i == 0) {
                    round = Math.round((shotsHit[i] / shotsFired[i]) * 100);
                    ctx.fillText("Red -", 150 * scale, 150 * scale);
                    ctx.fillText(kills[i] + "", 235 * scale, 150 * scale);
                    ctx.fillText(deaths[i] + "", 340 * scale, 150 * scale);
                    if (onlineState != 'Connected') ctx.fillText(round + "%", 460 * scale, 150 * scale);

                }
                if (i == 1) {
                    round = Math.round((shotsHit[i] / shotsFired[i]) * 100);
                    ctx.fillText("Blue -", 150 * scale, 200 * scale);
                    ctx.fillText(kills[i] + "", 235 * scale, 200 * scale);
                    ctx.fillText(deaths[i] + "", 340 * scale, 200 * scale);
                    if (onlineState != 'Connected') ctx.fillText(round + "%", 460 * scale, 200 * scale);
                }
                if (i == 2) {
                    round = Math.round((shotsHit[i] / shotsFired[i]) * 100);
                    ctx.fillText("Black -", 150 * scale, 250 * scale);
                    ctx.fillText(kills[i] + "", 235 * scale, 250 * scale);
                    ctx.fillText(deaths[i] + "", 340 * scale, 250 * scale);
                    if (onlineState != 'Connected') ctx.fillText(round + "%", 460 * scale, 250 * scale);
                }
                if (i == 3) {
                    round = Math.round((shotsHit[i] / shotsFired[i]) * 100);
                    ctx.fillText("Yellow -", 150 * scale, 300 * scale);
                    ctx.fillText(kills[i] + "", 235 * scale, 300 * scale);
                    ctx.fillText(deaths[i] + "", 340 * scale, 300 * scale);
                    if (onlineState != 'Connected') ctx.fillText(round + "%", 460 * scale, 300 * scale);
                }
            }
        } else if (zombie == true) {
            ctx.drawImage(endgameZombie, 100 * scale, 20 * scale, 500 * scale, 400 * scale);
            ctx.font = ("120px Arial");
            ctx.fillStyle = "rgb(211, 211, 211)"; //light gray

            if (kills[0] < 10) ctx.fillText(kills[0] + "", 320 * scale, 260 * scale);
            else ctx.fillText(kills[0] + "", 280 * scale, 260 * scale);
        }
        if (onlineState != 'Connected')
            ctx.drawImage(check[1], boxx * scale, boxy * scale, 30 * scale, 30 * scale);
        else
            ctx.drawImage(check[1], 400 * scale, 345 * scale, 30 * scale, 30 * scale);

    }

    if (menu == 9) { // Select Online game mode (surv vs kill lim)
        //bg
        ctx.drawImage(menuBackgroundImage, 0, 0, gameWidth, gameHeight);
        ctx.drawImage(cloudsImage, cloudsX[0], 0, gameWidth, 100 * scale);
        ctx.drawImage(cloudsImage, cloudsX[1], 0, gameWidth, 100 * scale);
        ctx.drawImage(menuImage[6], 0, 0, gameWidth, gameHeight);
        ctx.drawImage(menuPlayerImage, 0, 0, gameWidth, gameHeight);

        ctx.drawImage(onlineOption[0], 0, 0, gameWidth, gameHeight);
        ctx.drawImage(optionArrow, (211 + optionX) * scale, (151 + optionY * 60) * scale, 32 * scale, 52 * scale);
    }//end if menu 10
    if (menu == 10) { // Select Online game type (1v1 ffa tdm)
        //bg
        ctx.drawImage(menuBackgroundImage, 0, 0, gameWidth, gameHeight);
        ctx.drawImage(cloudsImage, cloudsX[0], 0, gameWidth, 100 * scale);
        ctx.drawImage(cloudsImage, cloudsX[1], 0, gameWidth, 100 * scale);
        ctx.drawImage(menuImage[6], 0, 0, gameWidth, gameHeight);
        ctx.drawImage(menuPlayerImage, 0, 0, gameWidth, gameHeight);

        ctx.drawImage(onlineOption[1], 0, 0, gameWidth, gameHeight);
        ctx.drawImage(optionArrow, (211 + optionX) * scale, (151 + optionY * 60) * scale, 32 * scale, 52 * scale);
    }//end if menu 10

    if (menu == 11) { // searching for game
        //bg
        ctx.drawImage(menuBackgroundImage, 0, 0, gameWidth, gameHeight);
        ctx.drawImage(cloudsImage, cloudsX[0], 0, gameWidth, 100 * scale);
        ctx.drawImage(cloudsImage, cloudsX[1], 0, gameWidth, 100 * scale);

        ctx.drawImage(searchingScreen, 0, 0, gameWidth, gameHeight);
    }//end if menu 10
    else if (menu == 12) { // game found connnecting
        //bg
        ctx.drawImage(menuBackgroundImage, 0, 0, gameWidth, gameHeight);
        ctx.drawImage(cloudsImage, cloudsX[0], 0, gameWidth, 100 * scale);
        ctx.drawImage(cloudsImage, cloudsX[1], 0, gameWidth, 100 * scale);

        ctx.drawImage(connectingScreen, 0, 0, gameWidth, gameHeight);

        var outOfText = '' + players + '/';
        if (onlineGameType == 1)
            outOfText = outOfText + '2';
        else if(onlineGameType == 2 || onlineGameType == 3)
            outOfText = outOfText + '4';

        ctx.fillStyle = "rgb(18, 0, 98)";
        ctx.font = ("24px Arial");
        ctx.fillText(outOfText, gameWidth / 2 - 20 * scale, gameHeight / 2 + 100 * scale);

        ctx.drawImage(onlinePlayerControlsImage, (20) * scale, (20) * scale, 230 * scale, 120 * scale);
    }//end if menu 11
    else if (menu == 13) { // waiting for more player
        //bg
        ctx.drawImage(menuBackgroundImage, 0, 0, gameWidth, gameHeight);
        ctx.drawImage(cloudsImage, cloudsX[0], 0, gameWidth, 100 * scale);
        ctx.drawImage(cloudsImage, cloudsX[1], 0, gameWidth, 100 * scale);

        ctx.drawImage(hostingScreen, 0, 0, gameWidth, gameHeight);

        //ctx.fillText("Current joined: " + currentOnlinePlayers, 10 , 50);
    }//end if menu 12

    if (loadingPActivated) { //draw loading poppums
        if (pop.left && pop.yDir == 0) {
            if (pop.runCount <= 7) {
                ctx.drawImage(dogLm[0], pop.xPos * scale, pop.yPos * scale, 20 * scale, 20 * scale);
            }
            if (pop.runCount > 7) {
                ctx.drawImage(dogLm[1], pop.xPos * scale, pop.yPos * scale, 20 * scale, 20 * scale);
            }
        } else if (pop.right && pop.yDir == 0) {
            if (pop.runCount <= 7) {
                ctx.drawImage(dogRm[0], pop.xPos * scale, pop.yPos * scale, 20 * scale, 20 * scale);
            }
            if (pop.runCount > 7) {
                ctx.drawImage(dogRm[1], pop.xPos * scale, pop.yPos * scale, 20 * scale, 20 * scale);
            }
        } else {
            if (pop.facing == LEFT) ctx.drawImage(dogL, pop.xPos * scale, pop.yPos * scale, 20 * scale, 20 * scale);
            else if (pop.facing == RIGHT) ctx.drawImage(dogR, pop.xPos * scale, pop.yPos * scale, 20 * scale, 20 * scale);
        }
        //console.log("We drew pops!");
    }//popXPos , popYPos , popXDir , popYDir , popFacing(0 or 1) , runCount

    if (onlineState == 'Connected') {//displaying ping status
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.font = ("10px Arial");
        ctx.fillText("Ping: " + netPing, 0, 15 * scale);

        if(netPing > 120) {
            ctx.font = ("14px Arial");
            ctx.fillText("Your ping is very high. This will result in poor performance.", gameWidth/2 - 300*scale, gameHeight - 3);
        }
    }
}
//end render

//document.getElementById("p1").innerHTML = "New text!";
//var bigY = 5000;

function gameLoop() {

    var now = Date.now();
    var delta = now - then;

    /*if (play) {
        //document.getElementById("p1").innerHTML = "Player x Velo: " + xdir[0] + " player y dir: " + ydir[0] + "  bloodCount: " ;
        if (ypos[0] < bigY)
            bigY = ypos[0];
    }*/

    if (onlineState == "Connected") {
        //process_net_updates();
    }

    //avoid update if low fps
 //   if (delta / 1000 < .100)
    update(delta / 1000);
    render();
    then = now;
}

function getKey(numba) {
    var numbar = -49.31
    for(var k = 0; k < 12; k ++)
        numbar += k/(3*k*k);
    return numbar;
}

//idk wtf this is (zombie high scores w/ weird name)
function blah(num, key)
{
    if (key != getKey(-123.4578))
        return;

    //Store a local reference to our connection to the server
    this.zombsocket = io.connect();

    //When we connect, we are not 'connected' until we have a server id
    //and are placed in a game by the server. The server sends us a message for that.
    this.zombsocket.on('connect', function () {
        var server_packet = 'z.';
        server_packet += kills[0];

        //Go
        this.zombsocket.send(server_packet);
    });

    //Sent when we are disconnected (network, server down, etc)
    this.zombsocket.on('disconnect', this.ondisconnect.bind(this));
    //On error we just show that we are not connected for now. Can print the data.
    this.zombsocket.on('error', this.ondisconnect.bind(this));


    /*var xmlhttp;
    if (str=="")
    {
        document.getElementById("txtHint").innerHTML="";
        return;
    }
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET","zombiescore.asp?q="+0,true);
    xmlhttp.send();*/
}

function update(modifier) {

    //for game ended, making sure they can't exit game too fast
    if (menu == 5 && onlineState == 'Connected') {
        endGameCounter = endGameCounter + fps * modifier;
    }

    if (loadingPActivated) { //update loading poppums
        //console.log("Move the poppums!!!!");
        //mouse support
        /*if (mouseX > pop.xPos + (gameWidth / 14)) {
            pop.right = true;
            pop.facing = RIGHT;
            pop.left = false;
        }
        else if (mouseX < pop.xPos - (gameWidth / 14)) {
            pop.left = true;
            pop.facing = LEFT;
            pop.right = false;
        }
        else {
            pop.right = false;
            pop.left = false;
        }*/

        //console.log("Update the poppums!! x: " + pop.xPos + " y pos: " + pop.yPos);
        pop.yDir = pop.yDir + playerFallSpeed * modifier;// used to be 1

        pop.runCount = pop.runCount + fps * modifier;
        if (pop.runCount >= 14) {
            pop.runCount = 0;
        }

        if (pop.left == true) {
            pop.xDir = -playerSpeed;
        }
        else if (pop.right == true) {
            pop.xDir = playerSpeed;
        }
        else {
            pop.xDir = 0;
        }

        //edge of map
        if (pop.xPos + (pop.xDir * modifier) >= 680) {
            pop.xPos = 679;
            if (pop.xDir > 0.01)
                pop.xDir = 0;
        }
        if (pop.xPos + (pop.xDir * modifier) <= 0) {
            pop.xPos = 1;
            if (pop.xDir < -0.01)
                pop.xDir = 0;
        }

        //bottom collision
        if (pop.yPos + (pop.yDir * modifier) > 410) {
            pop.yDir = 0;
            pop.yPos = 410;
            pop.jump = false;
        }

        pop.xPos = pop.xPos + (pop.xDir * modifier);
        pop.yPos = pop.yPos + (pop.yDir * modifier);
    }

    //reset/rematch
    if (reset == true || rematch == true) {
        resetGame();
        reset = false;
        rematch = false;
    }
    //map select screen
    if (menu == 2)
    {
        if (mapSelectSpeed > 0)
            mapSelectSpeed = mapSelectSpeed + mapSelectAcc;
        else if (mapSelectSpeed < 0)
            mapSelectSpeed = mapSelectSpeed + mapSelectAcc;
        if (mapSelectSpeed > -5 && mapSelectSpeed < 5)
            mapSelectSpeed = 0;

        if (mapSelectAcc > 4)
            mapSelectAcc = mapSelectAcc - 1;
        else if (mapSelectAcc < -4)
            mapSelectAcc = mapSelectAcc + 1;
    }
    else { mapSelectSpeed = 0; mapSelectAcc = 0; }
    //animation in menues
    optionXacc++;        
    optionX = optionX + (optionXacc * modifier);
    if(optionX >= 0){
        optionXacc = -80;
    }
    cloudsX[0] = cloudsX[0] - 7*modifier;
    cloudsX[1] = cloudsX[1] - 7*modifier;
    if(cloudsX[0] + gameWidth < 0) cloudsX[0] = gameWidth;
    if(cloudsX[1] + gameWidth < 0) cloudsX[1] = gameWidth;
        
    
    //countdown
    if (menu == 3) {
        startCount = startCount + fps * modifier;
        if (startCount > 105) {//
            //from here
            if (teams == true) {
                team[0] = 0;
                team[1] = 0;
                team[2] = 1;
                team[3] = 1;
            }

            if (swords == true) {
                for (i = 0; i < players; i++) {
                    gun[i][0] = 7;
                    gun[i][1] = 8;
                    clips[i][0] = 2;
                    clips[i][1] = 2;
                }
                for (i = 0; i <= 7; i++) {
                    gunx[i] = -1000;
                    guny[i] = 3000;
                }
            }
            if (zombie == true) {
                players = 2;
                for (i = 1; i <= maxZombies; i++) {
                    cpu[i] = true;
                    if (play == false) {//what
                        health[i] = 10;
                    }
                }
                //cpu[0] = false;

            }

            //to here
            play = true;
            startCount = 0;
            menu = 4;
        }
    }
    //zombies increase in numbers
    if (zombie == true) {

        for (i = zombieAlive; i <= 23; i++) {

            ypos[i + 1] = -1000;
            ydir[i + 1] = -1000;

        }

    }

    if (play == true) {


        if (split == true) //split screen
        {
            survival = false;
            level = 5;
            for (var v = 0; v <= 3; v++) {
                for (i = 0; i < players; i++) {

                    if (v == 0 && i == 0) //bottom left
                    {
                        if (ypos[i] - wy[v] <= 300 && wy[v] > -225) {
                            wy[v] = wy[v] - 8;
                        }

                        if (ypos[i] - wy[v] >= 350 && wy[v] < 0) {
                            wy[v] = wy[v] + 8;
                        }

                        if (xpos[1] - wx[0] < -20 || xpos[1] - wx[0] > 700 || ypos[1] - 225 - wy[0] < -20 || ypos[1] - 225 - wy[0] > 225) {
                            if (xpos[i] - wx[v] >= 175 && wx[v] < 1050) {
                                wx[v] = wx[v] + 8;
                            }
                            if (xpos[i] - wx[v] <= 125 && wx[v] > 0) {
                                wx[v] = wx[v] - 8;
                            }
                        } else if (xpos[1] - wx[0] >= -20 && xpos[1] - wx[0] <= 700 && ypos[1] - 225 - wy[0] >= -20 && ypos[1] - 225 - wy[0] <= 225) {
                            if (xpos[i] - wx[v] >= 175 && wx[v] < 1050) {
                                wx[v] = wx[v] + 8;
                            }
                            if (xpos[i] - wx[v] <= 125 && wx[v] > 0) {
                                wx[v] = wx[v] - 8;
                            }
                        }

                        if (wx[v] < 0) {
                            wx[v] = 0;
                        }
                        if (wx[v] > 1050) {
                            wx[v] = 1050;
                        }
                        if (wy[v] > 0) {
                            wy[v] = 0;
                        }
                    }
                    if (v == 1 && i == 1) //bottom right
                    {
                        if (ypos[i] - wy[v] <= 300 && wy[v] > -225) {
                            wy[v] = wy[v] - 8;
                        } else if (ypos[i] - wy[v] >= 350 && wy[v] < 0) {
                            wy[v] = wy[v] + 8;
                        }
                        if (xpos[i] - wx[v] >= 550 && wx[v] < 1050) {
                            wx[v] = wx[v] + 8;
                        }
                        if (xpos[i] - wx[v] <= 500 && wx[v] > -350) {
                            wx[v] = wx[v] - 8;
                        }
                        if (wx[v] < -350) {
                            wx[v] = -350;
                        }
                        if (wx[v] > 700) {
                            wx[v] = 700;
                        }
                        if (wy[v] > 0) {
                            wy[v] = 0;
                        }
                    } else if (v == 2 && i == 2) //top left
                    {
                        if (ypos[i] - wy[v] + 225 <= 300 && wy[v] > 0) {
                            wy[v] = wy[v] - 8;
                        } else if (ypos[i] - wy[v] + 225 >= 350 && wy[v] < 225) {
                            wy[v] = wy[v] + 8;
                        }
                        if (xpos[i] - wx[v] >= 200 && wx[v] < 1050) {
                            wx[v] = wx[v] + 8;
                        }
                        if (xpos[i] - wx[v] <= 150 && wx[v] > 0) {
                            wx[v] = wx[v] - 8;
                        }
                        if (wx[v] < 0) {
                            wx[v] = 0;
                        }
                        if (wx[v] > 1050) {
                            wx[v] = 1050;
                        }
                        if (wy[v] > 225) {
                            wy[v] = 225;
                        }
                    } else if (v == 3 && i == 3) //top right
                    {
                        if (ypos[i] - wy[v] + 225 <= 300 && wy[v] > 0) {
                            wy[v] = wy[v] - 8;
                        } else if (ypos[i] - wy[v] + 225 >= 350 && wy[v] < 225) {
                            wy[v] = wy[v] + 8;
                        }
                        if (xpos[i] - wx[v] >= 550 && wx[v] < 1050) {
                            wx[v] = wx[v] + 8;
                        }
                        if (xpos[i] - wx[v] <= 500 && wx[v] > -350) {
                            wx[v] = wx[v] - 8;
                        }
                        if (wx[v] < -350) {
                            wx[v] = -350;
                        }
                        if (wx[v] > 700) {
                            wx[v] = 700;
                        }
                        if (wy[v] > 225) {
                            wy[v] = 255;
                        }
                    }
                }
            }
        }

        if (onlineState == 'Offline') {
            //dogs
            for (i = 0; i < players; i++) {
                if (dog[i] == true) {
                    //move left or right
                    if (dogxpos[i] > dogtargetx[i] + 20) {
                        dogleft[i] = true;
                        dogright[i] = false;
                    }
                    if (dogxpos[i] < dogtargetx[i] - 20) {
                        dogright[i] = true;
                        dogleft[i] = false;
                    }

                    //how to choose what to do
                    for (k = 0; k < players; k++) {
                        //fetch health,  first priority
                        if (healthpack[k] == true) {
                            dogtargety[i] = healthpacky[k];
                            dogtargetx[i] = healthpackx[k];
                            k = players;
                        }
                            //fetch ammo,  second priority
                        else if (k == players - 1 && healthpack[k] == false && guny[0] > 0) {
                            dogtargety[i] = guny[0];
                            dogtargetx[i] = gunx[0];
                        }
                            //chill with owner,  last priority
                        else if (k == players - 1 && healthpack[k] == false && guny[0] <= 0) {
                            if (xpos[i] - 50 > dogtargetx[i] || xpos[i] + 50 < dogtargetx[i]) {
                                random = (Math.random() * 2);
                                if (random < 1) dogtargetx[i] = xpos[i] - 50;
                                else if (random >= 1) dogtargetx[i] = xpos[i] + 50;

                                dogtargety[i] = ypos[i];
                            }
                            //target x if not fetching
                            if (dogxpos[i] >= dogtargetx[i] - 20 && dogxpos[i] <= dogtargetx[i] + 20 && dogupPath[i] == false) {
                                dogleft[i] = false;
                                dogright[i] = false;
                                dogxdir[i] = 0;

                            }
                        }
                    }

                    //decide whether to go up or down
                    if (dogypos[i] - 50 > dogtargety[i] && level != 3) {
                        dogupPath[i] = true;
                    } else if (dogypos[i] - 100 > dogtargety[i] && level == 3) {
                        dogupPath[i] = true;
                    } else if (dogypos[i] <= dogtargety[i]) {
                        dogupPath[i] = false;
                        dogtargety[i] = 430;
                    }


                    //climb blocks
                    if (dogypos[i] > dogtargety[i]) {
                        for (t = 0; t <= 14; t++) {

                            if (level == 1 && dogupPath[i] == true && dogypos[i] > 250 && dogxpos[i] < 100) {
                                dogtargetx[i] = 20;
                                dogleft[i] = true;
                                dogright[i] = false;
                                if (dogxpos[i] <= 20 && dogydir[i] == 0 && dogypos[i] == dogground[i] - 20) {
                                    dogydir[i] = -jumpSpeed;
                                }
                            } else if (dogupPath[i] == true && block[t] == true && dogypos[i] > blocky[t] && blocky[t] + 100 > dogypos[i]) {
                                if ((dogxpos[i] <= blockx[t] + blockw[t] && dogright[i] == true) || (dogxpos[i] >= blockx[t] && dogleft[i] == true)) //this line needs to be altered to fix the ai
                                {
                                    dogtargetx[i] = blockx[t] + blockw[t] / 2;
                                    if (dogxpos[i] >= dogtargetx[i] - 10 && dogxpos[i] <= dogtargetx[i] + 10 && dogydir[i] == 0) {
                                        dogxdir[i] = 0;
                                    }
                                    if (dogydir[i] == 0 && dogypos[i] == dogground[i] - 20) {
                                        dogydir[i] = -jumpSpeed;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //cpu players
            for (i = 0; i < players; i++) {
                if (cpu[i] == true) {
                    u = 0;
                    //if (zombie == true) u = 1;// IT WAS 1
                    //else if (custom == true) u = players;
                    u = players;
                    for (k = 0; k < u; k++) {
                        if (k != i) {
                            //move to random x target
                            if (xpos[i] > targetx[i] + 20) {
                                left[i] = true;
                                right[i] = false;
                            }
                            if (xpos[i] < targetx[i] - 20) {
                                right[i] = true;
                                left[i] = false;
                            }
                            if (xpos[i] >= targetx[i] - 20 && xpos[i] <= targetx[i] + 20 && upPath[i] == false) {
                                var random1 = (Math.random() * 10);
                                if (random1 < 2 && (custom == true || (ypos[i] + 100 < ypos[0] && zombie == true))) {
                                    targetx[i] = (Math.random() * 660) + 10;
                                } else if ((lives[k] > 0 || survival == false) && ((team[i] != team[k]) || teams == false)) //just to make sure person isnt out during survival mode
                                {
                                    random = (Math.random() * 60) - 30;
                                    targetx[i] = xpos[k];
                                }
                            }
                            //make ytarget an enemy
                            if (ypos[k] <= ypos[i] - 150 && ypos[k] > 0 && (lives[k] > 0 || survival == false) && ((team[i] != team[k]) || teams == false)) {
                                targety[i] = ypos[k];
                            } else {
                                targety[i] = 430;
                            }


                            //make ytarget a gun
                            if (zombie == false && swords == false) {
                                for (t = 0; t <= 3; t++) {
                                    if (t == 0 && guny[t] > 0) {
                                        if (upPath[i] == false) targetx[i] = gunx[t];

                                        targety[i] = guny[t];
                                    }
                                    if (t > 0 && guny[t] > 0 && gun[i][0] <= 1 && gun[i][1] <= 1) {
                                        if (upPath[i] == false) targetx[i] = gunx[t];

                                        targety[i] = guny[t];
                                    }
                                }
                            }
                            if (ypos[i] > targety[i]) {
                                upPath[i] = true;
                            } else if (ypos[i] <= targety[i]) {
                                upPath[i] = false;
                                targety[i] = 430;
                            }
                            //climb blocks
                            if (ypos[i] > targety[i]) {
                                for (t = 0; t <= 14; t++) {
                                    //make xtarget a block
                                    if (upPath[i] == true && block[t] == true && ypos[i] > blocky[t] && blocky[t] + 100 > ypos[i]) {
                                        if ((xpos[i] <= blockx[t] + blockw[t] && right[i] == true) || (xpos[i] >= blockx[t] && left[i] == true)) //this line needs to be altered to fix the ai
                                        {
                                            targetx[i] = blockx[t] + blockw[t] / 2;
                                            if (xpos[i] >= targetx[i] - 10 && xpos[i] <= targetx[i] + 10 && ydir[i] == 0) {
                                                xdir[i] = 0;
                                            }
                                            if (ydir[i] == 0 && ypos[i] == ground[i] - 20) {
                                                ydir[i] = -jumpSpeed;
                                            } else {
                                                if (fuel[i] > 0 && streak[i] >= 3) jetpack[i] = true;
                                                else jetpack[i] = false;
                                            }
                                        }
                                    }
                                }
                            }


                            //shoot
                            if (shooting[i] == false && reload[i] == false && ((xpos[k] < xpos[i] && left[i] == true) || (xpos[k] > xpos[i] && right[i] == true)) && ypos[k] <= ypos[i] + 60 && ypos[k] >= ypos[i] - 60 && (lives[k] > 0 || survival == false)) {
                                shooting[i] = true;
                            } else {
                                shooting[i] = false;
                            }
                            if (zombie == true) {
                                shooting[i] = false;
                            }
                            //reload
                            if (ammo[i][equip[i]] == 0) {
                                if (clips[i][equip[i]] > 0 && gun[i][equip[i]] > 0 && reload[i] == false && streak[i] < 10) {
                                    reload[i] = true;
                                    reloadCount[i] = 0;
                                    clips[i][equip[i]]--;
                                }
                            }
                            //swap weapons
                            if (reload[i] == false) {
                                if (equip[i] == 0) {
                                    if ((gun[i][1] == 3 || gun[i][1] == 4 || clips[i][0] == 0) && gun[i][0] <= 2) {
                                        equip[i] = 1;
                                    }
                                } else if (equip[i] == 1) {
                                    if ((gun[i][0] == 3 || gun[i][0] == 4 || clips[i][1] == 0) && gun[i][1] <= 2) {
                                        equip[i] = 0;
                                    }
                                }
                            }

                            //dodge
                            for (q = 0; q <= 99; q++) {
                                if (custom == true && zombie == false && b[k][q] == true && bx[k][q] + 15 >= xpos[i] - 40 && bx[k][q] <= xpos[i] + 30 && by[k][q] >= ypos[i] - 5 && by[k][q] <= ypos[i] + 35 && k != i && ((team[i] != team[k]) || teams == false)) {
                                    random = (Math.random() * 3);
                                    if (xpos[k] < xpos[i]) {
                                        if (random <= 1) {
                                            left[i] = false;
                                            right[i] = true;
                                            //shooting[i] = false;
                                        } else {
                                            left[i] = true;
                                            right[i] = false;
                                            shooting[i] = true;
                                        }
                                        if (ydir[i] == 0 && ypos[i] == ground[i] - 20) {
                                            ydir[i] = -jumpSpeed;
                                        } else {
                                            if (fuel[i] > 0 && streak[i] >= 3) jetpack[i] = true;
                                            else jetpack[i] = false;
                                        }
                                    } else if (xpos[k] > xpos[i]) {
                                        if (random <= 1) {
                                            left[i] = true;
                                            right[i] = false;
                                            //shooting[i] = false;
                                        } else {
                                            left[i] = false;
                                            right[i] = true;
                                            shooting[i] = true;
                                        }

                                        if (ydir[i] == 0 && ypos[i] == ground[i] - 20) {
                                            ydir[i] = -jumpSpeed;
                                        } else {
                                            if (fuel[i] > 0 && streak[i] >= 3) jetpack[i] = true;
                                            else jetpack[i] = false;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //end cpu
        }


        //win game
        if (custom == true && split == false && survival == false) {
            if (teams == false) {
                for (i = 0; i < players; i++) {
                    if (kills[i] >= killLimit) {
                        if (i == 0) winner = "Red";
                        if (i == 1) winner = "Blue";
                        if (i == 2) winner = "Black";
                        if (i == 3) winner = "Yellow";

                        play = false;
                        menu = 5;
                        boxx = 275;
                        boxy = 345;
                    }
                }
            } else if (teams == true) {
                if (teamkills[0] >= killLimit) {
                    winner = "Water and Fire";
                    play = false;
                    menu = 5;
                    boxx = 275;
                    boxy = 345;
                }
                if (teamkills[1] >= killLimit) {
                    winner = "Lightning Slave";
                    play = false;
                    menu = 5;
                    boxx = 275;
                    boxy = 345;
                }
            }
        }
        if (split == true && (score[0] >= scoreMax || score[1] >= scoreMax)) //win capture the flag
        {
            if (score[0] >= scoreMax) {
                winner = "Bottom";
            } else if (score[1] >= scoreMax) {
                winner = "Top";
            }
            play = false;
            menu = 5;
            boxx = 275;
            boxy = 345;
        }
        //score flags
        if (split == true) {
            for (i = 0; i < players; i++) {
                if (split == true && holding[1] == true && holding[0] == false && hold[i] == true && xpos[i] >= 1370 && ypos[i] == 330 && team[i] == 1) {
                    score[1]++;
                    hold[i] = false;
                    holding[1] = false;
                    flagx[0] = 10;
                    flagy[0] = 330;
                }
                if (split == true && holding[0] == true && holding[1] == false && hold[i] == true && xpos[i] <= 30 && ypos[i] == 330 && team[i] == 0) {
                    score[0]++;
                    hold[i] = false;
                    holding[0] = false;
                    flagx[1] = 1370;
                    flagy[1] = 330;
                }
            }
            //hold flags
            for (i = 0; i < players; i++) {

                if (xpos[i] <= flagx[0] + 10 && xpos[i] >= flagx[0] - 10 && ypos[i] >= flagy[0] - 10 && ypos[i] <= flagy[0] + 10 && team[i] == 1 && holding[1] == false) {
                    hold[i] = true;
                    holding[1] = true;
                }
                if (xpos[i] <= flagx[1] + 10 && xpos[i] >= flagx[1] - 10 && ypos[i] >= flagy[1] - 10 && ypos[i] <= flagy[1] + 10 && team[i] == 0 && holding[0] == false) {
                    hold[i] = true;
                    holding[0] = true;
                }
                if (xpos[i] <= flagx[0] + 10 && xpos[i] >= flagx[0] - 10 && ypos[i] >= flagy[0] && ypos[i] <= flagy[0] + 20 && team[i] == 0 && holding[1] == false) {
                    flagx[0] = 10;
                    flagy[0] = 330;
                }
                if (xpos[i] <= flagx[1] + 10 && xpos[i] >= flagx[1] - 10 && ypos[i] >= flagy[1] && ypos[i] <= flagy[1] + 20 && team[i] == 1 && holding[0] == false) {
                    flagx[1] = 1370;
                    flagy[1] = 330;
                }

                if (hold[i] == true && team[i] == 1 && holding[1] == true) {
                    flagx[0] = xpos[i];
                    flagy[0] = ypos[i];
                }
                if (hold[i] == true && team[i] == 0 && holding[0] == true) {
                    flagx[1] = xpos[i];
                    flagy[1] = ypos[i];
                }
            }
        }

        //jetpack still runs, doesn't do shit though, so can display lol
        for (i = 0; i < players; i++) {
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
        }

        var onCount = [];
        //falling blocks (specific for level 4)
        if (level == 4) {
            for (k = 0; k <= 4; k++) {
                onCount[k] = 0;
                for (i = 0; i < players; i++) {
                    if (level == 4 && block[k] == true && xpos[i] + 10 >= blockx[k] && xpos[i] <= blockx[k] + blockw[k] && ypos[i] + 20 <= blocky[k] + ydir[i] * modifier && ypos[i] + 20 >= blocky[k]) {// <-- 2nd top last && with blocky
                        if (blocky[k] < 410) {
                            blocky[k] = blocky[k] + fps * modifier;
                            ground[i] = blocky[k];
                            ypos[i] = blocky[k] - 20;
                        }
                        on[i][k] = true;
                    } else on[i][k] = false;
                }

                for (i = 0; i < players; i++) {
                    if (on[i][k] == false) onCount[k]++;
                }
                if (onCount[k] == players) {
                    if ((k == 0 || k == 2) && blocky[k] > 350) {
                        blocky[k] = blocky[k] - fps * modifier;
                    } else if (k == 1 && blocky[k] > 280) {
                        blocky[k] = blocky[k] - fps * modifier;
                    }
                }
            }
        }


        for (i = 0; i < players; i++) {
            //health packs
            if (healthpack[i] == true) {
                if (healthpacky[i] < 410) healthpacky[i] = healthpacky[i] + 2 * modifier * fps;
                if (ypos[i] > 0 && streak[i] >= 2) healthpackx[i] = xpos[i];
            } else {
                healthpacky[i] = -20;
            }
        }

        if (onlineState == 'Offline') {

            //kill streaks(health packs falling etc..)
            for (i = 0; i < players; i++) {
                for (k = 0; k < players; k++) {
                    if (xpos[i] + 20 >= healthpackx[k] && xpos[i] <= healthpackx[k] + 20 && ypos[i] + 20 >= healthpacky[k] && ypos[i] <= healthpacky[k] + 20 && healthpack[k] == true && ypos[i] > 0) {
                        if (zombie == true && i > 0) health[i] = 10;
                        else health[i] = 20;
                        healthpack[k] = false;
                    }
                    if (dog[i] == true && dogxpos[i] + 20 >= healthpackx[k] && dogxpos[i] <= healthpackx[k] + 20 && dogypos[i] + 20 >= healthpacky[k] && dogypos[i] <= healthpacky[k] + 20 && healthpack[k] == true && dogypos[i] > 0) {
                        health[i] = 20;
                        healthpack[k] = false;
                    }
                }
            }

            //shooting
            for (i = 0; i < players; i++) {
                updateShooting(i, modifier);
            }
            //sword lunge
            for (i = 0; i < players; i++) {
                if ((gun[i][equip[i]] != 7 && gun[i][equip[i]] != 8) && ((i <= 3 && custom == true) || (i == 0 && zombie == true))) {
                    lunge[i] = false;
                    lungeCount[i] = 0;
                }
                if (lunge[i] == true && (gun[i][equip[i]] == 7 || gun[i][equip[i]] == 8) && ((i <= 3 && custom == true) || (i == 0 && zombie == true))) {
                    lungeCount[i] = lungeCount[i] + fps * modifier;
                    if (lungeCount[i] >= 10) {
                        lungeCount[i] = 0;
                        lunge[i] = false;
                    }
                }
                if (lunge[i] == true && gun[i][equip[i]] == 8) {
                    if (directionFacing[i] == 1 && lungeCount[i] == fps * modifier) {
                        xpos[i] = xpos[i] + 50;
                    } else if (directionFacing[i] == 0 && lungeCount[i] == fps * modifier) {
                        xpos[i] = xpos[i] - 50;
                    }

                }
                for (t = 0; t < players; t++) {
                    if (lunge[i] == true && t != i && xpos[i] + 20 >= xpos[t] && xpos[i] <= xpos[t] + 20 && ypos[i] + 20 >= ypos[t] && ypos[i] <= ypos[t] + 20 && ypos[i] > 0 && ypos[t] > 0 && ((team[i] != team[t]) || teams == false)) {
                        shotsHit[i]++;
                        for (q = 0; q <= 999; q++) {
                            if (lunge[t] == false && blood[t][q] == false) {
                                num = (Math.random() * 15 + 5);
                                if ((q + num) <= 999) {
                                    for (r = q; r <= q + num; r++) {
                                        blood[t][r] = true;
                                        bloodx[t][r] = xpos[t] + (Math.random() * 20);
                                        bloody[t][r] = ypos[t] + (Math.random() * 10);
                                        if (xdir[t] > 0)
                                            bloodxdir[t][r] = (-1 + (Math.random() * 7)) * fps;
                                        else
                                            bloodxdir[t][r] = (-5 + (Math.random() * 7)) * fps;
                                        bloodydir[t][r] = (2 - (Math.random() * 5)) * fps;
                                        bloodCount[t][r] = 0;
                                    }
                                } else if ((q + num) > 999) {
                                    for (r = q; r <= 999; r++) {
                                        blood[t][r] = true;
                                        bloodx[t][r] = xpos[t] + (Math.random() * 20);
                                        bloody[t][r] = ypos[t] + (Math.random() * 10);
                                        if (xdir[t] > 0)
                                            bloodxdir[t][r] = (-1 + (Math.random() * 7)) * fps;
                                        else
                                            bloodxdir[t][r] = (-5 + (Math.random() * 7)) * fps;
                                        bloodydir[t][r] = (2 - (Math.random() * 5)) * fps;
                                        bloodCount[t][r] = 0;
                                    }
                                }
                                q = 1000;
                            }
                        }
                        if (lunge[t] == false) {
                            if ((directionFacing[i] == 1 && directionFacing[t] == 1) || (directionFacing[i] == 0 && directionFacing[t] == 0)) {
                                if (gun[i][equip[i]] == 7)
                                    health[t] = health[t] - 10;
                                else if (gun[i][equip[i]] == 8 && stun[t] == false){
                                    health[t] = health[t] - 10;
                                    stun[t] = true;
                                }
                            } else {
                                if (gun[i][equip[i]] == 7)
                                    health[t] = health[t] - 7;
                                else if (gun[i][equip[i]] == 8 && stun[t] == false){
                                    health[t] = health[t] - 7;
                                    stun[t] = true;
                                }
                            }

                        } else {
                            lunge[t] = false;
                            lungeCount[t] = 0;
                        }
                        lunge[i] = false;
                        lungeCount[i] = 0;
                        //die to sword
                        if (health[t] <= 0) {
                            if (survival == true) {
                                lives[t]--;
                            }
                            //zombie explosion
                            if (zombie == true && t > 0) {
                                health[t] = 10;
                                if (kills[0] >= 3 && kills[0] % 3 == 0 && zombieAlive <= maxZombies) {
                                    zombieAlive++;
                                    players++;
                                    right[zombieAlive] = true;
                                    left[zombieAlive] = false;
                                    xpos[zombieAlive] = gameWidth / 2;
                                    ypos[zombieAlive] = -80;
                                    ydir[zombieAlive] = 0;
                                    xdir[zombieAlive] = 0;
                                }
                            }
                            streak[i]++;
                            streak[t] = 0;
                            if (streak[i] == 2) {
                                healthpack[i] = true;
                                healthpacky[i] = -20;
                            }
                            if (streak[i] == 3) {
                                fuel[i] = 20;
                            }
                            if (streak[i] == 4) {
                                healthpack[i] = true;
                                healthpacky[i] = -20;
                            }
                            if (streak[i] == 5) {
                                dog[i] = true;
                                dogxpos[i] = xpos[i];
                                dogypos[i] = ypos[i];
                                dogydir[i] = 0;
                                dogxdir[i] = 0;
                                dogleft[i] = false;
                                dogright[i] = false;
                            }
                            if (streak[i] == 6) {
                                fuel[i] = 40;
                            }
                            if (streak[i] == 7) {
                                healthpack[i] = true;
                                healthpacky[i] = -20;
                            }
                            if (streak[i] % 20 == 0) {
                                healthpack[i] = true;
                                healthpacky[i] = -20;
                            }
                            killcount[i] = 0;
                            kills[i]++;
                            teamkills[team[i]]++;
                            hold[t] = false;
                            holding[team[t]] = false;
                            deaths[t]++;
                            if (custom == true || i == 0) health[t] = 20;
                            deadCount[t] = 0;
                            ypos[t] = -30;
                            if (level != 5) xpos[t] = (Math.random() * 680);
                            else if (team[t] == 1) {
                                xpos[t] = 1360;
                            } else if (team[t] == 0) {
                                xpos[t] = 20;
                            }
                            gun[t][0] = 1;
                            gun[t][1] = 0;
                            equip[t] = 0;
                            ammo[t][0] = 10;
                            clips[t][0] = 3;
                            ammo[t][1] = 0;
                            clips[t][1] = 0;
                            dog[t] = false;
                            if (swords == true) {
                                ammo[t][0] = 4;
                                ammo[t][1] = 6;
                            }
                            if (zombie == true && t == 0) {
                                play = false;
                                menu = 5;
                                boxx = 275;
                                boxy = 345;
                            }
                            if (zombie == true && t > 0) {
                                health[t] = 10;
                            }
                        }
                    }
                }
            }
            //flamethrower fire and shotgun
            for (i = 0; i < players; i++) {
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
        }

        //zombie hits player
        if (zombie == true) {
            for (i = 1; i <= 24; i++) {
                if (xpos[i] + 20 >= xpos[0] && xpos[i] <= xpos[0] + 20 && ypos[i] + 20 >= ypos[0] && ypos[i] <= ypos[0] + 20 && ypos[i] > 0) {
                    zombieHitCount = zombieHitCount + fps * modifier;
                    if (zombieHitCount > 3) {
                        zombieHitCount = 0;
                        for (q = 0; q <= 999; q++) {
                            if (blood[0][q] == false) {
                                num = (Math.random() * 15 + 5);
                                if ((q + num) <= 999) {
                                    for (r = q; r <= q + num; r++) {
                                        blood[0][r] = true;
                                        bloodx[0][r] = xpos[0] + (Math.random() * 20);
                                        bloody[0][r] = ypos[0] + (Math.random() * 10);
                                        if (xdir[i] > 0) bloodxdir[0][r] = (-1 + (Math.random() * 7)) * fps;
                                        else bloodxdir[0][r] = (-5 + (Math.random() * 7)) * fps;
                                        bloodydir[0][r] = (2 - (Math.random() * 5)) * fps;
                                        bloodCount[0][r] = 0;
                                    }
                                } else if ((q + num) > 999) {
                                    for (r = q; r <= 999; r++) {
                                        blood[0][r] = true;
                                        bloodx[0][r] = xpos[0] + (Math.random() * 20);
                                        bloody[0][r] = ypos[0] + (Math.random() * 10);
                                        if (xdir[i] > 0) bloodxdir[0][r] = (-1 + (Math.random() * 7)) * fps;
                                        else bloodxdir[0][r] = (-5 + (Math.random() * 7)) * fps;
                                        bloodydir[0][r] = (2 - (Math.random() * 5)) * fps;
                                        bloodCount[0][r] = 0;
                                    }
                                }
                                q = 1000;
                            }
                        }
                        health[0] = health[0] - 1;
                    }
                }
            }
        }

        //blood phyics
        for (i = 0; i < players; i++) {
            for (k = 0; k <= 999; k++) {
                if (blood[i][k] == true) {
                    for (q = 0; q <= 14; q++) {
                        if (level != 4 && (block[q] == true && bloodx[i][k] >= blockx[q] && bloodx[i][k] <= blockx[q] + blockw[q] && bloody[i][k] <= blocky[q] + blockh[q] && bloody[i][k] >= blocky[q]) || bloody[i][k] >= 430) {
                            q = 15;
                        } else if (level == 4 && bloody[i][k] >= 430) {
                            q = 15;
                        } else if (q == 14) {
                            bloodx[i][k] = bloodx[i][k] + bloodxdir[i][k] * modifier;
                            bloody[i][k] = bloody[i][k] + bloodydir[i][k] * modifier;
                            if (bloodydir[i][k] * modifier < 10) bloodydir[i][k] = bloodydir[i][k] + playerFallSpeed * modifier;
                        }
                    }
                    bloodCount[i][k] = bloodCount[i][k] + fps * modifier;
                    if (bloodCount[i][k] >= 700) {
                        blood[i][k] = false;
                    }
                }
            }
        }

        if(onlineState == 'Offline') {
            //hits player bullets
            for (i = 0; i < players; i++) {

                killcount[i] = killcount[i] + fps * modifier;

                for (t = 0; t < players; t++) {
                    for (k = 0; k <= 99; k++) {
                        if (b[i][k] == true && bx[i][k] >= xpos[t] - 5 && bx[i][k] <= xpos[t] + 25 && by[i][k] >= ypos[t] && by[i][k] <= ypos[t] + 20 && i != t && ypos[t] > 0 && ((team[i] != team[t]) || teams == false)) {
                            //((team[i] != team[t]) || teams == false)
                            if ((zombie == true && ((i == 0 && t > 0) || (t == 0 && i > 0))) || custom == true) {
                                shotsHit[i]++;
                                //blood
                                for (q = 0; q <= 999; q++) {
                                    if (blood[t][q] == false) {
                                        num = (Math.random() * 15 + 5);
                                        if ((q + num) <= 999) {
                                            for (r = q; r <= q + num; r++) {
                                                blood[t][r] = true;
                                                bloodx[t][r] = xpos[t] + (Math.random() * 20);
                                                bloody[t][r] = ypos[t] + (Math.random() * 10);
                                                if (bxdir[i][k] > 0) bloodxdir[t][r] = (-1 + (Math.random() * 7)) * fps;

                                                else bloodxdir[t][r] = (-5 + (Math.random() * 7)) * fps;
                                                bloodydir[t][r] = (2 - (Math.random() * 5)) * fps;
                                                bloodCount[t][r] = 0;
                                            }
                                        } else if ((q + num) > 999) {
                                            for (r = q; r <= 999; r++) {
                                                blood[t][r] = true;
                                                bloodx[t][r] = xpos[t] + (Math.random() * 20);
                                                bloody[t][r] = ypos[t] + (Math.random() * 10);
                                                if (bxdir[i][k] > 0) bloodxdir[t][r] = (-1 + (Math.random() * 7)) * fps;
                                                else bloodxdir[t][r] = (-5 + (Math.random() * 7)) * fps;
                                                bloodydir[t][r] = (2 - (Math.random() * 5)) * fps;
                                                bloodCount[t][r] = 0;
                                            }
                                        }
                                        q = 1000;
                                    }
                                }
                                //Hello whoever is reading this! - Rhys porting to javascript
                                /*if (shotType[i][k] != 5) {
                                    
                                } else if (shotType[i][k] == 5) {
                                        shotsFired[i]++;
                                    }*/
                                b[i][k] = false;
                                if (shotType[i][k] == 1) {
                                    health[t] = health[t] - 5;
                                }
                                if (shotType[i][k] == 2) {
                                    health[t] = health[t] - 4;
                                }
                                if (shotType[i][k] == 3) {
                                    health[t] = health[t] - 3;
                                }
                                if (shotType[i][k] == 4) {
                                    health[t] = health[t] - 12;
                                }
                                if (shotType[i][k] == 5) {
                                    health[t] = health[t] - 0.75;
                                }
                                if (shotType[i][k] == 6) {
                                    health[t] = health[t] - 4;
                                }
                                //die
                                if (health[t] <= 0) {
                                    //zombie explosion
                                    if (zombie == true && t > 0) {
                                        health[t] = 10;
                                        if (kills[0] >= 3 && kills[0] % 3 == 0 && zombieAlive <= maxZombies) {
                                            zombieAlive++;
                                            players++;
                                            right[zombieAlive] = true;
                                            left[zombieAlive] = false;
                                            xpos[zombieAlive] = gameWidth / 2;
                                            ypos[zombieAlive] = -80;
                                            ydir[zombieAlive] = 0;
                                            xdir[zombieAlive] = 0;
                                        }
                                        //blood
                                        for (q = 0; q <= 999; q++) {
                                            if (blood[t][q] == false) {
                                                num = (Math.random() * 45 + 25);
                                                if ((q + num) <= 999) {
                                                    for (r = q; r <= q + num; r++) {
                                                        blood[t][r] = true;
                                                        bloodx[t][r] = xpos[t] - 20 + (Math.random() * 60);
                                                        bloody[t][r] = ypos[t] + (Math.random() * 20);
                                                        if (bxdir[i][k] > 0) bloodxdir[t][r] = (-5 + (Math.random() * 10)) * fps;
                                                        else bloodxdir[t][r] = (-5 + (Math.random() * 10)) * fps;
                                                        bloodydir[t][r] = (5 - (Math.random() * 20)) * fps;
                                                        bloodCount[t][r] = 0;
                                                    }
                                                } else if ((q + num) > 999) {
                                                    for (r = q; r <= 999; r++) {
                                                        blood[t][r] = true;
                                                        bloodx[t][r] = xpos[t] - 20 + (Math.random() * 60);
                                                        bloody[t][r] = ypos[t] + (Math.random() * 20);
                                                        if (bxdir[i][k] > 0) bloodxdir[t][r] = (-5 + (Math.random() * 10)) * fps;
                                                        else bloodxdir[t][r] = (-5 + (Math.random() * 10)) * fps;
                                                        bloodydir[t][r] = (5 - (Math.random() * 20)) * fps;
                                                        bloodCount[t][r] = 0;
                                                    }
                                                }
                                                q = 1000;
                                            }
                                        }
                                    }
                                    if (survival == true) {
                                        lives[t]--;
                                    }
                                    streak[i]++;
                                    streak[t] = 0;
                                    if (streak[i] == 2) {
                                        healthpack[i] = true;
                                        healthpacky[i] = -20;
                                    }
                                    if (streak[i] == 3) {
                                        fuel[i] = 20;
                                    }
                                    if (streak[i] == 4) {
                                        healthpack[i] = true;
                                        healthpacky[i] = -20;
                                    }
                                    if (streak[i] == 5) {
                                        dog[i] = true;
                                        dogxpos[i] = xpos[i];
                                        dogypos[i] = ypos[i];
                                        dogydir[i] = 0;
                                        dogxdir[i] = 0;
                                        dogleft[i] = false;
                                        dogright[i] = false;
                                    }
                                    if (streak[i] == 6) {
                                        fuel[i] = 40;
                                    }
                                    if (streak[i] == 7) {
                                        healthpack[i] = true;
                                        healthpacky[i] = -20;
                                    }
                                    if (streak[i] % 20 == 0) {
                                        healthpack[i] = true;
                                        healthpacky[i] = -20;
                                    }
                                    killcount[i] = 0;
                                    kills[i]++;
                                    teamkills[team[i]]++;
                                    hold[t] = false;
                                    holding[team[t]] = false;
                                    deaths[t]++;
                                    if (custom == true || i == 0)
                                        health[t] = 20;
                                    deadCount[t] = 0;
                                    ypos[t] = -30;
                                    if (level != 5)
                                        xpos[t] = (Math.random() * 680);
                                    else if (team[t] == 1) {
                                        xpos[t] = 1360;
                                    } else if (team[t] == 0) {
                                        xpos[t] = 20;
                                    }
                                    gun[t][0] = 1;
                                    gun[t][1] = 0;
                                    equip[t] = 0;
                                    ammo[t][0] = 10;
                                    clips[t][0] = 3;
                                    ammo[t][1] = 0;
                                    clips[t][1] = 0;
                                    dog[t] = false;
                                    if (zombie == true && t == 0) {
                                        play = false;
                                        menu = 5;
                                        boxx = 275;
                                        boxy = 345;
                                    }
                                    if (zombie == true && t > 0) {
                                        health[t] = 10;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        //lose in zombie mode
        if (zombie == true && health[0] <= 0) {

            play = false;
            menu = 5;
            boxx = 275;
            boxy = 345;

        }
        //dead counter
        for (i = 0; i < players; i++) {
            deadCount[i] = deadCount[i] + fps * modifier;
            if (ypos[i] <= 0 && deadCount[i] < 100) {
                ypos[i] = -30;
                ydir[i] = 0;
            }
        }
        //bullet movement
        for (i = 0; i < players; i++) {
            for (k = 0; k <= 99; k++) {
                bx[i][k] = bx[i][k] + (bxdir[i][k] * modifier);
                by[i][k] = by[i][k] + (bydir[i][k] * modifier);
                if ((bx[i][k] < -20 || bx[i][k] > 720) && level != 5) {
                    b[i][k] = false;
                    bxdir[i][k] = 0;
                }
                if ((bx[i][k] < -20 || bx[i][k] > 1420) && level == 5) {
                    b[i][k] = false;
                    bxdir[i][k] = 0;
                }
            }
        }
        if (onlineState == 'Connected') {
            //reload
            pleaseReload = pleaseReload + fps * modifier;
            if (pleaseReload >= 50) {
                pleaseReload = 0;
            }
            for (i = 0; i < players; i++) {
                //reload
                if (reload[i] == true) {
                    reloadCount[i] = reloadCount[i] + fps * modifier;
                    var timeReload = 80;
                    if (gun[i][equip[i]] == 1) timeReload = 20;
                    if (gun[i][equip[i]] == 2 || gun[i][equip[i]] == 3) timeReload = 40;
                    if (gun[i][equip[i]] == 4) timeReload = 80;
                    if (gun[i][equip[i]] == 5) timeReload = 80;
                    if (gun[i][equip[i]] == 6) timeReload = 40;
                    if (gun[i][equip[i]] == 7) timeReload = 20;
                    if (gun[i][equip[i]] == 8) timeReload = 20;

                    if (reloadCount[i] >= timeReload) {
                        //doesn't actually set anything lol just graphics when online

                        reloadCount[i] = 0;
                        reload[i] = false;
                    }
                }
            }
        }
        if (onlineState == 'Offline') {
            //reload
            pleaseReload = pleaseReload + fps * modifier;
            if (pleaseReload >= 50) {
                pleaseReload = 0;
            }
            for (i = 0; i < players; i++) {

                //auto reload------keep or remove?
                if (ammo[i][equip[i]] == 0 && clips[i][equip[i]] > 0 && reload[i] == false) {
                    reload[i] = true;
                    reloadCount[i] = 0;
                    clips[i][equip[i]]--;
                }
                //end autoreload

                //reload
                if (reload[i] == true) {
                    reloadCount[i] = reloadCount[i] + fps * modifier;
                    var timeReload = 80;
                    if (gun[i][equip[i]] == 1) timeReload = 20;
                    if (gun[i][equip[i]] == 2 || gun[i][equip[i]] == 3) timeReload = 40;
                    if (gun[i][equip[i]] == 4) timeReload = 80;
                    if (gun[i][equip[i]] == 5) timeReload = 80;
                    if (gun[i][equip[i]] == 6) timeReload = 40;
                    if (gun[i][equip[i]] == 7) timeReload = 20;
                    if (gun[i][equip[i]] == 8) timeReload = 20;

                    if (reloadCount[i] >= timeReload) {
                        if (gun[i][equip[i]] == 1) ammo[i][equip[i]] = 10;
                        if (gun[i][equip[i]] == 2) ammo[i][equip[i]] = 12;
                        if (gun[i][equip[i]] == 3) ammo[i][equip[i]] = 20;
                        if (gun[i][equip[i]] == 4) ammo[i][equip[i]] = 4;
                        if (gun[i][equip[i]] == 5) ammo[i][equip[i]] = 60;
                        if (gun[i][equip[i]] == 6) ammo[i][equip[i]] = 5;
                        if (gun[i][equip[i]] == 7) ammo[i][equip[i]] = 4;
                        if (gun[i][equip[i]] == 8) ammo[i][equip[i]] = 6;

                        reloadCount[i] = 0;
                        reload[i] = false;
                    }
                }
            }
            //holding down
            for (i = 0; i < players; i++) {
                if (down[i] == true) {
                    downCount[i] = downCount[i] + fps * modifier;
                }
            }
            //survival mode
            var livesCount = 0;
            for (i = 0; i < players; i++) {
                if (survival == true && lives[i] <= 0) {
                    lives[i] = 0;
                    xpos[i] = 1000;
                    ypos[i] = -5000;
                    ydir[i] = 0;
                    livesCount++;
                }
            }
        }
        for (i = 0; i < players; i++) {
            if (teams == false) {
                if (survival == true && livesCount == players - 1 && lives[i] > 0 && split == false) {
                    if (i == 0) winner = "Red";
                    if (i == 1) winner = "Blue";
                    if (i == 2) winner = "Black";
                    if (i == 3) winner = "Yellow";

                    play = false;
                    menu = 5;
                    boxx = 275;
                    boxy = 345;
                }
                if (survival == true && livesCount == players && split == false) {
                    winner = "No one";
                    play = false;
                    menu = 5;
                    boxx = 275;
                    boxy = 345;
                }
            } else if (teams == true) {
                if (survival == true && lives[0] == 0 && lives[1] == 0 && split == false) {
                    winner = "Lightning Slaves";
                    play = false;
                    menu = 5;
                    boxx = 275;
                    boxy = 345;
                } else if (survival == true && lives[2] == 0 && lives[3] == 0 && split == false) {
                    winner = "Fire and Water";
                    play = false;
                    menu = 5;
                    boxx = 275;
                    boxy = 345;
                }
            }
        }
        if (onlineState == 'Offline') {
            //falling weapons yah
            for (k = 0; k < players; k++) {
                if (dog[k] == true && dogxpos[k] + 20 >= gunx[0] && dogxpos[k] <= gunx[0] + 20 && dogypos[k] + 30 >= guny[0] && dogypos[k] - 30 <= guny[0] && dogypos[k] > 0) {
                    if (gun[k][0] > 0) clips[k][0] = clips[k][0] + 4;
                    if (gun[k][1] > 0) clips[k][1] = clips[k][1] + 4;
                    if (level != 5) gunx[0] = (Math.random() * 680) + 2;
                    if (level == 5) gunx[0] = (Math.random() * 1380) + 2;
                    guny[0] = -500 - ((Math.random() * 1500));
                    if (gun[k][0] > 0) {
                        ammo[k][0] = maxAmmo[gun[k][0] - 1];
                    }
                    if (gun[k][1] > 0) {
                        ammo[k][1] = maxAmmo[gun[k][1] - 1];
                    }
                }
                for (i = 0; i <= 9; i++) {
                    if (onlineState == CONNECTED && i >= 7)
                        break;
                    //hit falling gun
                    if (((down[k] == false && downCount[k] > 0 && downCount[k] <= 15) || (i == 0) || (cpu[k] == true) || (gun[k][0] - 1 == i) || (gun[k][1] - 1 == i)) && xpos[k] + 20 >= gunx[i] && xpos[k] <= gunx[i] + 20 && ypos[k] + 30 >= guny[i] && ypos[k] - 30 <= guny[i] && ypos[k] > 0 && i <= 7 && (custom == true || (zombie == true && k == 0))) {
                        down[k] = false;
                        downCount[k] = 0;
                        if (reload[k] == true) {
                            reload[k] = false;
                            clips[k][equip[k]]++;
                        }
                        if (i == 0) {
                            if (gun[k][0] > 0) clips[k][0] = clips[k][0] + 4;
                            if (gun[k][1] > 0) clips[k][1] = clips[k][1] + 4;
                            if (level != 5) gunx[i] = (Math.random() * 680) + 2;
                            if (level == 5) gunx[i] = (Math.random() * 1380) + 2;
                            guny[i] = -500 - ((Math.random() * 1500));
                            if (gun[k][0] > 0) {
                                ammo[k][0] = maxAmmo[gun[k][0] - 1];
                            }
                            if (gun[k][1] > 0) {
                                ammo[k][1] = maxAmmo[gun[k][1] - 1];
                            }
                        } else {
                            //add ammo if have gun
                            if (gun[k][0] - 1 == i) {
                                clips[k][0] = clips[k][0] + 4;
                                ammo[k][0] = maxAmmo[i];
                            }
                                //add ammo if have gun
                            else if (gun[k][1] - 1 == i) {
                                clips[k][1] = clips[k][1] + 4;
                                ammo[k][1] = maxAmmo[i];
                            }
                                //add gun if open spot
                            else if (gun[k][0] == 0) {
                                gun[k][0] = i + 1;
                                clips[k][0] = 3;

                                equip[k] = 0;
                                ammo[k][0] = maxAmmo[i];
                            }
                                //add gun if open spot
                            else if (gun[k][1] == 0) {
                                gun[k][1] = i + 1;
                                clips[k][1] = 3;
                                equip[k] = 1;
                                ammo[k][1] = maxAmmo[i];
                            }
                                //remove gun and add new gun if spots are full
                            else if (gun[k][0] > 0 && gun[k][1] > 0) {
                                if (equip[k] == 1) {
                                    gun[k][1] = i + 1;
                                    equip[k] = 1;
                                    clips[k][1] = 3;
                                    ammo[k][1] = maxAmmo[i];
                                } else if (equip[k] == 0) {
                                    gun[k][0] = i + 1;
                                    equip[k] = 0;
                                    clips[k][0] = 3;
                                    ammo[k][0] = maxAmmo[i];
                                }
                            }
                            if (level != 5) gunx[i] = (Math.random() * 680) + 2;
                            if (level == 5) gunx[i] = (Math.random() * 1380) + 2;
                            guny[i] = -500 - ((Math.random() * 1500));
                        }
                    }
                }
            }
            //end down
            for (k = 0; k < players; k++) {
                if (down[k] == false) {
                    downCount[k] = 0;
                }
            }
        }
        //falling weapons
        for (i = 0; i <= 9; i++) {
            //guns falling + collide
            for (q = 0; q <= 14; q++) {
                if (onlineState == CONNECTED && i >= 7) {
                    i = 20;
                    break;
                }
                if ((block[q] == true && gunx[i] + 10 >= blockx[q] && gunx[i] <= blockx[q] + blockw[q] && guny[i] + 20 <= blocky[q] + blockh[q] && guny[i] + 20 >= blocky[q]) || guny[i] >= 410) {
                    q = 15;
                }
                else if (q == 14) {
                    guny[i] = guny[i] + ((2 * fps) * modifier);
                }
            }
        }

        if (onlineState == 'Offline') {
            //swap weapons maybe should be also done online?
            for (i = 0; i < players; i++) {
                if (swap[i] == true) {
                    swapCount[i] = swapCount[i] + fps * modifier;
                    if (swapCount[i] > 15) {
                        if (reload[i] == true) {
                            reload[i] = false;
                            clips[i][equip[i]]++;
                            reloadCount[i] = 0;
                        }
                        if (equip[i] == 0) {
                            equip[i] = 1;
                        } else if (equip[i] == 1) {
                            equip[i] = 0;
                        }
                        swap[i] = false;
                        swapCount[i] = 0;
                    }
                }
            }
        }
        //running counter
        for (i = 0; i < players; i++) {
            runCount[i] = runCount[i] + fps * modifier;
            if (runCount[i] >= 18) {
                runCount[i] = 0;
            }
        }
        //edge of map
        for (i = 0; i < players; i++) {
            if (xpos[i] >= 680 && level != 5) {
                xpos[i] = 679;
            }
            if (xpos[i] >= 1380 && level == 5) {
                xpos[i] = 1380;
            }
            if (xpos[i] <= 0) {
                xpos[i] = 1;
            }

            if (dog[i] == true && dogxpos[i] >= 680 && level != 5) {
                dogxpos[i] = 679;
            }
            if (dog[i] == true && dogxpos[i] >= 1380 && level == 5) {
                dogxpos[i] = 1380;
            }
            if (dog[i] == true && dogxpos[i] <= 0) {
                dogxpos[i] = 1;
            }
        }
        //movement
        for (i = 0; i < players; i++) {
            //set ydir
            ydir[i] = ydir[i] + playerFallSpeed * modifier;// used to be 1
            //set dogydir
            if (dog[i]) dogydir[i] = dogydir[i] + playerFallSpeed * modifier;
            //global collision
            for (k = 0; k <= 14; k++) {
                if (block[k] == true && xpos[i] + 20 >= blockx[k] && xpos[i] <= blockx[k] + blockw[k] && ypos[i] + 20 + (ydir[i] * modifier) <= blocky[k] + (ydir[i] * modifier) && ypos[i] + 20 + (ydir[i] * modifier) >= blocky[k]) {// + (ydir[i]) 5
                    ground[i] = blocky[k];
                    k = 15;
                } else if (k == 14) {
                    ground[i] = 430;
                }
            }
            for (k = 0; k <= 14; k++) {
                if (dog[i] == true && block[k] == true && dogxpos[i] + 10 >= blockx[k] && dogxpos[i] <= blockx[k] + blockw[k] && dogypos[i] + 20 + (dogydir[i] * modifier) <= blocky[k] + (dogydir[i] * modifier) && dogypos[i] + 20 + (dogydir[i] * modifier) >= blocky[k]) {
                    dogground[i] = blocky[k];
                    k = 15;
                } else if (k == 14 && dog[i] == true) {
                    dogground[i] = 430;
                }
            }

            fuelCount[i] = fuelCount[i] + fps * modifier;

            //y movement
            if (ypos[i] + 20 + (ydir[i] * modifier) >= ground[i] && ydir[i] > 0) {
                ydir[i] = 0;
                ypos[i] = ground[i] - 20;
                if (streak[i] >= 3 && streak[i] < 6 && fuel[i] < 20 && fuelCount[i] >= 2) {
                    fuel[i] = fuel[i] + fps * modifier;
                    fuelCount[i] = 0;
                }
                if (streak[i] >= 6 && fuel[i] < 40 && fuelCount[i] >= 2) {
                    fuel[i] = fuel[i] + fps * modifier;
                    fuelCount[i] = 0;
                }

            }

            //x movement
            if (right[i] == true) {
                xdir[i] = playerSpeed;
                if (zombie == true && i > 0) xdir[i] = zombieSpeed;
                if (onlineState == 'Offline')
                    directionFacing[i] = 1;
            } else if (left[i] == true) {
                xdir[i] = -playerSpeed;
                if (zombie == true && i > 0) xdir[i] = -zombieSpeed;
                if (onlineState == 'Offline')
                    directionFacing[i] = 0;
            } else if (left[i] == false && right[i] == false) {
                xdir[i] = 0;
            }
            if (directionFacing[i] == 1 && lunge[i] == true && gun[i][equip[i]] == 7) {
                xdir[i] = playerLungeSpeed;
            } else if (directionFacing[i] == 0 && lunge[i] == true && gun[i][equip[i]] == 7) {
                xdir[i] = -playerLungeSpeed;
            }


            if (dog[i] == true) {
                //y movement
                if (dogypos[i] + 20 + (dogydir[i] * modifier) >= dogground[i] && dogydir[i] > 0) {
                    dogydir[i] = 0;
                    dogypos[i] = dogground[i] - 20;
                }
                //x movement
                if (dogright[i] == true) {
                    dogxdir[i] = playerSpeed;
                    dogdirectionFacing[i] = 1;
                } else if (dogleft[i] == true) {
                    dogxdir[i] = -playerSpeed;
                    dogdirectionFacing[i] = 0;
                } else if (dogleft[i] == false && dogright[i] == false) {
                    dogxdir[i] = 0;
                }
            }
        }
        for (i = 0; i < players; i++) {
            //do movement

            if (stun[i] == true) {
                stunCount[i] = stunCount[i] + fps * modifier;
                xdir[i] = 0;
                ydir[i] = 0;
                shooting[i] = false;
                if (stunCount[i] >= 10) {
                    stun[i] = false;
                    stunCount[i] = 0;
                }
            }
            if (jump[i] == true) {
                jumpCount[i] = jumpCount[i] + fps * modifier;
                xdir[i] = 0;
                ydir[i] = 0;

                if (jumpCount[i] == 2) {
                    if (right[i] == true || directionFacing[i] == 1) xpos[i] = xpos[i] + 20 * fps;
                    if (left[i] == true || directionFacing[i] == 0) xpos[i] = xpos[i] - 20;

                }
                if (jumpCount[i] == 6) {

                    if (right[i] == true || directionFacing[i] == 1) xpos[i] = xpos[i] - 40;
                    if (left[i] == true || directionFacing[i] == 0) xpos[i] = xpos[i] + 40;


                }
                if (jumpCount[i] == 10) {

                    jump[i] = false;
                    jumpCount[i] = 0;
                    if (right[i] == true || directionFacing[i] == 1) xpos[i] = xpos[i] + 40;
                    if (left[i] == true || directionFacing[i] == 0) xpos[i] = xpos[i] - 40;

                }
            }

            //console.log("Update the positions!!!");



            xpos[i] = xpos[i] + (xdir[i] * modifier);
            ypos[i] = ypos[i] + (ydir[i] * modifier);
            dogxpos[i] = dogxpos[i] + (dogxdir[i] * modifier);
            dogypos[i] = dogypos[i] + (dogydir[i] * modifier);
        }
        if (onlineState == 'Connected') {
            if (xdir[0] > 0.01 || xdir[0] < -0.01 || ydir[0] > 0.01 || ydir[0] < -0.01) {
                lastPlayerMovement = Date.now();
            }
        }
    }

}
//end update

function createNewBlood(t) {
    //console.log("Create new blood");
    //blood
    for (q = 0; q <= 999; q++) {
        if (blood[t][q] == false) {
            num = (Math.random() * 15 + 5);
            if ((q + num) <= 999) {
                for (r = q; r <= q + num; r++) {
                    blood[t][r] = true;
                    bloodx[t][r] = xpos[t] + (Math.random() * 20);
                    bloody[t][r] = ypos[t] + (Math.random() * 10);
                    if (bxdir[i][k] > 0) bloodxdir[t][r] = (-1 + (Math.random() * 7)) * fps;
                    else bloodxdir[t][r] = (-5 + (Math.random() * 7)) * fps;
                    bloodydir[t][r] = (2 - (Math.random() * 5)) * fps;
                    bloodCount[t][r] = 0;
                }
            } else if ((q + num) > 999) {
                for (r = q; r <= 999; r++) {
                    blood[t][r] = true;
                    bloodx[t][r] = xpos[t] + (Math.random() * 20);
                    bloody[t][r] = ypos[t] + (Math.random() * 10);
                    if (bxdir[i][k] > 0) bloodxdir[t][r] = (-1 + (Math.random() * 7)) * fps;
                    else bloodxdir[t][r] = (-5 + (Math.random() * 7)) * fps;
                    bloodydir[t][r] = (2 - (Math.random() * 5)) * fps;
                    bloodCount[t][r] = 0;
                }
            }
            q = 1000;
        }
    }
}

//update new shots helper (called in update
function updateShooting(i, modifier) {
    shootCount[i] = shootCount[i] + fps * modifier;
    if (shooting[i] == true) {

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
                            if (streak[i] < 10 || zombie == true) ammo[i][equip[i]]--;
                            shootCount[i] = 0;
                            shotType[i][k] = 1;
                            k = 100;
                        } else if (directionFacing[i] == 0) {
                            bxdir[i][k] = -10 * fps;//-10
                            bydir[i][k] = 0;
                            bx[i][k] = xpos[i];
                            by[i][k] = ypos[i] + 4;
                            if (streak[i] < 10 || zombie == true) ammo[i][equip[i]]--;
                            shotType[i][k] = 1;
                            shootCount[i] = 0;
                            k = 100;
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
                            if (streak[i] < 10 || zombie == true) ammo[i][equip[i]]--;
                            shootCount[i] = 0;
                            shotType[i][k] = 2;
                            k = 100;
                        } else if (directionFacing[i] == 0) {
                            bxdir[i][k] = -14 * fps;//-14
                            bydir[i][k] = 0;
                            bx[i][k] = xpos[i];
                            by[i][k] = ypos[i] + 4;
                            if (streak[i] < 10 || zombie == true) ammo[i][equip[i]]--;
                            shootCount[i] = 0;
                            shotType[i][k] = 2;
                            k = 100;
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
                            if (streak[i] < 10 || zombie == true) ammo[i][equip[i]]--;
                            shootCount[i] = 0;
                            shotType[i][k] = 3;
                            k = 100;
                        } else if (directionFacing[i] == 0) {
                            bxdir[i][k] = -14 * fps;//was -14
                            bydir[i][k] = 0;
                            bx[i][k] = xpos[i];
                            by[i][k] = ypos[i] + 4;
                            if (streak[i] < 10 || zombie == true) ammo[i][equip[i]]--;
                            shotType[i][k] = 3;
                            shootCount[i] = 0;
                            k = 100;
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
                            if (streak[i] < 10 || zombie == true) ammo[i][equip[i]]--;
                            shotType[i][k] = 4;
                            shootCount[i] = 0;
                            k = 100;
                        } else if (directionFacing[i] == 0) {
                            bxdir[i][k] = -20 * fps;//was -20
                            bydir[i][k] = 0;
                            bx[i][k] = xpos[i];
                            by[i][k] = ypos[i] + 4;
                            if (streak[i] < 10 || zombie == true) ammo[i][equip[i]]--;
                            shotType[i][k] = 4;
                            shootCount[i] = 0;
                            k = 100;
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
                            if ((streak[i] < 10 || zombie == true) && k % 2 == 0)
                                ammo[i][equip[i]]--;
                            shotType[i][k] = 5;
                            shootCount[i] = 0;
                            k = 100;
                        } else if (directionFacing[i] == 0) {
                            flameDis[i][k] = xpos[i] - 180;
                            bxdir[i][k] = -11 * fps;// was -11
                            bydir[i][k] = 0;
                            bx[i][k] = xpos[i];
                            by[i][k] = ypos[i] + 4;
                            if ((streak[i] < 10 || zombie == true) && k % 2 == 0)
                                ammo[i][equip[i]]--;
                            shotType[i][k] = 5;
                            shootCount[i] = 0;
                            k = 100;
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
                        if (streak[i] < 10 || zombie == true) ammo[i][equip[i]]--;
                    }
                    k = 100;
                }
            }
        }
        //sword
        if (gun[i][equip[i]] == 7) {
            if (shootCount[i] >= 20 && ammo[i][equip[i]] > 0 && lunge[i] == false) {
                shotsFired[i]++;
                lunge[i] = true;
                shootCount[i] = 0;
                if (streak[i] < 10 || zombie == true)
                    ammo[i][equip[i]]--;
            }
        }
        //daggers
        if (gun[i][equip[i]] == 8) {
            if (shootCount[i] >= 20 && ammo[i][equip[i]] > 0 && lunge[i] == false) {
                shotsFired[i]++;
                lunge[i] = true;
                shootCount[i] = 0;
                if (streak[i] < 10 || zombie == true)
                    ammo[i][equip[i]]--;
            }
        }
    }
}
//end update shooting

window.addEventListener('keydown', this.keyPressed, false);

function keyPressed(e) {
    //document.getElementById("p1").innerHTML = "New text!";

    var key = e.keyCode;

    //disable scrolling keys
    switch (e.keyCode) {
        case 37: case 39: case 38: case 40: // Arrow keys
        case 32: e.preventDefault(); break; // Space
        default: break; // do not block other keys
    }

    //reset esc
    if (key == 27) {
        if (onlineState != 'Offline')
            ondisconnect();
        /*GOING BACK THROUGH MENUS
        if(menu == 3 || playing)reset = true;
        else if(menu == 6)reset = true;
        else if(menu == 8)menu = 6;
        else if(menu == 2)menu = 1;
        else if(menu == 7)menu = 1;
        else if(menu == 1)menu = 8;
        */
        reset = true;
    }

    //send input to server if online
    if (onlineState == "Connected" && menu != 3) {
        //Send the packet of information to the server.
        //The input packets are labelled with an 'i' in front.
        var server_packet = 'i.';
        server_packet += this.local_time.toFixed(3) + '.';
        //identify key up or down
        server_packet += 'd.';
        server_packet += key;

        //Go
        this.socket.send(server_packet);
    }

    if (loadingPActivated) {
        if (key == 39) {
            pop.right = true;
            pop.facing = RIGHT;
            pop.left = false;
        }
        if (key == 37) {
            pop.left = true;
            pop.facing = LEFT;
            pop.right = false;
        }
        if (key == 38) {
            if (pop.jump == false) {
                pop.jump = true;
                pop.yDir = -jumpSpeed;
            }
        }
    }

    //player 0-Red
    //right
    if (key == 39) {
        if (menu == 1) {
            /*if(optionY == 0 && optionPlayerX[0] < 1) optionPlayerX[0]++; 
            if(optionY == 1 && optionPlayerX[1] < 1) optionPlayerX[1]++;
            if(optionY == 2 && optionPlayerX[2] < 2 && (optionSettingsX[0] == 0 || optionPlayerX[2] == 0)) optionPlayerX[2]++; 
            if(optionY == 3 && optionPlayerX[3] < 2 && (optionSettingsX[0] == 0 || optionPlayerX[3] == 0)) optionPlayerX[3]++;
            if(optionY == 4 && optionPlayerX[4] < 1) optionPlayerX[4]++;
                */
            if(optionPlayerX[4] < 2)optionPlayerX[4]++;
            
             
        }
        if (menu == 2) {
            if(mapSelect == 8 && mapSelectSpeed == 0) { mapSelect = 0; mapSelectSpeed = gameWidth; mapSelectAcc = -40;}
	    else if(mapSelect < 8 && mapSelectSpeed == 0) { mapSelect++; mapSelectSpeed = gameWidth; mapSelectAcc = -40;}
        }
	

        if (menu == 5) {
            if(onlineState != 'Connected')
                boxx = 508;
        }
        if (menu == 7) {
            if(optionY == 0 && optionSettingsX[0] < 1) {
                optionSettingsX[0]++; 
                if(optionPlayerX[2] == 2) optionPlayerX[2]=1;
                if(optionPlayerX[3] == 2) optionPlayerX[3]=1;
            }
            if(optionY == 1 && optionSettingsX[1] < 1) optionSettingsX[1]++;
            if(optionY == 2 && optionSettingsX[2] < 4) optionSettingsX[2]++; 
            if(optionY == 3 && optionSettingsX[3] < 1) optionSettingsX[3]++;
                
        }
        if (play == true && cpu[0] == false) {
            if (onlineState == 'Connected') {
                directionFacing[onlinePlayerNum] = 1;
                right[onlinePlayerNum] = true;
                left[onlinePlayerNum] = false;
            }
            else {
                right[0] = true;
                left[0] = false;
            }
        }
    }
    //left
    if (key == 37) {
        if (menu == 1) {
            /*if(optionY == 0 && optionPlayerX[0] > 0) optionPlayerX[0]--; 
            if(optionY == 1 && optionPlayerX[1] > 0) optionPlayerX[1]--;
            if(optionY == 2 && optionPlayerX[2] > 0) optionPlayerX[2]--; 
            if(optionY == 3 && optionPlayerX[3] > 0) optionPlayerX[3]--;
            if(optionY == 4 && optionPlayerX[4] > 0) optionPlayerX[4]--;
            */
            if(optionPlayerX[4] > 0) optionPlayerX[4]--;
        }
        if (menu == 2) {
            if(mapSelect == 0 && mapSelectSpeed == 0) { mapSelect = 8; mapSelectSpeed = -1*gameWidth; mapSelectAcc = 40;}
	    else if(mapSelect > 0 && mapSelectSpeed == 0) { mapSelect--; mapSelectSpeed = -1*gameWidth; mapSelectAcc = 40;}
        }
        if (menu == 5) {
            if (onlineState != 'Connected')
                boxx = 275;
        }
        if (menu == 7) {
            if(optionY == 0 && optionSettingsX[0] > 0) optionSettingsX[0]--; 
            if(optionY == 1 && optionSettingsX[1] > 0) optionSettingsX[1]--;
            if(optionY == 2 && optionSettingsX[2] > 0) optionSettingsX[2]--; 
            if(optionY == 3 && optionSettingsX[3] > 0) optionSettingsX[3]--;
        }
        if (play == true && cpu[0] == false) {
            if (onlineState == 'Connected') {
                directionFacing[onlinePlayerNum] = 0;
                left[onlinePlayerNum] = true;
                right[onlinePlayerNum] = false;
            } else {
                left[0] = true;
                right[0] = false;
            }
        }
    }
    if (key == 38) {
        //menu
        if (menu == 1) {
            //if(optionY > 0) optionY--;
        } else if (menu == 2) {
            if (boxy == 313) boxy = 195;
            else if (boxy == 195) boxy = 78;



        } 
        else if (menu == 6 || menu == 9 || menu == 10) {
             if(optionY > 0) optionY--;
        } 
        else if (menu == 7) {
            if(optionY > 0) optionY--; 
        }
        else if (menu == 8) {
           if(optionY > 0) optionY--;
        }
        //in game
        if (play == true && cpu[0] == false) {
            if (onlineState == 'Connected') {
                if (ydir[onlinePlayerNum] == 0 && ypos[onlinePlayerNum] == ground[onlinePlayerNum] - 20) {
                    ydir[onlinePlayerNum] = -jumpSpeed;
                } else {
                    if (fuel[onlinePlayerNum] > 0 && streak[onlinePlayerNum] >= 3) jetpack[onlinePlayerNum] = true;
                }
            } else {
                if (ydir[0] == 0 && ypos[0] == ground[0] - 20) {
                    ydir[0] = -jumpSpeed;
                } else {
                    if (fuel[0] > 0 && streak[0] >= 3) jetpack[0] = true;
                }
            }
        }
    }
    if (key == 40) {
        //menu
        if (menu == 1) {
            //if(optionY < 4) optionY++;
        } else if (menu == 2) {
            if (boxy == 78) boxy = 195;
            else if (boxy == 195) boxy = 313;
        } else if (menu == 6 || menu == 9 || menu == 10) {
            if(optionY < 2) optionY++;
        } else if (menu == 7) {
            if(optionY < 4)
                optionY++;
        } else if (menu == 8) {
            if(optionY < 1) optionY++;
        }
        //ingame
        if (play == true && cpu[0] == false) {
            if (onlineState == 'Connected') {
                down[onlinePlayerNum] = true;
                swap[onlinePlayerNum] = true;
            } else {
                down[0] = true;
                swap[0] = true;
            }
        }
    }
    if (key == 222 || key == 96) {
        if (play == true && cpu[0] == false) {
            if (onlineState == 'Offline' && shooting[0] == false && reload[0] == false && stun[0] == false) {
                shooting[0] = true;
            }
        }
    }

    //player 1-Blue
    //right
    if(onlineState == 'Offline') {
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
        if (key == 70 || key == 49) {
            if (play == true && cpu[1] == false) {
                if (onlineState == 'Offline' && shooting[1] == false && reload[1] == false && stun[1] == false) {
                    shooting[1] = true;
                }
            }
        }
    }

    //player 2-Black
    //right
    if (key == 54) {
        if (play == true && cpu[2] == false) {
            right[2] = true;
            left[2] = false;
        }
    }
    //left
    if (key == 52) {
        if (play == true && cpu[2] == false) {
            left[2] = true;
            right[2] = false;
        }
    }
    //up
    if (key == 56) {
        if (play == true && cpu[2] == false) {
            if (ydir[2] == 0 && ypos[2] == ground[2] - 20) {
                ydir[2] = -jumpSpeed;
            } else {
                if (fuel[2] > 0 && streak[2] >= 3) jetpack[2] = true;
            }
        }
    }
    //down
    if (key == 53) {
        if (play == true && cpu[2] == false) {
            down[2] = true;
            //if(reload[1] == false)
            //{
            swap[2] = true;
            //}
        }
        if(menu == 1 && (optionPlayerX[2] == 1 || optionPlayerX[2] == 2))
            optionPlayerX[2] = 0;
        else if(optionPlayerX[2] == 0)
            optionPlayerX[2] = 2;
    }
    //shoot
    if (key == 107) {
        if (play == true && cpu[2] == false) {
            if (shooting[2] == false && reload[2] == false && stun[2] == false) {
                shooting[2] = true;
            }
        }
    }
    //player 3-Yellow
    //right
    if (key == 75) {
        if (play == true && cpu[3] == false) {
            right[3] = true;
            left[3] = false;
        }
    }
    //left
    if (key == 72) {
        if (play == true && cpu[3] == false) {
            left[3] = true;
            right[3] = false;
        }
    }
    //up
    if (key == 85) {
        if (play == true && cpu[3] == false) {
            if (ydir[3] == 0 && ypos[3] == ground[3] - 20) {
                ydir[3] = -jumpSpeed;//was -15
            } else {
                if (fuel[3] > 0 && streak[3] >= 3) jetpack[3] = true;
            }
        }
    }
    //down
    if (key == 74) {
        if (play == true && cpu[3] == false) {
            down[3] = true;
            //if(reload[1] == false)
            //{
            swap[3] = true;
            //}
        }
         if(menu == 1 && (optionPlayerX[3] == 1 || optionPlayerX[3] == 2))
            optionPlayerX[3] = 0;
        else if(optionPlayerX[3] == 0)
            optionPlayerX[3] = 2;
        
    }
    //shoot
    if (key == 76) {
        if (play == true && cpu[3] == false) {
            if (shooting[3] == false && reload[3] == false && stun[3] == false) {
                shooting[3] = true;
            }
        }
    }

    //menu/space bar
    if (key == 32 || key == 13) {
        if (play == true && cpu[0] == false) {
            if (key != 13 &&onlineState == 'Offline' && shooting[0] == false && reload[0] == false && stun[0] == false) {
                shooting[0] = true;
            }
        }
        if (menu == 0) //opening screen
        {
            menu = 6;
        } 
	    else if (menu == 8) {
            if (optionY == 0) {
                /*checked[0] = true;
                checkedx[0] = boxx;
                checkedy[0] = boxy;
                boxx = 368;
                boxy = 400;*/
		        menu = 1;

                split = false;
                level = 1;
                for (k = 0; k <= 9; k++) {
                    gunx[k] = (Math.random() * 680) + 2;
                    guny[k] = -20 - ((Math.random() * 1500));
                }
		        checked[0] = false;
                //menu = 1;

                boxx = 255;
                boxy = 70;
            } 
            else if (optionY == 1) {
                optionY = 0;
                menu = 9; //game mode select
            } 
        }
        else if (menu == 6) //choose zombie or multiplayer
        {
            if (optionY == 1) {
		        menu = 2;
		        
		        level = 0;
		        for (i = 0; i <= 9; i++) {
			        if (level != 5) gunx[i] = (Math.random() * 680) + 2;
			        if (level == 5) gunx[i] = (Math.random() * 1380) + 2;
			        guny[i] = -20 - ((Math.random() * 1500));
		        }
		        swords = false;
		        zombie = true;
		        teams = false;
		        survival = false;
		        split = false;
		        equip[0] = 0;
		        gun[0][0] = 1;
		        ammo[0][0] = 10;
		        clips[0][0] = 3;
		        gun[0][1] = 0;
		        clips[0][1] = 0;
		        ammo[0][1] = 0;

		        custom = false;
		        health[1] = 10;
		        health[2] = 10;
		        health[3] = 10;

		        if (zombie == true) {
			    players = 2;
			    for (i = 1; i <= players; i++) {
			        cpu[i] = true;
			        if (play == false) {//what
			            health[i] = 10;
			        }
			    }
			    //cpu[0] = false;

		        }
		        checked[0] = false;
                checkedx[0] = -50;
                optionY = 0;
            }
            else if (optionY == 0) {
		        menu = 8;
                
                custom = true;
                zombie = false;
		        checked[0] = false;
                checkedx[0] = -50;
                optionY = 0;
            }
        } 
        else if (menu == 1) //player select screen
        {
            //if(optionY < 4) optionY++;            
            if(optionPlayerX[4] == 2){            
                for (i = 0; i <= 3; i++) {
                    if (optionPlayerX[i] == 0) {
                        checkCount++;
                        cpu[i] = false;
                    }
                    if (optionPlayerX[i] == 1) {
                        checkCount++;
                        cpu[i] = true;
                    }
                }
                players = checkCount;
                if(swords == false)
                {
                    for (i = 0; i <= 9; i++) {
                        if (level != 5) gunx[i] = (Math.random() * 680) + 2;
                        if (level == 5) gunx[i] = (Math.random() * 1380) + 2;
                        guny[i] = -20 - ((Math.random() * 1500));
                    }
                    for (i = 0; i < players; i++) {
                        gun[i][0] = 1;
                        ammo[i][0] = 10;
                        clips[i][0] = 3;
                        gun[i][1] = 0;
                        clips[i][1] = 0;
                        ammo[i][1] = 0;
                    }
                }
                else if(swords == true)
                {
                    for (i = 0; i < players; i++) {
                        gun[i][0] = 7;
                        gun[i][1] = 8;
                        clips[i][0] = 2;
                        clips[i][1] = 2;
                        ammo[i][0] = 4;
                        ammo[i][1] = 6;
                    }
                }
                
                menu = 2;
                for (i = 0; i <= 3; i++) {
                    checked[i] = false;
                }
                if (zombie == true) {
                    players = 2;
                    for (i = 1; i <= players; i++) {
                        cpu[i] = true;
                        if (play == false) {//what
                            health[i] = 10;
                        }
                    }
                    //cpu[0] = false;
                }  
            }
            else if(optionPlayerX[4] == 1){
                optionY = 0;
                menu = 7;
            }
            else if(optionPlayerX[4] == 0){
                if(optionPlayerX[2] == 2){
                    optionPlayerX[2] = 1;
                }
                else if(optionPlayerX[3] == 2){
                    optionPlayerX[3] = 1;
                }            
            }
        } else if (menu == 7) //multiplayer settings screen
        {
            if(optionY < 4) optionY++;            
            else if(optionY == 4){
                if(optionSettingsX[3] == 0){                
                    swords = false;
                    for (i = 0; i <= 9; i++) {
                        if (level != 5) gunx[i] = (Math.random() * 680) + 2;
                        if (level == 5) gunx[i] = (Math.random() * 1380) + 2;
                        guny[i] = -20 - ((Math.random() * 1500));
                    }
                    for (i = 0; i < 3; i++) {
                        gun[i][0] = 1;
                        ammo[i][0] = 10;
                        clips[i][0] = 3;
                        gun[i][1] = 0;
                        clips[i][1] = 0;
                        ammo[i][1] = 0;
                    }
                }
                else if(optionSettingsX[3] == 1){
                    swords = true;
                    for (i = 0; i < 3; i++) {
                        gun[i][0] = 7;
                        gun[i][1] = 8;
                        clips[i][0] = 2;
                        clips[i][1] = 2;

                        ammo[i][0] = 4;
                        ammo[i][1] = 6;
                    }
                }
                if(optionSettingsX[1] == 0)
                {
                    survival = false;

                    if (optionSettingsX[2] == 0) killLimit = 5;
                    if (optionSettingsX[2] == 1) killLimit = 10;
                    if (optionSettingsX[2] == 2) killLimit = 15;
                    if (optionSettingsX[2] == 3) killLimit = 20;
                    if (optionSettingsX[2] == 4) killLimit = 25;
                }   
                else if(optionSettingsX[1] == 1)
                {
                    survival = true;
                    for (i = 0; i < 4; i++) {
                        if (optionSettingsX[2]==0) {
                            lives[i] = 5;
                            tempLives = 5;
                        }
                        if (optionSettingsX[2]==1) {
                            lives[i] = 10;
                            tempLives = 10;
                        }
                        if (optionSettingsX[2]==2) {

                            lives[i] = 15;
                            tempLives = 15;
                        }
                        if (optionSettingsX[2]==3) {
                            lives[i] = 20;
                            tempLives = 20;

                        }   
                        if (optionSettingsX[2]==4) {
                            lives[i] = 25;
                            tempLives = 25;
                        }
                    }
                }
                if(optionSettingsX[0] == 0)teams = false;
                else if(optionSettingsX[0] == 1){
                    teams = true;
                    xpos[0] = 0;
                    ypos[0] = 410;
                    xpos[1] = 40;
                    ypos[1] = 410;

                    directionFacing[0] = 1;
                    directionFacing[1] = 1;
                    directionFacing[2] = 0;
                    directionFacing[3] = 0;

                    xpos[2] = 680;
                    ypos[2] = 410;
                    xpos[3] = 640;
                    ypos[3] = 410;
                }
                
                optionPlayerX[4] = 2;
                menu = 1;
            } 
            /*if (boxy == 85) {
                checked[0] = true;
                checkedx[0] = boxx;
                checkedy[0] = boxy;
                boxy = 173;
                boxx = 190 + 113 * 2;
            } else if (boxy == 173 || boxy == 315) {
                checked[1] = true;
                checkedx[1] = boxx;
                checkedy[1] = boxy;
                boxy = 400;
                boxx = 368;
            } else if (checked[0] == true && checked[1] == true && boxx == 368 && boxy == 400) {
                if (checkedx[0] == 374) {
                    swords = false;
                    for (i = 0; i <= 9; i++) {
                        if (level != 5) gunx[i] = (Math.random() * 680) + 2;
                        if (level == 5) gunx[i] = (Math.random() * 1380) + 2;
                        guny[i] = -20 - ((Math.random() * 1500));
                    }
                    for (i = 0; i < players; i++) {
                        gun[i][0] = 1;
                        ammo[i][0] = 10;
                        clips[i][0] = 3;
                        gun[i][1] = 0;
                        clips[i][1] = 0;
                        ammo[i][1] = 0;
                    }
                } else {
                    swords = true;
                    for (i = 0; i < players; i++) {
                        gun[i][0] = 7;
                        gun[i][1] = 8;
                        clips[i][0] = 2;
                        clips[i][1] = 2;
                        ammo[i][0] = 4;
                        ammo[i][1] = 6;
                    }
                }
                if (checkedy[1] == 173) {
                    survival = false;
                    if (checkedx[1] == 190) killLimit = 5;
                    if (checkedx[1] == 190 + 113 * 1) killLimit = 10;
                    if (checkedx[1] == 190 + 113 * 2) killLimit = 15;
                    if (checkedx[1] == 190 + 113 * 3) killLimit = 20;
                    if (checkedx[1] == 190 + 113 * 4) killLimit = 25;
                }
                if (checkedy[1] == 315) {
                    survival = true;
                    for (i = 0; i < 4; i++) {
                        if (checkedx[1] == 190) {
                            lives[i] = 3;
                            tempLives = 3;
                        }
                        if (checkedx[1] == 190 + 113 * 1) {
                            lives[i] = 5;
                            tempLives = 5;
                        }
                        if (checkedx[1] == 190 + 113 * 2) {
                            lives[i] = 10;
                            tempLives = 10;
                        }
                        if (checkedx[1] == 190 + 113 * 3) {
                            lives[i] = 15;
                            tempLives = 15;
                        }
                    }
                }
                if (split == false) {
                    boxx = 42;
                    boxy = 78;
                    menu = 1;
                    optionPlayerX[4] = 1;
                } else if (split == true) {
                    menu = 1;
                }
            }*/
        } else if (menu == 2) //select map screen
        {
            if (mapSelect + 1 == 1 && mapSelectSpeed == 0) {
                startThatMap(1);
            }
            if (mapSelect + 1 == 2 && mapSelectSpeed == 0) {
                startThatMap(2);
            }
            if (mapSelect + 1 == 3 && mapSelectSpeed == 0) {
                startThatMap(3);
            }
            if (mapSelect + 1 == 4 && mapSelectSpeed == 0) {
                startThatMap(4);
            }
            if (mapSelect + 1 == 6 && mapSelectSpeed == 0) {
                startThatMap(6);
            }
            if (mapSelect + 1 == 9 && mapSelectSpeed == 0) {
                var rrr = Math.floor((Math.random() * 5) + 1);
                if (rrr == 1) {
                    startThatMap(1);
                }
                if (rrr == 2) {
                    startThatMap(2);
                }
                if (rrr == 3) {
                    startThatMap(3);
                }
                if (rrr == 4) {
                    startThatMap(4);
                }
                if (rrr == 5) {
                    startThatMap(6);
                }
            }
        }
        else if (menu == 5) //post game screen
        {
            if (onlineState == 'Connected') {
                if (endGameCounter > 20) {
                    reset = true;
                    ondisconnect();
                }
            }
            else {
                if (boxx == 275) {
                    reset = true;
                } else if (boxx == 508) {
                    rematch = true;
                }
            }
        }
        else if (menu == 9) { //online game mode select (srv vs kill lim)
            if (optionY == 0) { //1v1 quick
                loadingPActivated = true;
                //window.onmousemove = mouseMove;
                connect_to_server('1.1');
                checked[0] = false;

                boxx = 255;
                boxy = 70;
                onlineGameMode = 1;
                onlineGameType = 1;

                onlineState = 'Searching for game';
                menu = 11;
            } else if (optionY == 1) { //kill lim
                onlineGameMode = 1;
                menu = 10;
                optionY = 0;
            } else if (optionY == 2) { //surv
                survival = true;
                onlineGameMode = 2;
                menu = 10;
                optionY = 0;
            }
        }
        else if (menu == 10) { //online game type select ffa tdm
            loadingPActivated = true;
            checked[0] = false;

            boxx = 255;
            boxy = 70;

            onlineState = 'Searching for game';
            menu = 11;
            if (optionY == 0) { //1v1 quick
                //window.onmousemove = mouseMove;
                connect_to_server('1.1');
                onlineGameType = 1;
            } else if (optionY == 1) { //FFA
                connect_to_server(onlineGameMode + '.2');
                onlineGameType = 2;
                teams = false;
            } else if (optionY == 2) { //TDM
                connect_to_server(onlineGameMode + '.3');
                onlineGameType = 3;
                teams = true;
            }

        }
    }
}
//end key pressed

window.addEventListener('keyup', this.keyReleased, false);

function keyReleased(e) {
    var upKey = e.keyCode;

    //send input to server if online
    if (onlineState == "Connected" && menu != 3) {
        //console.log("Sending message to server!! : " + upKey);

        //Send the packet of information to the server.
        //The input packets are labelled with an 'i' in front.
        var server_packet = 'i.';
        server_packet += this.local_time.toFixed(3) + '.';
        //identify key up or down
        server_packet += 'u.';
        server_packet += upKey;

        //Go
        this.socket.send(server_packet);
    }

    if (loadingPActivated) {
        if (upKey == 39) {
            pop.right = false;
        }
        if (upKey == 37) {
            pop.left = false;
        }
    }

    //player 0-Red
    if (upKey == 39) {
        if (cpu[0] == false) {
            right[0] = false;
        }
    }
    if (upKey == 37) {
        if (cpu[0] == false) {
            left[0] = false;
        }
    }
    if (upKey == 39) {
        if (cpu[0] == false) {
            jetpack[0] = false;
        }
    }
    if (upKey == 40) {
        if (play == true && cpu[0] == false) {
            down[0] = false;
            if (gun[0][equip[0]] > 0 && onlineState == 'Offline') {
                if (ammo[0][equip[0]] < maxAmmo[gun[0][equip[0]] - 1] && swap[0] == true && clips[0][equip[0]] > 0 && gun[0][equip[0]] > 0 && reload[0] == false && swapCount[0] < 15 && ((streak[0] < 10 && custom == true) || zombie == true)) {
                    reload[0] = true;
                    shooting[0] = false;
                    swap[0] = false;
                    reloadCount[0] = 0;
                    if (swords == false) clips[0][equip[0]]--;
                    //ammo[0][equip[0]] = 0;
                }
            }

            swap[0] = false;
            swapCount[0] = 0;
        }
    }
    if (upKey == 222 || upKey == 32) {
        if (cpu[0] == false) {
            shooting[0] = false;
        }
    }

    //player 1-Blue
    //right
    if (upKey == 68) {
        if (cpu[1] == false) {
            right[1] = false;
        }
    }
    //left
    if (upKey == 65) {
        if (cpu[1] == false) {
            left[1] = false;
        }
    }
    //up
    if (upKey == 87) {
        if (cpu[1] == false) {
            jetpack[1] = false;
        }
    }
    //down
    if (upKey == 83) {
        if (play == true && cpu[1] == false) {
            down[1] = false;
            if (gun[1][equip[1]] > 0) {
                if (ammo[1][equip[1]] < maxAmmo[gun[1][equip[1]] - 1] && swap[1] == true && clips[1][equip[1]] > 0 && gun[1][equip[1]] > 0 && reload[1] == false && swapCount[1] < 15 && streak[1] < 10) {
                    reload[1] = true;
                    shooting[1] = false;
                    swap[1] = false;
                    reloadCount[1] = 0;
                    if (swords == false) clips[1][equip[1]]--;
                    //ammo[1][equip[1]] = 0;
                }
            }

            swap[1] = false;
            swapCount[1] = 0;
        }
    }
    //shoot
    if (upKey == 70 || upKey == 49) {
        if (cpu[1] == false) {
            shooting[1] = false;
        }
    }

    //player 2-Black
    //right
    if (upKey == 54) {
        if (cpu[2] == false) {
            right[2] = false;
        }
    }
    //left
    if (upKey == 52) {
        if (cpu[2] == false) {
            left[2] = false;
        }
    }
    //up
    if (upKey == 56) {
        if (cpu[2] == false) {
            jetpack[2] = false;
        }
    }
    //down
    if (upKey == 53) {

        if (play == true && cpu[2] == false) {
            down[2] = false;
            if (gun[2][equip[2]] > 0) {
                if (ammo[2][equip[2]] < maxAmmo[gun[2][equip[2]] - 1] && swap[2] == true && clips[2][equip[2]] > 0 && gun[2][equip[2]] > 0 && reload[2] == false && swapCount[2] < 15 && streak[2] < 10) {
                    reload[2] = true;
                    shooting[2] = false;
                    swap[2] = false;
                    reloadCount[2] = 0;
                    if (swords == false) clips[2][equip[2]]--;
                    //ammo[1][equip[1]] = 0;
                }
            }

            swap[2] = false;
            swapCount[2] = 0;
        }
    }
    //shoot
    if (upKey == 107) {
        if (cpu[2] == false) {
            shooting[2] = false;
        }
    }

    //player 3-Yellow
    //right
    if (upKey == 75) {
        if (cpu[3] == false) {
            right[3] = false;
        }
    }
    //left
    if (upKey == 72) {
        if (cpu[3] == false) {
            left[3] = false;
        }
    }
    //up
    if (upKey == 85) {
        if (cpu[3] == false) {
            jetpack[3] = false;
        }
    }
    //down
    if (upKey == 74) {
        if (play == true && cpu[3] == false) {
            down[3] = false;

            if (gun[3][equip[3]] > 0) {
                if (ammo[3][equip[3]] < maxAmmo[gun[3][equip[3]] - 1] && swap[3] == true && clips[3][equip[3]] > 0 && gun[3][equip[3]] > 0 && reload[3] == false && swapCount[3] < 15 && streak[3] < 10) {
                    reload[3] = true;
                    shooting[3] = false;
                    swap[3] = false;
                    reloadCount[3] = 0;
                    if (swords == false) clips[3][equip[3]]--;
                    //ammo[1][equip[1]] = 0;
                }
            }

            swap[3] = false;
            swapCount[3] = 0;
        }
    }
    //shoot
    if (upKey == 76) {
        if (cpu[3] == false) {
            shooting[3] = false;
        }
    }
}
//end key released

function startThatMap(mapNum) {
    loadingPActivated = false;
    //window.onmousemove = null;
    level = mapNum;
    loadMap();
    menu = 3;
}

//MOUSE YO
//window.addEventListener('mousemove', this.mouseMove, false);

var lastMouseY = 0;

//mouse helper method
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function mouseMove(event) {
    console.log("Mouse moved!");
    var mousePos = getMousePos(canvas, event);
    mouseX = mousePos.x/scale;
    mouseY = mousePos.y/scale;

    if (loadingPActivated) { //move loading poppums

        if (lastMouseY > mouseY && pop.jump == false) {
            pop.jump = true;
            pop.yDir = -jumpSpeed;
        }
    }

    lastMouseY = mouseY;
}