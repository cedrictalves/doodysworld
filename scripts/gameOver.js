class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }
    /*------------------------------
    --          CREATE            --
    ------------------------------*/
    create() {
        // enter & escape keybord key
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //background and image
        this.background = this.add.image(375, 250, 'background');
        this.borderT = this.add.image(0,0,'borderTB');
        this.borderT.setOrigin(0,0);
        this.borderB = this.add.image(0, 498,'borderTB');
        this.borderB.setOrigin(0,0);
        this.borderL = this.add.image(0,0,'borderLR');
        this.borderL.setOrigin(0,0);
        this.borderR = this.add.image(748,0,'borderLR');
        this.borderR.setOrigin(0,0);
        this.gameOver = this.add.image(375, 200, 'gameOver');
        this.gameOver.setScale(0.8);
        this.press = this.add.image(195, 400, "press");
        this.enterKeyImg = this.add.image(315, 400, "enterKey");
        this.toRestart = this.add.image(515, 400, "toRestart");
        this.soundUp = this.add.image(20, 20, 'soundUp');
        this.soundUp.setScrollFactor(0, 0);
        this.soundUp.setInteractive();
        this.soundOff = this.add.image(20, 20, 'soundOff');
        this.soundOff.setInteractive();
        this.soundOff.setScrollFactor(0, 0);

        // if it's not muted
        if (this.game.sound.mute == false) {
            this.soundUp.visible = true;
            this.soundOff.visible = false;
        }

        // if it's muted
        if (this.game.sound.mute == true) {
            this.soundUp.visible = false;
            this.soundOff.visible = true;
        }

        //mute
        this.soundUp.on('pointerdown', () => {
            this.game.sound.mute = true;
            this.soundUp.visible = false;
            this.soundOff.visible = true;
        });

        //demute
        this.soundOff.on('pointerdown', () => {
            this.game.sound.mute = false;
            this.soundOff.visible = false;
            this.soundUp.visible = true;
        });

        // fullscreen
        this.fullScreenButton = this.add.image(730, 20, "fullScreen");
        this.fullScreenButton.setInteractive();
        this.fullScreenButton.on('pointerup', function () {
            if (this.scene.scale.isFullscreen) {
                this.scene.scale.stopFullscreen();
            } else {
                this.scene.scale.startFullscreen();
            }
        });

        // mobile and tablet config
        if (navigator.userAgent.match(/(android|iphone|iPad|iPod|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)) {
            // don't show enter key image
            this.enterKeyImg.visible = false;

            // don't show fullscreen btn
            this.fullScreenButton.visible = false;
            
            this.press.setPosition(240, 400);
            this.toRestart.setPosition(480, 400);
            this.press.setInteractive();

            //restart the game
            this.press.on('pointerdown', () => {
                this.scene.start("inGame");
            });
            this.toRestart.on('pointerdown', () => {
                this.scene.start("inGame");
            });

            // add leave button
            this.leave = this.add.image(700, 20, 'leave');
            this.leave.setScrollFactor(0, 0);
            this.leave.setInteractive();

            // go to main menu
            this.leave.on('pointerdown', () => {
                this.scene.start("menu");
            })
        }
    }

    /*------------------------------
    --          CREATE            --
    ------------------------------*/
    update() {
        // if enter key is pressed restart
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.scene.start("inGame");
        }
        // if escape key is pressed go to main menu
        if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
            this.scene.start("menu");
        }
    }

}