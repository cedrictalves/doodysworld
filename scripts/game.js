/*------------------------------
--        GAME CONFIG         --
------------------------------*/
const config = {
    parent: "game",
    width: 750,
    height: 500,
    type: Phaser.AUTO,
    scene: [Loading, Menu, InGame, GameOver, Controls, Win],
    backgroundColor: "#ffffff",
    scale: {
        mode: Phaser.Scale.FIT
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 1500, x: 0 },
            debug: false
        },
    },
    input: {
        activePointers: 3,
    }
}

/*------------------------------
 --     CREATE GAME           --
------------------------------*/
window.onload = function() {
    var game = new Phaser.Game(config);
}


function preload() {

}

function create() {

}

function update() {

}