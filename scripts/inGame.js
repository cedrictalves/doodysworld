class InGame extends Phaser.Scene {
    constructor() {
        super("inGame");
    }

    create() {
        //create world (platform, background, clouds)
        this.createWorld();

        //create the player
        this.createPlayer();

        //create the key to move the player
        this.createKeys();

        //create the monsters
        this.createMonsters();

        //camera following the player
        this.cameras.main.startFollow(this.player);

        //allow camera to go to these position
        this.cameras.main.setBounds(0, 0, 8000, 1200);

        this.myCam = this.cameras.main;

        this.borderT = this.add.image(0,0,'borderTB');
        this.borderT.setOrigin(0,0);
        this.borderT.setScrollFactor(0, 0);
        this.borderB = this.add.image(0, 498,'borderTB');
        this.borderB.setOrigin(0,0);
        this.borderB.setScrollFactor(0, 0);
        this.borderL = this.add.image(0,0,'borderLR');
        this.borderL.setOrigin(0,0);
        this.borderL.setScrollFactor(0, 0);
        this.borderR = this.add.image(748,0,'borderLR');
        this.borderR.setOrigin(0,0);
        this.borderR.setScrollFactor(0, 0);

        //sounds
        this.inGameSong = this.sound.add('inGame', { loop: true, volume: 0.1 });
        this.inGameSong.play();
        this.jumpSound = this.sound.add('jump', { volume: 1 });
        this.bounceSound = this.sound.add('bounce', { volume: 0.3 });
        this.proutSound = this.sound.add('prout', { volume: 1 });
        this.hitSound = this.sound.add('hit', { volume: 0.4 });
        this.fallSound = this.sound.add('fall', { volume: 0.3 });
        this.bigJumpSound = this.sound.add('bigJump', { volume: 0.3 });
        this.victory = this.sound.add('victory', { volume: 0.5 });

        // esc key
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //sound controller
        this.soundUp = this.add.image(20, 20, 'soundUp');
        this.soundUp.setScrollFactor(0, 0);
        this.soundUp.setInteractive();
        this.soundOff = this.add.image(20, 20, 'soundOff');
        this.soundOff.setInteractive();
        this.soundOff.setScrollFactor(0, 0);

        if (this.game.sound.mute == false) {
            this.soundUp.visible = true;
            this.soundOff.visible = false;
        }
        
        if (this.game.sound.mute == true) {
            this.soundUp.visible = false;
            this.soundOff.visible = true;
        }
        this.soundUp.on('pointerdown', () => {
            this.game.sound.mute = true;
            this.soundUp.visible = false;
            this.soundOff.visible = true;
        });
        this.soundOff.on('pointerdown', () => {
            this.game.sound.mute = false;
            this.soundOff.visible = false;
            this.soundUp.visible = true;
        });

        //fullscreen
        this.fullScreenButton = this.add.image(730, 20, "fullScreen");
        this.fullScreenButton.setScrollFactor(0, 0);
        this.fullScreenButton.setInteractive();
        this.fullScreenButton.on('pointerup', function () {
            if (this.scene.scale.isFullscreen) {
                this.scene.scale.stopFullscreen();
            } else {
                this.scene.scale.startFullscreen();
            }
        });

        //new date to compare to get the score
        this.date = Date.now();
        window.score = this.add.text(220, 20, "00 : 00 . 000", { color: "#000000", fontSize: "30px", fontWeight: "bold" });
        window.score.setScrollFactor(0, 0);

        // mobile tablets config
        if (navigator.userAgent.match(/(android|iphone|iPad|iPod|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)) {
            // don't show fullscreen btn
            this.fullScreenButton.visible = false;

            this.direction = null;
            //keys buttons 
            //left key
            this.left = this.add.image(50, 460, 'leftKey');
            this.left.setScrollFactor(0, 0);
            this.left.setAlpha(0.3);
            this.left.setScale(1.5);
            this.left.setInteractive().on('pointerdown', this.moveLeftMobile.bind(this));
            this.left.setInteractive().on('pointerup', this.notMovingMobile.bind(this));
            //right key
            this.right = this.add.image(150, 460, 'rightKey');
            this.right.setScrollFactor(0, 0);
            this.right.setAlpha(0.3);
            this.right.setScale(1.5);
            this.right.setInteractive().on('pointerdown', this.moveRightMobile.bind(this));
            this.right.setInteractive().on('pointerup', this.notMovingMobile.bind(this));
            //up key
            this.up = this.add.image(700, 460, 'upKey');
            this.up.setScrollFactor(0, 0);
            this.up.setAlpha(0.3);
            this.up.setScale(1.5);
            this.up.setInteractive();
            this.up.on('pointerdown', () => {
                    if (this.player.body.touching.down) {
                        this.player.play('jump', true);
                        this.player.setVelocityY(-650);
                        this.jumpSound.play();
                    }
                })
                // back to main menu key
            this.leave = this.add.image(700, 20, 'leave');
            this.leave.setScrollFactor(0, 0);
            this.leave.setInteractive();
            this.leave.on('pointerdown', () => {
                this.inGameSong.stop();
                this.scene.start("menu");
            });
        }

    }

    /*---------------------
    - STOP WATCH FUNCTION -
    ----------------------*/
    compare() {
        var newDate = Date.now();
        var timeComp = newDate - this.date;
        var milliseconds = parseInt(timeComp % 1000),
            seconds = parseInt((timeComp / 1000) % 60),
            minutes = parseInt((timeComp / (1000 * 60)) % 60);
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        if (milliseconds > 10 && milliseconds < 99) milliseconds = "0" + milliseconds;
        if (milliseconds < 10) milliseconds = "00" + milliseconds;
        window.scoreTime = minutes + ":" + seconds + "." + milliseconds;
        window.scoreText = "score : ";
        window.score.text = window.scoreText + window.scoreTime;
    }


    /*-----------------
    - UPDATE FUNCTION -
    ------------------*/
    update() {
        //stopwatch
        this.compare();

        //keys for player
        this.createKeys();

        //monster moves
        this.monstersMove();

        //plaforms move
        this.movingPlatforms();

        //players moves for mobile/tablet
        if (navigator.userAgent.match(/(android|iphone|iPad|iPod|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)) {
            this.isMoving();
        }

        //camera scrolling background 
        this.background.tilePositionX = this.myCam.scrollX * .2;
        this.trees.tilePositionX = this.myCam.scrollX * .6;
        this.trees2.tilePositionX = this.myCam.scrollX * .4;

        //player die
        if (1500 < this.player.y || -100 > this.player.x) {
            this.fallSound.play();
            this.player.disableBody(true, true);
            this.inGameSong.stop();
            this.scene.start("gameOver");
        }
        if (this.player.alive == false) {
            this.hitSound.play();
            this.player.disableBody(true, true);
            this.inGameSong.stop();
            this.scene.start('gameOver');
        }

        // press escape key to go to the main menu
        if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
            this.inGameSong.stop();
            this.scene.start("menu");
        }
    }

    /*------------------
    -    MOBILES MOVE  -
     ------------------*/
    moveLeftMobile() {
        this.direction = "left";
        
    }

    moveRightMobile() {
        this.direction = "right";
    }

    notMovingMobile() {
        this.direction = null;
    }

    isMoving() {
        if (this.direction == "left") {
            this.player.setVelocityX(-230);
            this.player.flipX = true;
            this.player.play("walk", true)
        }
        if (this.direction == "right") {
            this.player.setVelocityX(230);
            this.player.flipX = false;
            this.player.play("walk", true)
        }
        if (this.direction == null) {
            this.player.setVelocityX(0);
            this.player.play("idle", true);
        }
    }


    /*------------------
    -   CREATE PLAYER  -
    ------------------*/
    createPlayer() {
        this.player = this.physics.add.sprite(100, 1000, 'player');
        this.player.setCollideWorldBounds(false);
        
        this.player.setSize(24, 113);
        this.physics.add.collider(this.player, this.floor);
        this.player.alive = true;

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('player', { start: 5, end: 8 }),
            frameRate: 15,
            repeat: -1
        });
        
    }

    /*--------------------------------
    -  CURSORS KEY TO MOVE PLAYER     -
     --------------------------------*/
    createKeys() {
        //create keys
        this.cursors = this.input.keyboard.createCursorKeys();

        //not touching down
        if (this.player.body.touching.down == false) {
        	this.player.play('idle', true);
        }
        // move left
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-230);
            this.player.play('walk', true);
            this.player.flipX = true;
            // move right
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(230);
            this.player.play('walk', true);
            this.player.flipX = false;
            // jump 
        } else if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-650);
            this.jumpSound.play();
            //idle
        } else{
            this.player.setVelocityX(0);
            this.player.play('idle', true);
        }
    }

    /*------------------
    -  CREATE MONSTER   -
     ------------------*/
    createMonsters() {
        //flyingMonsters animation
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('hornet', { start: 0, end: 2 }),
            frameRate: 15,
            repeat: -1
        });
        //floorMonsters animation
        this.anims.create({
            key: "monsterWalk",
            frames: this.anims.generateFrameNumbers('floorMonster', { start: 0, end: 1 }),
            frameRate: 15,
            repeat: -1
        })

        //flyingMonsters position
        this.flyingMonster1 = this.createFlyingMonster(540, 990);
        this.flyingMonster2 = this.createFlyingMonster(850, 790);
        this.flyingMonster3 = this.createFlyingMonster(950, 990);
        this.flyingMonster4 = this.createFlyingMonster(2200, 990);
        this.flyingMonster5 = this.createFlyingMonster(2610, 990);
        this.flyingMonster6 = this.createFlyingMonster(3250, 990);
        this.flyingMonster7 = this.createFlyingMonster(3520, 820);
        this.flyingMonster8 = this.createFlyingMonster(3890, 990);
        this.flyingMonster9 = this.createFlyingMonster(4980, 990);
        this.flyingMonster10 = this.createFlyingMonster(5930, 990);
        this.flyingMonster11 = this.createFlyingMonster(6400, 990);
        this.flyingMonster12 = this.createFlyingMonster(6520, 790);
        this.flyingMonster13 = this.createFlyingMonster(7000, 990);

        //floorMonsters posision
        this.floorMonster1 = this.createFloorMonster(660, 999);
        this.floorMonster2 = this.createFloorMonster(1800, 950);
        this.floorMonster3 = this.createFloorMonster(2300, 999);
        this.floorMonster4 = this.createFloorMonster(2650, 999);
        this.floorMonster5 = this.createFloorMonster(3360, 1000);
        this.floorMonster6 = this.createFloorMonster(3610, 900);
        this.floorMonster7 = this.createFloorMonster(4260, 900);
        this.floorMonster8 = this.createFloorMonster(6060, 1000);
    }

    /*------------------
    -  MONSTER MOVES   -
     ------------------*/
    monstersMove() {
        //flyingMonsters moves
        this.flyingMonsterMove(this.flyingMonster1, 800, 1000);
        this.flyingMonsterMove(this.flyingMonster2, 800, 1000);
        this.flyingMonsterMove(this.flyingMonster3, 800, 1000);
        this.flyingMonsterMove(this.flyingMonster4, 850, 1050);
        this.flyingMonsterMove(this.flyingMonster5, 850, 1050);
        this.flyingMonsterMove(this.flyingMonster6, 800, 1100);
        this.flyingMonsterMove(this.flyingMonster7, 800, 1100);
        this.flyingMonsterMove(this.flyingMonster8, 700, 1000);
        this.flyingMonsterMove(this.flyingMonster9, 900, 1150);
        this.flyingMonsterMove(this.flyingMonster10, 800, 1100);
        this.flyingMonsterMove(this.flyingMonster11, 800, 1000);
        this.flyingMonsterMove(this.flyingMonster12, 800, 1000);
        this.flyingMonsterMove(this.flyingMonster13, 800, 1000);

        //floorMonsters moves
        this.floorMonsterMove(this.floorMonster1, 650, 750);
        this.floorMonsterMove(this.floorMonster2, 1800, 2000);
        this.floorMonsterMove(this.floorMonster3, 2300, 2500);
        this.floorMonsterMove(this.floorMonster4, 2690, 2900);
        this.floorMonsterMove(this.floorMonster5, 3350, 3450);
        this.floorMonsterMove(this.floorMonster6, 3600, 3800);
        this.floorMonsterMove(this.floorMonster7, 4250, 4350);
        this.floorMonsterMove(this.floorMonster8, 6050, 6250);
    }

    /*------------------
    -  FLOOR MONSTER   -
     ------------------*/
    createFloorMonster(posX, posY) {
        let floorMonster = this.physics.add.sprite(57, 43, 'floorMonster');
        floorMonster.setPosition(posX, posY);
        floorMonster.body.setAllowGravity(true);
        this.physics.add.collider(floorMonster, this.floor);
        floorMonster.setVelocityX(150);
        floorMonster.play('monsterWalk', true);
        this.physics.add.collider(floorMonster, this.player, (flooMonster, player) => {
            if (floorMonster.body.touching.left == true) {
                this.player.alive = false;
            }
            if (floorMonster.body.touching.right == true) {
                this.player.alive = false;
            }
            if (floorMonster.body.touching.down == true) {
                this.player.alive = false;
            }
            if (floorMonster.body.touching.up == true) {
                this.player.alive = true;
                flooMonster.disableBody(true, true);
                player.setVelocityY(-100);
                this.proutSound.play();
            }
        });
        return floorMonster;
    }

    /*------------------
    -  FLYING MONSTER  -
     ------------------*/
    createFlyingMonster(posX, posY) {
        let flyingMonster = this.physics.add.sprite(35, 33, 'hornet');
        flyingMonster.setPosition(posX, posY);
        flyingMonster.body.setAllowGravity(false);
        flyingMonster.setVelocityY(150);
        flyingMonster.play('fly', true);
        this.physics.add.collider(flyingMonster, this.player, (flyingMonster, player) => {
            if (flyingMonster.body.touching.left == true) {
                this.player.alive = false;
            }
            if (flyingMonster.body.touching.right == true) {
                this.player.alive = false;
            }
            if (flyingMonster.body.touching.down == true) {
                this.player.alive = false;
            }
            if (flyingMonster.body.touching.up == true) {
                this.player.alive = true;
                flyingMonster.disableBody(true, true);
                player.setVelocityY(-600);
                this.bounceSound.play();
            }
        });
        return flyingMonster;
    }


    /*--------------------------------
    -  FLOORMONSTER MOVES FUNCTION   -
     --------------------------------*/
    floorMonsterMove(monster, left, right) {
        if (Math.floor(monster.x) < left) {
            monster.setVelocityX(150);
            monster.flipX = false;
        } else if (Math.floor(monster.x) > right) {
            monster.setVelocityX(-150);
            monster.flipX = true;
        }
    }

    /*---------------------------------
    -  FLYINGMONSTER MOVES FUNCTION   -
     ---------------------------------*/
    flyingMonsterMove(monster, up, down) {
        if (Math.floor(monster.y) < up) {
            monster.setVelocityY(150);
        } else if (Math.floor(monster.y) > down) {
            monster.setVelocityY(-150);
        }
    }

    /*-----------------------------------
    -  WORLD/PLATFORM/CLOUDS CREATION   -
     -----------------------------------*/
    createWorld() {
        // background
        this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'background');
        this.background.setScrollFactor(0);
        this.background.setOrigin(0, 0);
        this.trees2 = this.add.tileSprite(0, 280, this.game.config.width, 0, 'trees2');
        this.trees2.setScrollFactor(0);
        this.trees2.setOrigin(0, 0);
        this.trees = this.add.tileSprite(0, 390, this.game.config.width, 0, 'trees');
        this.trees.setScrollFactor(0);
        this.trees.setOrigin(0, 0);

        //clouds
        this.clouds = this.physics.add.staticGroup();
        this.clouds.create(300, 600, 'cloud1');
        this.clouds.create(700, 700, 'cloud2');
        this.clouds.create(1200, 600, 'cloud3');
        this.clouds.create(1800, 700, 'cloud2');
        this.clouds.create(2100, 500, 'cloud3');
        this.clouds.create(2500, 600, 'cloud1');
        this.clouds.create(2750, 500, 'cloud3');
        this.clouds.create(3050, 600, 'cloud2');
        this.clouds.create(3300, 500, 'cloud1');
        this.clouds.create(3950, 650, 'cloud2');
        this.clouds.create(4250, 550, 'cloud3');
        this.clouds.create(4700, 500, 'cloud2');
        this.clouds.create(5050, 550, 'cloud3');
        this.clouds.create(5500, 600, 'cloud1');
        this.clouds.create(6000, 550, 'cloud2');
        this.clouds.create(6400, 650, 'cloud1');
        this.clouds.create(6900, 500, 'cloud3');
        this.clouds.create(7200, 550, 'cloud2');
        this.clouds.create(7600, 700, 'cloud3');
        this.clouds.create(7900, 600, 'cloud1');
        this.clouds.create(8200, 550, 'cloud2');
        this.clouds.create(8600, 650, 'cloud3');

        //plaftforms
        this.floor = this.physics.add.staticGroup();
        this.floor.create(130, 1100, 'glueStick');
        this.floor.create(400, 1050, 'greenRubber');
        this.floor.create(700, 1050, 'pinkRubber');
        this.floor.create(1100, 1200, 'redPen');
        this.floor.create(1200, 1100, 'greenPen');
        this.floor.create(1500, 1000, 'redPen');
        this.floor.create(1600, 920, 'greenPen');
        this.floor.create(1900, 1100, 'holyDood');
        this.floor.create(2100, 1100, 'yellowPen');
        this.floor.create(2400, 1100, 'glueStick');
        this.floor.create(2800, 1100, 'holyDood');
        this.floor.create(3100, 1119, 'choco1');
        this.floor.create(3138, 1100, 'choco2');
        this.floor.create(3177, 1082, 'choco3');
        this.floor.create(3400, 1100, 'pinkRubber');
        this.floor.create(3700, 1000, 'glueStick');
        this.floor.create(4000, 900, 'greenRubber');
        this.floor.create(4300, 1000, 'pinkRubber');
        this.floor.create(4850, 1200, 'pinkRubber');
        this.floor.create(5050, 1169, 'choco1');
        this.floor.create(5088, 1150, 'choco2');
        this.floor.create(5127, 1132, 'choco3');
        this.floor.create(6150, 1100, 'holyDood');

        //moving platforms
        this.movePlat = this.physics.add.sprite(268, 59, 'glueStickMove');
        this.movePlat.setPosition(4600, 950);
        this.movePlat.body.setAllowGravity(false);
        this.movePlat2 = this.physics.add.sprite(134, 57, 'greenRubber');
        this.movePlat2.setPosition(5300, 1050);
        this.movePlat2.body.setAllowGravity(false);
        this.movePlat3 = this.physics.add.sprite(134, 57, 'greenRubber');
        this.movePlat3.setPosition(5450, 1025);
        this.movePlat3.body.setAllowGravity(false);
        this.movePlat4 = this.physics.add.sprite(134, 57, 'greenRubber');
        this.movePlat4.setPosition(5600, 1000);
        this.movePlat4.body.setAllowGravity(false);
        this.movePlat5 = this.physics.add.sprite(134, 57, 'greenRubber');
        this.movePlat5.setPosition(5750, 975);
        this.movePlat5.body.setAllowGravity(false);
        this.movePlat6 = this.physics.add.sprite(21, 255, 'yellowPenBounce');
        this.movePlat6.setPosition(1400, 1100);
        this.movePlat6.body.checkCollision.up = true;
        this.movePlat6.body.checkCollision.left = false;
        this.movePlat6.body.checkCollision.right = false;
        this.movePlat6.body.checkCollision.down = false;
        this.movePlat6.body.setAllowGravity(false);
        this.movePlat7 = this.physics.add.sprite(22, 219, 'redPenFall');
        this.movePlat7.setPosition(1300, 1000);
        this.movePlat7.body.setAllowGravity(false);
        this.movePlat8 = this.physics.add.sprite(22, 219, 'redPenFall');
        this.movePlat8.setPosition(2200, 1200);
        this.movePlat8.body.setAllowGravity(false);
        this.movePlat9 = this.physics.add.sprite(21, 255, 'yellowPenBounce');
        this.movePlat9.setPosition(6650, 1100);
        this.movePlat9.body.checkCollision.up = true;
        this.movePlat9.body.checkCollision.left = false;
        this.movePlat9.body.checkCollision.right = false;
        this.movePlat9.body.checkCollision.down = false;
        this.movePlat9.body.setAllowGravity(false);
        this.movePlat10 = this.physics.add.sprite(134, 57, 'greenRubber');
        this.movePlat10.setPosition(7200, 1100);
        this.movePlat10.body.setAllowGravity(false);

        //end
        this.end = this.add.image(7200, 977, "end");
    }

    /*--------------------------------
    - PHYSICS PLAFTFORMS FUNCTIONS   -
     --------------------------------*/
    movingPlatforms() {
        //move left and right gluestick
        if (this.movePlat.x < 4610) {
            this.movePlat.setVelocityX(100);
        } else if (this.movePlat.x > 4700) {
            this.movePlat.setVelocityX(-100);
        }

        //falling rubbers
        this.physics.add.collider(this.movePlat, this.player);
        this.physics.add.collider(this.movePlat2, this.player);
        this.physics.add.collider(this.movePlat3, this.player);
        this.physics.add.collider(this.movePlat4, this.player);
        this.physics.add.collider(this.movePlat5, this.player);

        //bouncer pen
        this.physics.add.collider(this.movePlat6, this.player, (movePlat6, player) => {
            movePlat6.setVelocityY(400);
            player.setVelocityY(-1200);
            this.bigJumpSound.play();
        });

        //bouncer pen 2
        this.physics.add.collider(this.movePlat9, this.player, (movePlat9, player) => {
            movePlat9.setVelocityY(400);
            player.setVelocityY(-1200);
            this.bigJumpSound.play();
        });

        //falling fast pen
        this.physics.add.collider(this.movePlat7, this.player, (movePlat7, player) => {
            movePlat7.setVelocityY(800);
        });

        //falling fast pen 2
        this.physics.add.collider(this.movePlat8, this.player, (movePlat8, player) => {
            movePlat8.setVelocityY(800);
        });

        //end game
        this.physics.add.collider(this.movePlat10, this.player, (movePlat10, player) => {
            window.scoreFinal = window.scoreTime;
            clearInterval(this.interval);
            this.inGameSong.stop();
            this.victory.play();
            this.scene.start("win");
        });
    }
}