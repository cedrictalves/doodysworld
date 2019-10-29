class Loading extends Phaser.Scene {
    constructor() {
        super("loadGame");
    }

    /*------------------------------
    --         PRELOAD            --
    ------------------------------*/
    preload() {
        //audio
        this.load.audio('intro', 'assets/sound/intro.mp3');
        this.load.audio('inGame', 'assets/sound/inGame.mp3');
        this.load.audio('jump', 'assets/sound/jump.mp3');
        this.load.audio('bounce', 'assets/sound/bounce.mp3');
        this.load.audio('prout', 'assets/sound/poot.mp3');
        this.load.audio('hit', 'assets/sound/hit.mp3');
        this.load.audio('fall', 'assets/sound/fall.mp3');
        this.load.audio('bigJump', 'assets/sound/bigJump.mp3');
        this.load.audio('victory', 'assets/sound/victory.mp3');
        
        //backgrounds
        this.load.image("borderTB", "assets/img/BG/borderTB.png");
        this.load.image("borderLR", "assets/img/BG/borderLR.png");
        this.load.image("background", "assets/img/BG/BG.jpg");
        this.load.image("trees", "assets/img/BG/trees.png");
        this.load.image("trees2", "assets/img/BG/trees2.png");
        this.load.image("cloud1", "assets/img/BG/cloud1.png");
        this.load.image("cloud2", "assets/img/BG/cloud2.png");
        this.load.image("cloud3", "assets/img/BG/cloud3.png");
        this.load.image("logo", "assets/img/imgWeb/logo.png");
        this.load.image("press", "assets/img/BG/press.png");
        this.load.image("toPlay", "assets/img/BG/toPlay.png");
        this.load.image("toRestart", "assets/img/BG/toRestart.png");
        this.load.image("gameOver", "assets/img/BG/gameOver.png");
        this.load.image("restart", "assets/img/BG/pressEnterRestart.png");
        this.load.image("controls", "assets/img/BG/controls.png");
        this.load.image("controlsPress", "assets/img/BG/controlsPress.png");
        this.load.image("enterKey", "assets/img/BG/enterKey.png");
        this.load.image("spaceKey", "assets/img/BG/spaceKey.png");
        this.load.image("escKey", "assets/img/BG/escKey.png");
        this.load.image("upKey", "assets/img/BG/upKey.png");
        this.load.image("leftKey", "assets/img/BG/leftKey.png");
        this.load.image("rightKey", "assets/img/BG/rightKey.png");
        this.load.image("leftImg", "assets/img/BG/leftImg.png");
        this.load.image("jumpImg", "assets/img/BG/jumpImg.png");
        this.load.image("rightImg", "assets/img/BG/rightImg.png");
        this.load.image("mainMenuImg", "assets/img/BG/mainMenuImg.png");
        this.load.image("soundUp", "assets/img/BG/soundUp.png");
        this.load.image("soundOff", "assets/img/BG/soundOff.png");
        this.load.image("leave", "assets/img/BG/leave.png");
        this.load.image("fullScreen", "assets/img/BG/fullScreen.png");
        this.load.image("congrats", "assets/img/BG/congrats.png");
        this.load.image("end", "assets/img/BG/end.png");

        //platforms
        this.load.image("pinkRubber", "assets/img/floor/pinkRubber.png");
        this.load.image("greenRubber", "assets/img/floor/greenRubber.png");
        this.load.image("choco1", "assets/img/floor/choco1.png");
        this.load.image("choco2", "assets/img/floor/choco2.png");
        this.load.image("choco3", "assets/img/floor/choco3.png");
        this.load.image("glueStick", "assets/img/floor/glueStick.png");
        this.load.image("holyDood", "assets/img/floor/holyDood.png");
        this.load.image("greenPen", "assets/img/floor/greenPen.png");
        this.load.image("redPen", "assets/img/floor/redPen.png");
        this.load.image("yellowPen", "assets/img/floor/yellowPen.png");

        //glueStickMove
        this.load.spritesheet('glueStickMove', 'assets/img/floor/glueStick.png', {
            frameWidth: 268,
            frameHeight: 59
        });

        //greenRubberMove
        this.load.spritesheet('greenRubberMove', 'assets/img/floor/greenRubber.png', {
            frameWidth: 134,
            frameHeight: 57
        });

        //yellowPenBounce
        this.load.spritesheet('yellowPenBounce', 'assets/img/floor/yellowPen.png', {
            frameWidth: 21,
            frameHeight: 255
        });

        //redPenBounce
        this.load.spritesheet('redPenFall', 'assets/img/floor/redPen.png', {
            frameWidth: 22,
            frameHeight: 219
        });

        //player
        this.load.spritesheet('player', 'assets/img/player/playerFinal.png', {
            frameWidth: 57,
            frameHeight: 113,
        });

        //hornets
        this.load.spritesheet('hornet', 'assets/img/monsters/hornet.png', {
            frameWidth: 35,
            frameHeight: 33
        });

        //floormonster
        this.load.spritesheet('floorMonster', 'assets/img/monsters/floorMonster.png', {
            frameWidth: 57,
            frameHeight: 43
        });


    }

    /*------------------------------
    --          CREATE            --
    ------------------------------*/
    create() {
        this.scene.start("menu");
    }

    update() {

    }

}