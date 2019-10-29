class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }

    /*------------------------------
    --          CREATE            --
    ------------------------------*/
    create() {
        //sound
        this.introSong = this.sound.add('intro', { loop: true, volume: 0.1 });
        this.introSong.play();

        // enter and escape keyboard key
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //background and images
        this.background = this.add.image(375, 250, 'background');
        this.borderT = this.add.image(0,0,'borderTB');
        this.borderT.setOrigin(0,0);
        this.borderB = this.add.image(0, 498,'borderTB');
        this.borderB.setOrigin(0,0);
        this.borderL = this.add.image(0,0,'borderLR');
        this.borderL.setOrigin(0,0);
        this.borderR = this.add.image(748,0,'borderLR');
        this.borderR.setOrigin(0,0);
        this.logo = this.add.image(375, 100, 'logo');
        this.logo.setScale(0.7);
        this.press = this.add.image(250, 250, "press");
        this.enterKeyImg = this.add.image(370, 250, "enterKey");
        this.toPlay = this.add.image(520, 250, "toPlay");
        this.controlsPress = this.add.image(520, 450, 'controlsPress');
        this.controlsPress.setScale(0.4);
        this.spaceKeyImg = this.add.image(650, 450, 'spaceKey');
        this.spaceKeyImg.setScale(0.8);
        this.soundUp = this.add.image(20, 20, 'soundUp');
        this.soundUp.setInteractive();
        this.soundOff = this.add.image(20, 20, 'soundOff');
        this.soundOff.setInteractive();

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
            // don't show space key image
            this.spaceKeyImg.visible = false;

            // don't show fullscreen btn
            this.fullScreenButton.visible = false;

            //controls image
            this.controlsPress.setInteractive();
            this.controlsPress.on("pointerdown", () => {
                this.introSong.stop();
                this.scene.start("controls");
            });
            this.controlsPress.setPosition(620, 450);

            // don't show enter key image
            this.enterKeyImg.visible = false;
            this.press.setPosition(280, 250);
            this.toPlay.setPosition(470, 250);
            this.press.setInteractive();
            // go ingame
            this.press.on("pointerdown", () => {
                this.introSong.stop();
                this.scene.start("inGame");
            })
            this.toPlay.setInteractive();
            this.toPlay.on("pointerdown", () => {
                this.introSong.stop();
                this.scene.start("inGame");
            })
            // message
            this.add.text(190, 10, "For a better gameplay, it's recommanded to play on a computer", { color: "#000000", fontSize: "10px"});
        }

    }

    /*------------------------------
    --          UPDATE            --
    ------------------------------*/
    update() {
        // if enter key pressed ingame
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.introSong.stop();
            this.scene.start("inGame");
        }
        // if space key pressed control page
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.introSong.stop();
            this.scene.start("controls");
        }
    }

}