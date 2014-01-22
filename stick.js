/*
 * STICK BATTLE by Paul H.
 * Ported painstakingly by Rhys h. lol
 * fun!

 */
var canvas;
var gameWidth;
var gameHeight;
var scale = 1.08571428571;//fb default: 1.08571428571

var classicWidth = 700;
var classicHeight = 450;

var fps = 25;

var then;

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

var boxx=420;
var boxy=140;

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

var jumpSpeed = 600;//was -15
var playerSpeed = 320; //it was 8 at fps = 25(40)
var zombieSpeed = 240; //it was 6 at fps = 25(40)
var playerFallSpeed = 40; // was 1
var playerLungeSpeed = 600; // was 15

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
var killLimit = 25;
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
var clips =[];
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
var swords = true;
var survival = false;
var lives = [];
var tempLives = 0;


//ai
var cpu = [];
var targetx = [];
var targety = [];
var upPath = [];
var zombieAlive = 1;

//Images
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
for (i = 0; i < 4; i++) {
    playerLm[i] = [];
    playerRm[i] = [];
}

var zombieR;
var zombieL;
var zombieLm = []; //2
var zombieRm = [];

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
var endgameZombie;

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

function init() {

    canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    gameWidth = classicWidth * scale;
    gameHeight = classicHeight * scale;
    canvas.width = gameWidth;
    canvas.height = gameHeight;

    document.body.appendChild(canvas);

    for (i = 0; i <= 3; i++) {
        healthpacky[i] = -20;
    }
    //Images
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



    //explosion
    ex2 = new Image();
    ex2.src = (("images/ex2.png"));

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
    //move right
    playerRm[0][0] = new Image();
    playerRm[0][0].src = (("images/Player0RightRun1.png"));
    playerRm[0][1] = new Image();
    playerRm[0][1].src = (("images/Player0RightRun2.png"));
    playerRm[1][0] = new Image();
    playerRm[1][0].src = (("images/Player1RightRun1.png"));
    playerRm[1][1] = new Image();
    playerRm[1][1].src = (("images/Player1RightRun2.png"));
    playerRm[2][0] = new Image();
    playerRm[2][0].src = (("images/Player2RightRun1.png"));
    playerRm[2][1] = new Image();
    playerRm[2][1].src = (("images/Player2RightRun2.png"));
    playerRm[3][0] = new Image();
    playerRm[3][0].src = (("images/Player3RightRun1.png"));
    playerRm[3][1] = new Image();
    playerRm[3][1].src = (("images/Player3RightRun2.png"));
    //move left
    playerLm[0][0] = new Image();
    playerLm[0][0].src = (("images/Player0LeftRun1.png"));
    playerLm[0][1] = new Image();
    playerLm[0][1].src = (("images/Player0LeftRun2.png"));
    playerLm[1][0] = new Image();
    playerLm[1][0].src = (("images/Player1LeftRun1.png"));
    playerLm[1][1] = new Image();
    playerLm[1][1].src = (("images/Player1LeftRun2.png"));
    playerLm[2][0] = new Image();
    playerLm[2][0].src = (("images/Player2LeftRun1.png"));
    playerLm[2][1] = new Image();
    playerLm[2][1].src = (("images/Player2LeftRun2.png"));
    playerLm[3][0] = new Image();
    playerLm[3][0].src = (("images/Player3LeftRun1.png"));
    playerLm[3][1] = new Image();
    playerLm[3][1].src = (("images/Player3LeftRun2.png"));

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
    menuImage[1].src = (("images/SelectPlayers.png"));
    menuImage[2] = new Image();
    menuImage[2].src = (("images/SelectMap.png"));
    menuImage[6] = new Image();
    menuImage[6].src = (("images/SelectMode.png"));
    menuImage[7] = new Image();
    menuImage[7].src = (("images/SelectModeMulti.png"));
    menuImage[8] = new Image();
    menuImage[8].src = (("images/Mode.png"));

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
    dogLm[1] .src = (("images/DogLm1.png"));
    dogR = new Image();
    dogR.src = (("images/DogR.png"));
    dogL = new Image();
    dogL.src = (("images/DogL.png"));

    //max ammo
    maxAmmo[0] = 10;
    maxAmmo[1] = 12;
    maxAmmo[2] = 20;
    maxAmmo[3] = 4;
    maxAmmo[4] = 60;
    maxAmmo[5] = 5;
    maxAmmo[6] = 4;
    maxAmmo[7] = 6;

    resetGame();

    then = Date.now();
    map[1].onload = function () {
        startGameLoop();//context
        //setTimeout(function () { startGameLoop(context) }, 1000);
    };
    
}

function resetGame() {
    for (i = 0; i <= 3; i++) {
        checked[i] = false;
        deadCount[i] = 100;
    }

    play = false;
    startCount = 0;
    zombieAlive = 1;
    for (i = 0; i <= 24; i++) {
        for (k = 0; k <= 999; k++) {
            if (k <= 99)
                b[i][k] = false;
            blood[i][k] = false;
        }
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
        cpu[i] = false;  //ADDED cpu VALUES!!1 WILL CAUSE PROBLEMS?!!? @@@@@@@@@@@@@@@@@@@@@@@
        gun[i][equip[i]] = 1;
        right[i] = false;
        fuelCount[i] = 0;
        fuel[i] = 0;
    }
    //start positionss
    xpos[0] = 670;
    xpos[2] = 230;
    xpos[3] = 450;
    xpos[1] = 10;


    directionFacing[0] = 0;
    directionFacing[3] = 0;
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
        players = 0;
        checkCount = 0;
        level = 0;
        split = false;
        teams = false;
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
        for (i = 0; i < players; i++) {
            if (swords == true) {
                ammo[i][0] = 4;
                ammo[i][1] = 6;
            }
            if (tempLives == 3) lives[i] = 3;
            if (tempLives == 5) lives[i] = 5;
            if (tempLives == 10) lives[i] = 10;
            if (tempLives == 15) lives[i] = 15;

        }
    }
}

function startGameLoop() {//contex
    setInterval(gameLoop, 0); //it was fps - function () { gameLoop(contex); }
}

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
        block[2] = true;
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

        blockx[2] = 400;
        blocky[2] = 150;
        blockw[2] = 100;
        blockh[2] = 20;

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

        blockx[7] = 500;
        blocky[7] = 150;
        blockw[7] = 150;
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

function render() {//ctx
    var ctx = canvas.getContext("2d");

    ctx.clearRect( 0 , 0 , gameWidth , gameHeight);

    //background -> CYAn 
    ctx.fillStyle = "rgba(0, 255, 255 , 1)";
    ctx.fillRect(0, 0, gameWidth, gameHeight);


    //ORIGINAL paint
    if ((menu == 3 || play == true || menu == 5)) {
        if (level == 1) ctx.drawImage(map[0], 0, 0, gameWidth, gameHeight);
        if (level == 4) ctx.drawImage(map[1], 0, 0, gameWidth, gameHeight);

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
                    if (runCount[i] <= 10) {
                        ctx.drawImage(playerLm[i][0], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                    }
                    if (runCount[i] > 10) {
                        ctx.drawImage(playerLm[i][1], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                    }
                } else if (right[i] == true && ydir[i] == 0) {
                    if (runCount[i] <= 10) {
                        ctx.drawImage(playerRm[i][0], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                    }
                    if (runCount[i] > 10) {
                        ctx.drawImage(playerRm[i][1], xpos[i] * scale, ypos[i] * scale, 20 * scale, 20 * scale);
                    }
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
                    ctx.font =("9px Arial");
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
                ctx.font =("10px Arial");
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
            killcount[i]++;
            if (streak[i] >= 2) {
                ctx.fillStyle = "rgb(0, 0, 0)";
                ctx.font =("9px Arial");
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
                    if (gun[i][1] == 7) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunDown[gun[i][1] - 1][0], (xpos[i] - 2) * scale, (ypos[i] + 2) * scale, 20 * scale, 20 * scale);
                        else ctx.drawImage(gunDown[gun[i][1] - 1][1], (xpos[i] + 2) * scale, (ypos[i] + 2) * scale, 20 * scale, 20 * scale);
                    }
                    if (gun[i][1] == 8) {
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
                    if (gun[i][0] == 7) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunDown[gun[i][0] - 1][0], (xpos[i] - 2) * scale, (ypos[i] + 2) * scale, 20 * scale, 20 * scale);
                        else ctx.drawImage(gunDown[gun[i][0] - 1][1], (xpos[i] + 2) * scale, (ypos[i] + 2) * scale, 20 * scale, 20 * scale);
                    }
                    if (gun[i][0] == 8) {
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
                if (gun[i][equip[i]] == 7) {
                    if ([i] != 0 && lunge[i] == false) {
                        if (directionFacing[i] == 1) ctx.drawImage(gunRight[gun[i][equip[i]] - 1], (xpos[i] - 6) * scale, (ypos[i] + 2) * scale, 20 * scale, 20 * scale);
                        else ctx.drawImage(gunLeft[gun[i][equip[i]] - 1], (xpos[i] + 6) * scale, (ypos[i] + 2) * scale, 20 * scale, 20 * scale);
                    } else if (xdir[i] == 0 && directionFacing[i] == 1 && lunge[i] == false) ctx.drawImage(swordStill[1], (xpos[i] + 7) * scale, (ypos[i] - 6) * scale, 20 * scale, 20 * scale);
                    else if (xdir[i] == 0 && directionFacing[i] == 0 && lunge[i] == false) ctx.drawImage(swordStill[0], (xpos[i] - 7) * scale, (ypos[i] - 6) * scale, 20 * scale, 20 * scale);
                    else if (lunge[i] == true && directionFacing[i] == 1) ctx.drawImage(swordSlash[1], (xpos[i] + 10) * scale, (ypos[i] - 2) * scale, 20 * scale, 20 * scale);
                    else if (lunge[i] == true && directionFacing[i] == 0) ctx.drawImage(swordSlash[0], (xpos[i] - 10) * scale, (ypos[i] - 2) * scale, 20 * scale, 20 * scale);
                }
                if (gun[i][equip[i]] == 8) {
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
        ctx.drawImage(am, gunx[0] * scale, guny[0 * scale], 20 * scale, 20 * scale);
        ctx.drawImage(gunRight[1], gunx[1] * scale, guny[1] * scale, 17 * scale, 3 * scale);
        ctx.drawImage(gunRight[2], gunx[2] * scale, guny[2] * scale, 11 * scale, 5 * scale);
        ctx.drawImage(gunRight[3], gunx[3] * scale, guny[3] * scale, 28 * scale, 7 * scale);
        ctx.drawImage(gunRight[4], gunx[4] * scale, guny[4] * scale, 28 * scale, 7 * scale);
        ctx.drawImage(gunRight[5], gunx[5] * scale, guny[5] * scale, 17 * scale, 3 * scale);
        ctx.drawImage(gunRight[6], gunx[6] * scale, guny[6] * scale, 20 * scale, 20 * scale);
        ctx.drawImage(redSwordStill[1], gunx[7] * scale, guny[7] * scale, 20 * scale, 20 * scale);



        //ground  (don't need once maps are drawn)
        ctx.fillStyle = "rgba(0, 250, 0 , 1)";
        if (level != 1 && level != 4) ctx.fillRect(0, 430 * scale, 1400 * scale, 20 * scale);

        //blocks
        for (i = 0; i <= 14; i++) {
            if (block[i] == true && level != 1) {
                ctx.fillStyle = "rgba(0, 0, 0 , 1)";
                if (level == 4) ctx.drawImage(blockImage[3], blockx[i] * scale, blocky[i] * scale, blockw[i] * scale, blockh[i] * scale);
                else ctx.fillRect(blockx[i] * scale, blocky[i] * scale, blockw[i] * scale, blockh[i] * scale);
            }
        }
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
            ctx.font =("14px Arial");
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
                        ctx.fillText("Kills", 622, 20);
                        ctx.fillText("Fire and Water: " + teamkills[0], 560 * scale, 40 * scale);
                        ctx.fillText("Lightning Slaves: " + teamkills[1], 560 * scale, 60 * scale);
                    }
                }
            } else if (zombie == true) {
                ctx.font =("20px Arial");
                ctx.fillText("Level: " + zombieAlive, 610 * scale, 20 * scale);
                ctx.fillText("Kills: " + kills[0], 620 * scale, 50 * scale);
            }
        }

    }
        //END ORIGINAL paint

        //menus
        //main menu
    else if (menu == 0) {
        ctx.drawImage(menuImage[0], 0, 0, gameWidth, gameHeight);
        //ctx.drawImage(check[1], 0, 0, 30, 30);
    }
        //player select for custom game
    else if (menu == 1) {
        ctx.drawImage(menuImage[1], 0, 0, 700 * scale, 450 * scale);
        if (boxx == 368 && boxy == 400 && checked[0] == true && checked[1] == true && checked[2] == true && checked[3] == true && ((checkedx[2] < 579 && checkedx[3] < 579) || (checkedx[2] == 579 && checkedx[3] == 579) || (checkedx[2] < 579 && checkedx[3] == 579))) {
            ctx.drawImage(check[1], boxx * scale, boxy * scale, 30 * scale, 30 * scale);
        } else if (boxx == 368 && boxy == 400) {
            ctx.drawImage(X, boxx * scale, (boxy + 5) * scale, 30 * scale, 30 * scale);
        } else ctx.drawImage(check[0], boxx * scale, boxy * scale, 30 * scale, 30 * scale);
        for (i = 0; i <= 3; i++) {
            if (checked[i] == true) {
                ctx.drawImage(check[1], checkedx[i] * scale, checkedy[i] * scale, 30 * scale, 30 * scale);
            }
        }
    }
        //select multiplayer settings
    else if (menu == 7) {
        ctx.drawImage(menuImage[7], 0, 0, gameWidth, gameHeight);
        if (boxx == 368 && boxy == 400 && checked[0] == true && checked[1] == true) {
            ctx.drawImage(check[1], boxx * scale, boxy * scale, 30 * scale, 30 * scale);
        } else if (boxx == 368 && boxy == 400) {
            ctx.drawImage(X, boxx * scale, (boxy + 5) * scale, 30 * scale, 30 * scale);
        } else ctx.drawImage(check[0], boxx * scale, boxy * scale, 30 * scale, 30 * scale);

        if (checked[0] == true) ctx.drawImage(check[1], checkedx[0] * scale, checkedy[0] * scale, 30 * scale, 30 * scale);
        if (checked[1] == true) ctx.drawImage(check[1], checkedx[1] * scale, checkedy[1] * scale, 30 * scale, 30 * scale);
    }
        //select multiplayer mode
    else if (menu == 8) {
        ctx.drawImage(menuImage[8], 0, 0, gameWidth, gameHeight);
        if (boxx == 368 && boxy == 400 && checked[0] == true) {
            ctx.drawImage(check[1], boxx * scale, boxy * scale, 30 * scale, 30 * scale);
        } else if (boxx == 368 && boxy == 400) {
            ctx.drawImage(X, boxx * scale, (boxy + 5) * scale, 30 * scale, 30 * scale);
        } else ctx.drawImage(check[0], boxx * scale, boxy * scale, 30 * scale, 30 * scale);
        if (checked[0] == true) {
            ctx.drawImage(check[1], checkedx[0] * scale, checkedy[0] * scale, 30 * scale, 30 * scale);
        }
    }
        //select game mode  zombie or custom
    else if (menu == 6) {
        ctx.drawImage(menuImage[6], 0, 0, gameWidth, gameHeight);

        if (boxx == 368 && boxy == 400 && checked[0] == true) {
            ctx.drawImage(check[1], boxx * scale, boxy * scale, 30 * scale, 30 * scale);
        } else if (boxx == 368 && boxy == 400) {
            ctx.drawImage(X, boxx * scale, (boxy + 5) * scale, 30 * scale, 30 * scale);
        } else ctx.drawImage(check[0], boxx * scale, boxy * scale, 30 * scale, 30 * scale);

        if (checked[0] == true) {
            ctx.drawImage(check[1], checkedx[0] * scale, checkedy[0] * scale, 30, 30);//30 * scale, 30 * scale);
        }
    }
        //choose map
    else if (menu == 2) {
        ctx.drawImage(menuImage[2], 0, 0, gameWidth, gameHeight);
        ctx.fillStyle = "rgba(250, 250, 250 , 1)";
        //ctx.drawRect(boxx * scale, boxy * scale, 177 * scale, 106 * scale);//drawRectv
        ctx.beginPath();
        ctx.rect(boxx * scale, boxy * scale, 177 * scale, 106 * scale);
        ctx.stroke();
        //ctx.drawRect((boxx + 1) * scale, (boxy + 1) * scale, 175 * scale, 104 * scale);//drawRect
        ctx.beginPath();
        ctx.rect((boxx + 1) * scale, (boxy + 1) * scale, 175 * scale, 104 * scale);
        ctx.stroke();

    }
    //countdown at begin match
    if (menu == 3) {
        var numgameHeight = 50;

        var numgameScale = 105 - ((startCount % 36) * 3);

        if (startCount <= 35) ctx.drawImage(numbers[2], (classicWidth/2 - (numgameScale / 2)) * scale, (numgameHeight - (numgameScale / 2)) * scale, numgameScale * scale, numgameScale * scale);
        if (startCount > 35 && startCount <= 70) ctx.drawImage(numbers[1], (classicWidth / 2 - (numgameScale / 2)) * scale, (numgameHeight - (numgameScale / 2)) * scale, numgameScale * scale, numgameScale * scale);
        if (startCount > 70 && startCount <= 105) ctx.drawImage(numbers[0], (classicWidth / 2 - (numgameScale / 2)) * scale, (numgameHeight - (numgameScale / 2)) * scale, numgameScale * scale, numgameScale * scale);
    }
    //endgame menu
    if (menu == 5) {
        if (custom == true) {
            ctx.drawImage(endgame, 100 * scale, 20 * scale, 500 * scale, 400 * scale);
            ctx.font = "30px Arial";
            ctx.fillStyle = "rgb(211, 211, 211)"; //light gray
            if (teams == false) ctx.fillText(winner + " wins!", 280 * scale, 60 * scale);
            else if (teams == true) ctx.fillText(winner + " wins!", 200 * scale, 60 * scale);
            ctx.font = "20px Arial";
            for (i = 0; i < players; i++) {
                ctx.fillText("Kills         Deaths         Accuracy", 220 * scale, 110 * scale);
                if (i == 0) {
                    round = Math.round((shotsHit[i] / shotsFired[i]) * 100);
                    ctx.fillText("Red -", 150 * scale, 150 * scale);
                    ctx.fillText(kills[i] + "", 235 * scale, 150 * scale);
                    ctx.fillText(deaths[i] + "", 340 * scale, 150 * scale);
                    ctx.fillText(round + "%", 460 * scale, 150 * scale);

                }
                if (i == 1) {
                    round = Math.round((shotsHit[i] / shotsFired[i]) * 100);
                    ctx.fillText("Blue -", 150 * scale, 200 * scale);
                    ctx.fillText(kills[i] + "", 235 * scale, 200 * scale);
                    ctx.fillText(deaths[i] + "", 340 * scale, 200 * scale);
                    ctx.fillText(round + "%", 460 * scale, 200 * scale);
                }
                if (i == 2) {
                    round = Math.round((shotsHit[i] / shotsFired[i]) * 100);
                    ctx.fillText("Black -", 150 * scale, 250 * scale);
                    ctx.fillText(kills[i] + "", 235 * scale, 250 * scale);
                    ctx.fillText(deaths[i] + "", 340 * scale, 250 * scale);
                    ctx.fillText(round + "%", 460 * scale, 250 * scale);
                }
                if (i == 3) {
                    round = Math.round((shotsHit[i] / shotsFired[i]) * 100);
                    ctx.fillText("Yellow -", 150 * scale, 300 * scale);
                    ctx.fillText(kills[i] + "", 235 * scale, 300 * scale);
                    ctx.fillText(deaths[i] + "", 340 * scale, 300 * scale);
                    ctx.fillText(round + "%", 460 * scale, 300 * scale);
                }
            }
        } else if (zombie == true) {
            ctx.drawImage(endgameZombie, 100 * scale, 20 * scale, 500 * scale, 400 * scale);
            ctx.font =("120px Arial");
            ctx.fillStyle = "rgb(211, 211, 211)"; //light gray

            if (kills[0] < 10) ctx.fillText(kills[0] + "", 320 * scale, 260 * scale);
            else ctx.fillText(kills[0] + "", 280 * scale, 260 * scale);
        }
        ctx.drawImage(check[1], boxx * scale, boxy * scale, 30 * scale, 30 * scale);

    }
    //ctx.font =(font);
    ctx.fillText(actual + "", 5 * scale, 10 * scale);
}

function gameLoop() {//conte
   
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;


    //it was 40 fps and 8 movement = 320 pixel movement/s
    //changing player movement speeds a lot to compensate for max fps
    //update(delta/1000000);//(delta / 1000)
    //render();

    //then = now;
}

function update(modifier) {

    //reset/rematch
    if (reset == true || rematch == true) {
        resetGame();
        reset = false;
        rematch = false;
    }

    //countdown
    if (menu == 3) {
        startCount++;
        if (startCount > 105) {
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
                for (i = 0; i <= 9; i++) {
                    gunx[i] = -1000;
                    guny[i] = 3000;
                }
            }
            if (zombie == true) {
                players = 25;
                for (i = 1; i <= players; i++) {
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
                            dogxdi[i] = 0;

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
                if (zombie == true) u = 1;// IT WAS 1
                else if (custom == true) u = players;
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

        //jetpack
        for (i = 0; i < players; i++) {
            if (streak[i] >= 3 && ydir[i] != 0 && jetpack[i] == true) {
                if (fuel[i] > 0) {
                    fuel[i]--;
                    if (ydir[i] >= -7) {
                        ydir[i] = ydir[i] - 3;
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
                    if (level == 4 && block[k] == true && xpos[i] + 10 >= blockx[k] && xpos[i] <= blockx[k] + blockw[k] && ypos[i] + 20 <= blocky[k] + ydir[i] && ypos[i] + 20 >= blocky[k]) {
                        if (blocky[k] < 410) {
                            blocky[k]++;
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
                        blocky[k]--;
                    } else if (k == 1 && blocky[k] > 280) {
                        blocky[k]--;
                    }
                }
            }
        }


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
            //health packs
            if (healthpack[i] == true) {
                if (healthpacky[i] < 410) healthpacky[i] = healthpacky[i] + 2;
                if (ypos[i] > 0 && streak[i] >= 2) healthpackx[i] = xpos[i];
            } else {
                healthpacky[i] = -20;
            }
        }
        //shooting
        for (i = 0; i < players; i++) {
            shootCount[i]++;
            if (shooting[i] == true) {
                
                //pistol
                if (gun[i][equip[i]] == 1) {
                    if (shootCount[i] >= 12 && ammo[i][equip[i]] > 0) {
                        for (k = 0; k <= 99; k++) {
                            if (b[i][k] == false) {
                                shotsFired[i]++;
                                b[i][k] = true;
                                if (directionFacing[i] == 1) {
                                    bxdir[i][k] = 400;//was 10
                                    bydir[i][k] = 0;
                                    bx[i][k] = xpos[i];
                                    by[i][k] = ypos[i] + 4;
                                    if (streak[i] < 10 || zombie == true) ammo[i][equip[i]]--;
                                    shootCount[i] = 0;
                                    shotType[i][k] = 1;
                                    k = 100;
                                } else if (directionFacing[i] == 0) {
                                    bxdir[i][k] = -400;//-10
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
                                    bxdir[i][k] = 560;//was 14
                                    bydir[i][k] = 0;
                                    bx[i][k] = xpos[i];
                                    by[i][k] = ypos[i] + 4;
                                    if (streak[i] < 10 || zombie == true) ammo[i][equip[i]]--;
                                    shootCount[i] = 0;
                                    shotType[i][k] = 2;
                                    k = 100;
                                } else if (directionFacing[i] == 0) {
                                    bxdir[i][k] = -560;//-14
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
                                    bxdir[i][k] = 560; // was 14
                                    bydir[i][k] = 0;
                                    bx[i][k] = xpos[i];
                                    by[i][k] = ypos[i] + 4;
                                    if (streak[i] < 10 || zombie == true) ammo[i][equip[i]]--;
                                    shootCount[i] = 0;
                                    shotType[i][k] = 3;
                                    k = 100;
                                } else if (directionFacing[i] == 0) {
                                    bxdir[i][k] = -560;//was -14
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
                                    bxdir[i][k] = 800;//was 20
                                    bydir[i][k] = 0;
                                    bx[i][k] = xpos[i];
                                    by[i][k] = ypos[i] + 4;
                                    if (streak[i] < 10 || zombie == true) ammo[i][equip[i]]--;
                                    shotType[i][k] = 4;
                                    shootCount[i] = 0;
                                    k = 100;
                                } else if (directionFacing[i] == 0) {
                                    bxdir[i][k] = -800;//was -20
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
                                    bxdir[i][k] = 440; // was 11
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
                                    bxdir[i][k] = -440;// was -11
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
                                        bxdir[i][k + r] = 600;//was 15
                                        bydir[i][k + r] = -80 + (r*40);//-2
                                        bx[i][k + r] = xpos[i];
                                        by[i][k + r] = ypos[i] + 4;
                                        shotType[i][k + r] = 6;
                                        shootCount[i] = 0;
                                    } else if (directionFacing[i] == 0) {
                                        //shotgunDis[i][k+r] =xpos[i]-200;
                                        shotgunDis[i][k + r] = xpos[i] - 140;
                                        bxdir[i][k + r] = -600;//was 15
                                        bydir[i][k + r] = -80 + (r*40);//-2
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
        //sword lunge
        for (i = 0; i < players; i++) {
            if ((gun[i][equip[i]] != 7 && gun[i][equip[i]] != 8) && ((i <= 3 && custom == true) || (i == 0 && zombie == true))) {
                lunge[i] = false;
                lungeCount[i] = 0;
            }
            if (lunge[i] == true && (gun[i][equip[i]] == 7 || gun[i][equip[i]] == 8) && ((i <= 3 && custom == true) || (i == 0 && zombie == true))) {
                lungeCount[i]++;
                if (lungeCount[i] >= 10) {
                    lungeCount[i] = 0;
                    lunge[i] = false;
                }
            }
            if (lunge[i] == true && gun[i][equip[i]] == 8) {
                if (directionFacing[i] == 1 && lungeCount[i] == 1) {
                    xpos[i] = xpos[i] + 50;
                } else if (directionFacing[i] == 0 && lungeCount[i] == 1) {
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
                                        bloodxdir[t][r] = -1 + (Math.random() * 7);
                                    else
                                        bloodxdir[t][r] = -5 + (Math.random() * 7);
                                    bloodydir[t][r] = 2 - (Math.random() * 5);
                                    bloodCount[t][r] = 0;
                                }
                            } else if ((q + num) > 999) {
                                for (r = q; r <= 999; r++) {
                                    blood[t][r] = true;
                                    bloodx[t][r] = xpos[t] + (Math.random() * 20);
                                    bloody[t][r] = ypos[t] + (Math.random() * 10);
                                    if (xdir[t] > 0)
                                        bloodxdir[t][r] = -1 + (Math.random() * 7);
                                    else
                                        bloodxdir[t][r] = -5 + (Math.random() * 7);
                                    bloodydir[t][r] = 2 - (Math.random() * 5);
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
                            else if (gun[i][equip[i]] == 8 && jump[i] == false && stun[t] == false)
                                health[t] = health[t] - 10;
                        } else {
                            if (gun[i][equip[i]] == 7)
                                health[t] = health[t] - 7;
                            else if (gun[i][equip[i]] == 8 && jump[i] == false && stun[t] == false)
                                health[t] = health[t] - 7;
                        }
                        if (gun[i][equip[i]] == 8 && jump[i] == false && stun[t] == false) {
                            //jump[i] = true;
                            stun[t] = true;
                            xpos[i] = xpos[t];
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
                            if (kills[0] >= 3 && kills[0] % 3 == 0 && zombieAlive <= 23) {
                                zombieAlive++;
                                ypos[zombieAlive] = -20;
                                ydir[zombieAlive] = 0;
                                deadCount[zombieAlive] = 0;
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
                            bloodx[i][k] = bloodx[i][k] + bloodxdir[i][k];
                            bloody[i][k] = bloody[i][k] + bloodydir[i][k];
                            if (bloodydir[i][k] < 10) bloodydir[i][k]++;
                        }
                    }
                    bloodCount[i][k]++;
                    if (bloodCount[i][k] >= 700) {
                        blood[i][k] = false;
                    }
                }
            }
        }
        //zombie hits player
        if (zombie == true) {
            for (i = 1; i <= 24; i++) {
                if (xpos[i] + 20 >= xpos[0] && xpos[i] <= xpos[0] + 20 && ypos[i] + 20 >= ypos[0] && ypos[i] <= ypos[0] + 20 && ypos[i] > 0) {
                    for (q = 0; q <= 999; q++) {
                        if (blood[0][q] == false) {
                            num = (Math.random() * 15 + 5);
                            if ((q + num) <= 999) {
                                for (r = q; r <= q + num; r++) {
                                    blood[0][r] = true;
                                    bloodx[0][r] = xpos[0] + (Math.random() * 20);
                                    bloody[0][r] = ypos[0] + (Math.random() * 10);
                                    if (xdir[i] > 0) bloodxdir[0][r] = -1 + (Math.random() * 7);
                                    else bloodxdir[0][r] = -5 + (Math.random() * 7);
                                    bloodydir[0][r] = 2 - (Math.random() * 5);
                                    bloodCount[0][r] = 0;
                                }
                            } else if ((q + num) > 999) {
                                for (r = q; r <= 999; r++) {
                                    blood[0][r] = true;
                                    bloodx[0][r] = xpos[0] + (Math.random() * 20);
                                    bloody[0][r] = ypos[0] + (Math.random() * 10);
                                    if (xdir[i] > 0) bloodxdir[0][r] = -1 + (Math.random() * 7);
                                    else bloodxdir[0][r] = -5 + (Math.random() * 7);
                                    bloodydir[0][r] = 2 - (Math.random() * 5);
                                    bloodCount[0][r] = 0;
                                }
                            }
                            q = 1000;
                        }
                    }
                    random = (Math.random() * 5);
                    if (random > 1 && random < 3) {
                        health[0] = health[0] - 1;
                    }

                }
            }
        }
        //hits player bullets
        for (i = 0; i < players; i++) {
            for (t = 0; t < players; t++) {
                for (k = 0; k <= 99; k++) {
                    if (b[i][k] == true && bx[i][k] >= xpos[t] - 5 && bx[i][k] <= xpos[t] + 25 && by[i][k] >= ypos[t] && by[i][k] <= ypos[t] + 20 && i != t && ypos[t] > 0 &&((team[i] != team[t]) || teams == false)) {
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
                                            if (bxdir[i][k] > 0) bloodxdir[t][r] = -1 + (Math.random() * 7);
                                            else bloodxdir[t][r] = -5 + (Math.random() * 7);
                                            bloodydir[t][r] = 2 - (Math.random() * 5);
                                            bloodCount[t][r] = 0;
                                        }
                                    } else if ((q + num) > 999) {
                                        for (r = q; r <= 999; r++) {
                                            blood[t][r] = true;
                                            bloodx[t][r] = xpos[t] + (Math.random() * 20);
                                            bloody[t][r] = ypos[t] + (Math.random() * 10);
                                            if (bxdir[i][k] > 0) bloodxdir[t][r] = -1 + (Math.random() * 7);
                                            else bloodxdir[t][r] = -5 + (Math.random() * 7);
                                            bloodydir[t][r] = 2 - (Math.random() * 5);
                                            bloodCount[t][r] = 0;
                                        }
                                    }
                                    q = 1000;
                                }
                            }
                            //Hello whoever is reading this! - Rhys porting to javascript
                            if (shotType[i][k] != 5) {
                                b[i][k] = false;
                            } else if (shotType[i][k] == 5) {
                                shotsFired[i]++;
                            }
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
                                if (k % 2 == 0) health[t] = health[t] - 1;
                            }
                            if (shotType[i][k] == 6) {
                                health[t] = health[t] - 4;
                            }
                            //die
                            if (health[t] <= 0) {
                                //zombie explosion
                                if (zombie == true && t > 0) {
                                    health[t] = 10;
                                    if (kills[0] >= 3 && kills[0] % 3 == 0 && zombieAlive <= 23) {
                                        zombieAlive++;
                                        ypos[zombieAlive] = -20;
                                        ydir[zombieAlive] = 0;
                                        deadCount[zombieAlive] = 0;
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
                                                    if (bxdir[i][k] > 0) bloodxdir[t][r] = -5 + (Math.random() * 10);
                                                    else bloodxdir[t][r] = -5 + (Math.random() * 10);
                                                    bloodydir[t][r] = 5 - (Math.random() * 20);
                                                    bloodCount[t][r] = 0;
                                                }
                                            } else if ((q + num) > 999) {
                                                for (r = q; r <= 999; r++) {
                                                    blood[t][r] = true;
                                                    bloodx[t][r] = xpos[t] - 20 + (Math.random() * 60);
                                                    bloody[t][r] = ypos[t] + (Math.random() * 20);
                                                    if (bxdir[i][k] > 0) bloodxdir[t][r] = -5 + (Math.random() * 10);
                                                    else bloodxdir[t][r] = -5 + (Math.random() * 10);
                                                    bloodydir[t][r] = 5 - (Math.random() * 20);
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
        //lose in zombie mode
        if (zombie == true && health[0] <= 0) {

            play = false;
            menu = 5;
            boxx = 275;
            boxy = 345;

        }
        //dead counter
        for (i = 0; i < players; i++) {
            deadCount[i]++;
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
        //reload
        pleaseReload++;
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
                reloadCount[i]++;
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
                downCount[i]++;
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
        //falling weapons
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
        //falling weapons
        for (i = 0; i <= 9; i++) {
            //guns falling
            for (q = 0; q <= 14; q++) {
                if ((block[q] == true && gunx[i] + 10 >= blockx[q] && gunx[i] <= blockx[q] + blockw[q] && guny[i] + 20 <= blocky[q] + blockh[q] && guny[i] + 20 >= blocky[q]) || guny[i] >= 410) {
                    q = 15;
                } else if (q == 14) guny[i] = guny[i] + (2 * modifier);
            }
        }

        //swap weapons
        for (i = 0; i < players; i++) {
            if (swap[i] == true) {
                swapCount[i]++;
                if (swapCount[i] == 15) {
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
                }
            }
        }
        //running counter
        for (i = 0; i < players; i++) {
            runCount[i]++;
            if (runCount[i] >= 20) {
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
            //global collision
            for (k = 0; k <= 14; k++) {
                if (block[k] == true && xpos[i] + 20 >= blockx[k] && xpos[i] <= blockx[k] + blockw[k] && ypos[i] + 20 <= blocky[k] + ydir[i] && ypos[i] + 20 >= blocky[k]) {
                    ground[i] = blocky[k];
                    k = 15;
                } else if (k == 14) {
                    ground[i] = 430;
                }
            }
            for (k = 0; k <= 14; k++) {
                if (dog[i] == true && block[k] == true && dogxpos[i] + 10 >= blockx[k] && dogxpos[i] <= blockx[k] + blockw[k] && dogypos[i] + 20 <= blocky[k] + dogydir[i] && dogypos[i] + 20 >= blocky[k]) {
                    dogground[i] = blocky[k];
                    k = 15;
                } else if (k == 14 && dog[i] == true) {
                    dogground[i] = 430;
                }
            }

            fuelCount[i]++;

            //y movement
            ydir[i] = ydir[i] + playerFallSpeed;
            if (ypos[i] + 20 >= ground[i] && ydir[i] > 0) {
                ydir[i] = 0;
                ypos[i] = ground[i] - 20;
                if (streak[i] >= 3 && streak[i] < 6 && fuel[i] < 20 && fuelCount[i] >= 2) {
                    fuel[i]++;
                    fuelCount[i] = 0;
                }
                if (streak[i] >= 6 && fuel[i] < 40 && fuelCount[i] >= 2) {
                    fuel[i]++;
                    fuelCount[i] = 0;
                }

            }

            //x movement
            if (right[i] == true) {
                xdir[i] = playerSpeed;
                if (zombie == true && i > 0) xdir[i] = zombieSpeed;
                directionFacing[i] = 1;
            } else if (left[i] == true) {
                xdir[i] = -playerSpeed;
                if (zombie == true && i > 0) xdir[i] = -zombieSpeed;
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
                dogydir[i] = dogydir[i] + playerFallSpeed;
                if (dogypos[i] + 20 >= dogground[i] && dogydir[i] > 0) {
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
                stunCount[i]++;
                xdir[i] = 0;
                ydir[i] = 0;
                shooting[i] = false;
                if (stunCount[i] >= 10) {
                    stun[i] = false;
                    stunCount[i] = 0;
                }
            }
            if (jump[i] == true) {
                jumpCount[i]++;
                xdir[i] = 0;
                ydir[i] = 0;

                if (jumpCount[i] == 2) {
                    if (right[i] == true || directionFacing[i] == 1) xpos[i] = xpos[i] + 20;
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
            xpos[i] = xpos[i] + (xdir[i] * modifier);
            ypos[i] = ypos[i] + (ydir[i] * modifier);
            dogxpos[i] = dogxpos[i] + (dogxdir[i] * modifier);
            dogypos[i] = dogypos[i] + (dogydir[i] * modifier);


        }
    }
}

window.addEventListener('keydown', this.keyPressed , false);

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
        reset = true;
    }

    //player 0-Red
    if (key == 39) {
        if (menu == 1) {
            if (boxx == 255) boxx = 414;
            else if (boxx == 414 && boxy > 165) boxx = 579;
        }
        if (menu == 2) {
            if (boxx == 42) boxx = 259;
            else if (boxx == 259) boxx = 470;
        }
        if (menu == 5) {
            boxx = 508;
        }
        if (menu == 7) {
            if (boxy == 85 && boxx == 374) {
                boxx = 638;
            }
            if (boxy == 173 && boxx < 190 + (113 * 4)) {
                boxx = boxx + 113;
            }
            if (boxy == 315 && boxx < 190 + (113 * 3)) {
                boxx = boxx + 113;
            }
        }
        if (play == true && cpu[0] == false) {
            right[0] = true;
            left[0] = false;
        }
    }
    if (key == 37) {
        if (menu == 1) {
            if (boxx == 579) boxx = 414;
            else if (boxx == 414) boxx = 255;
        }
        if (menu == 2) {
            if (boxx == 470) boxx = 259;
            else if (boxx == 259) boxx = 42;
        }
        if (menu == 5) {
            boxx = 275;
        }
        if (menu == 7) {
            if (boxy == 85 && boxx == 638) {
                boxx = 374;
            }
            if (boxy == 173 && boxx > 190) {
                boxx = boxx - 113;
            }
            if (boxy == 315 && boxx > 190) {
                boxx = boxx - 113;
            }
        }
        if (play == true && cpu[0] == false) {
            left[0] = true;
            right[0] = false;
        }
    }
    if (key == 38) {
        //menu
        if (menu == 1) {
            if (boxy == 332) boxy = 245;
            else if (boxy == 245 && boxx < 579) boxy = 157;
            else if (boxy == 157) boxy = 70;
            else if (boxx == 368 && boxy == 400) {
                boxx = 255;
                boxy = 332;
            }
        } else if (menu == 2) {
            if (boxy == 313) boxy = 195;
            else if (boxy == 195) boxy = 78;



        } else if (menu == 6) {
            if (boxy == 400) {
                boxx = 458;
                boxy = 228;
            } else if (boxy == 228) {
                boxx = 420;
                boxy = 140;
            }
        } else if (menu == 7) {
            if (boxy == 173) {
                boxx = 374;
                boxy = 85;
            } else if (boxy == 315) {
                boxy = 173;
                boxx = 190;
            } else if (boxy == 400) {
                boxx = 190;
                boxy = 315;
            }
        } else if (menu == 8) {
            if (boxy == 204) {
                boxx = 424;
                boxy = 120;
            } else if (boxy == 283) {
                boxy = 204;
                boxx = 466;
            } else if (boxy == 400) {
                boxy = 283;
                boxx = 449;
            }
        }
        //in game
        if (play == true && cpu[0] == false) {
            if (ydir[0] == 0 && ypos[0] == ground[0] - 20) {
                ydir[0] = -jumpSpeed;
            } else {
                if (fuel[0] > 0 && streak[0] >= 3) jetpack[0] = true;
            }
        }
    }
    if (key == 40) {
        //menu
        if (menu == 1) {
            if (boxy == 70) boxy = 157;
            else if (boxy == 157) boxy = 245;
            else if (boxy == 245) boxy = 332;
            else if (boxy == 332) {
                boxx = 368;
                boxy = 400;
            }
        } else if (menu == 2) {
            if (boxy == 78) boxy = 195;
            else if (boxy == 195) boxy = 313;
        } else if (menu == 6) {
            if (boxy == 140) {
                boxx = 458;
                boxy = 228;
            } else if (boxy == 228) {
                boxx = 368;
                boxy = 400;
            }
        } else if (menu == 7) {
            if (boxy == 85) {
                boxy = 173;
                boxx = 190;
            } else if (boxy == 173) {
                boxx = 190;
                boxy = 315;
            } else if (boxy == 315) {
                boxx = 368;
                boxy = 400;
            }
        } else if (menu == 8) {
            if (boxy == 120) {
                boxx = 466;// stun
                boxy = 204;
            } else if (boxy == 204) {
                boxy = 283;
                boxx = 449;
            } else if (boxy == 283) {
                boxy = 400;
                boxx = 368;
            }
        }
        //ingame
        if (play == true && cpu[0] == false) {
            down[0] = true;
            //if(reload[0] == false)
            //{
                swap[0] = true;
            //}
        }
    }
    if (key == 222) {
        if (play == true && cpu[0] == false) {
            if (shooting[0] == false && reload[0] == false && stun[0] == false) {
                shooting[0] = true;
            }
        }
    }

    //player 1-Blue
    //right
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
    if (key == 32) {
        if (menu == 0) //opening screen
        {
            menu = 6;
        } else if (menu == 8) {
            if (boxy == 120) {
                checked[0] = true;
                checkedx[0] = boxx;
                checkedy[0] = boxy;
                boxx = 368;
                boxy = 400;
            } else if (boxy == 204) {
                checked[0] = true;
                checkedx[0] = boxx;
                checkedy[0] = boxy;
                boxx = 368;
                boxy = 400;
            } else if (boxy == 283) {
                checked[0] = true;
                checkedx[0] = boxx;
                checkedy[0] = boxy;
                boxx = 368;
                boxy = 400;
            } else if (checked[0] == true && boxx == 368 && boxy == 400) {
                if (checkedy[0] == 120) {
                    teams = false;
                    split = false;
                    level = 0;
                    for (k = 0; k <= 9; k++) {
                        gunx[k] = (Math.random() * 680) + 2;
                        guny[k] = -20 - ((Math.random() * 1500));
                    }
                }
                if (checkedy[0] == 204) {
                    teams = true;
                    split = false;
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

                    level = 0;
                    for (k = 0; k <= 9; k++) {
                        gunx[k] = (Math.random() * 680) + 2;
                        guny[k] = -20 - ((Math.random() * 1500));
                    }
                }
                if (checkedy[0] == 283) {
                    split = true;
                    teams = true;
                    for (i = 0; i <= 24; i++) {
                        hold[i] = false;
                    }
                    score[0] = 0;
                    score[1] = 0;

                    flagx[0] = 10;
                    flagy[0] = 330;

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
                checked[0] = false;
                menu = 1;
                boxx = 255;
                boxy = 70;
            }
        } else if (menu == 6) //choose zombie or multiplayer
        {
            if (checked[0] == true && boxx == 368 && boxy == 400) {
                if (checkedy[0] == 140) {
                    menu = 8;
                    boxx = 424;
                    boxy = 120;
                    custom = true;
                    zombie = false;
                } else if (checkedy[0] == 228) {
                    menu = 2;
                    boxx = 42;
                    boxy = 78;
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
                }
                checked[0] = false;
                checkedx[0] = -50;
            }
            if (boxy == 228) {
                checked[0] = true;
                checkedx[0] = 458;
                checkedy[0] = 228;
                boxx = 368;
                boxy = 400;
            }
            if (boxy == 140) {
                checked[0] = true;
                checkedx[0] = 420;
                checkedy[0] = 140;
                boxx = 368;
                boxy = 400;
            }
        } else if (menu == 1) //player select screen
        {
            if (boxy == 70) {
                checked[0] = true;
                checkedx[0] = boxx;
                checkedy[0] = boxy;
                boxy = 157;
            } else if (boxy == 157) {
                checked[1] = true;
                checkedx[1] = boxx;
                checkedy[1] = boxy;
                boxy = 245;
            } else if (boxy == 245) {
                checked[2] = true;
                checkedx[2] = boxx;
                checkedy[2] = boxy;
                boxy = 332;
            } else if (boxy == 332) {
                checked[3] = true;
                checkedx[3] = boxx;
                checkedy[3] = boxy;
                boxy = 400;
                boxx = 368;
            } else if (boxx == 368 && boxy == 400 && checked[0] == true && checked[1] == true && checked[2] == true && checked[3] == true && ((checkedx[2] < 579 && checkedx[3] < 579) || (checkedx[2] == 579 && checkedx[3] == 579) || (checkedx[2] < 579 && checkedx[3] == 579))) {
                for (i = 0; i <= 3; i++) {
                    if (checkedx[i] == 255) {
                        checkCount++;
                        cpu[i] = false;
                    }
                    if (checkedx[i] == 414) {
                        checkCount++;
                        cpu[i] = true;
                    }
                }
                players = checkCount;
                menu = 7;
                boxx = 374;
                boxy = 85;
                for (i = 0; i <= 3; i++) {
                    checked[i] = false;
                }
                if (zombie == true) {
                    players = 25;
                    for (i = 1; i <= players; i++) {
                        cpu[i] = true;
                        if (play == false) {//what
                            health[i] = 10;
                        }
                    }
                    //cpu[0] = false;

                }
            }
        } else if (menu == 7) //multiplayer settings screen
        {
            if (boxy == 85) {
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
                    for (i = 0; i < players; i++) {
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
                    menu = 2;
                } else if (split == true) {
                    menu = 3;
                }
            }
        } else if (menu == 2) //select map screen
        {
            if (boxx == 42 && boxy == 78) {
                level = 1;
                loadMap();
                menu = 3;
            }
            if (boxx == 259 && boxy == 78) {
                level = 2;
                loadMap();
                menu = 3;
            }
            if (boxx == 42 && boxy == 195) {
                level = 3;
                loadMap();
                menu = 3;
            }
            if (boxx == 259 && boxy == 195) {
                level = 4;
                loadMap();
                menu = 3;
            }
            if (boxx == 470 && boxy == 78) {
                level = 6;
                loadMap();
                menu = 3;
            }
            if (boxx == 470 && boxy == 195) {
                level = 7;
                loadMap();
                menu = 3;
            }

        } else if (menu == 3) {

        } else if (menu == 5) //post game screen
        {
            if (boxx == 275) {
                reset = true;
            } else if (boxx == 508) {
                rematch = true;
            }
        }
    }
}

window.addEventListener('keyup', this.keyReleased , false);

function keyReleased(e) {
    var upKey = e.keyCode;

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
            if (gun[0][equip[0]] > 0) {
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
    if (upKey == 222) {
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
    if (upKey == 70) {
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