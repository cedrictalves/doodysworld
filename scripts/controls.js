class Controls extends Phaser.Scene {
    constructor() {
        super("controls");
    }

    /*------------------------------
    --          CREATE            --
    ------------------------------*/
    create() {
        // keybord escape key
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // background / images
        this.background = this.add.image(375, 250, 'background');
        this.borderT = this.add.image(0,0,'borderTB');
        this.borderT.setOrigin(0,0);
        this.borderB = this.add.image(0, 498,'borderTB');
        this.borderB.setOrigin(0,0);
        this.borderL = this.add.image(0,0,'borderLR');
        this.borderL.setOrigin(0,0);
        this.borderR = this.add.image(748,0,'borderLR');
        this.borderR.setOrigin(0,0);
        this.add.image(375, 120, 'controls');
        this.add.image(120, 350, 'leftKey');
        this.add.image(220, 350, 'upKey');
        this.add.image(320, 350, 'rightKey');
        this.escImg = this.add.image(600, 350, 'escKey');
        this.leftImg = this.add.image(120, 300, 'leftImg');
        this.leftImg.setScale(0.5);
        this.jumpImg = this.add.image(220, 300, 'jumpImg');
        this.jumpImg.setScale(0.5);
        this.rightImg = this.add.image(320, 300, 'rightImg');
        this.rightImg.setScale(0.5);
        this.mainMenuImg = this.add.image(600, 300, 'mainMenuImg');
        this.mainMenuImg.setScale(0.5);
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

        // mute
        this.soundUp.on('pointerdown', () => {
            this.game.sound.mute = true;
            this.soundUp.visible = false;
            this.soundOff.visible = true;
        });

        // demute
        this.soundOff.on('pointerdown', () => {
            this.game.sound.mute = false;
            this.soundOff.visible = false;
            this.soundUp.visible = true;
        });

        //fullscreen
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
            // leave to main menu button
            this.leave = this.add.image(700, 20, 'leave');

            // don't show fullscreen btn
            this.fullScreenButton.visible = false;
            
            this.leave.setScrollFactor(0, 0);
            this.leave.setInteractive();
            this.leave.on('pointerdown', () => {
                this.scene.start("menu");
            });
            // don't shwo escape key img
            this.escImg.visible = false;
            this.bigLeave = this.add.image(650, 350, 'leave');
            this.bigLeave.setScale(1.5);
        }

    }

    /*------------------------------
    --           UPDATE           --
    ------------------------------*/
    update() {
        // if esc key pressed go to main menu
        if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
            this.scene.start("menu");
        }
    }

}