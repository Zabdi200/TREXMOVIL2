var trex, trex_running, edges;
var groundImage;
var piso;
var pisoinvisible;
var nube;
var nubeimage;
var cactus1;
var cactus2;
var cactus3;
var cactus4;
var cactus5;
var cactus6;
var cactus;
var puntaje;
puntaje = 0;
var grupodenubes;
var grupodecactus;
var PLAY = 1;
var END = 0;
var estadodejuego = PLAY;
var trex3;
var gameover;
var restart;
var GameOver;
var Restart;
var sonidojump;
var sonidodie;
var sonido3;
var mensaje = "Hola";

function preload() {
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    groundImage = loadImage("ground2.png");

    nubeimage = loadImage("cloud.png");
    cactus1 = loadImage("obstacle1.png");
    cactus2 = loadImage("obstacle2.png");
    cactus3 = loadImage("obstacle3.png");
    cactus4 = loadImage("obstacle4.png");
    cactus5 = loadImage("obstacle5.png");
    cactus6 = loadImage("obstacle6.png");
    trex3 = loadAnimation("trex_collided.png");
    gameover = loadImage("gameOver.png");
    restart = loadImage("restart.png");
    sonidojump = loadSound("jump.mp3");
    sonidodie = loadSound("die.mp3");
    sonido3 = loadSound("checkpoint.mp3");

}

function setup() {
    createCanvas(windowWidth, windowHeight);

    //crear sprite de Trex
    trex = createSprite(50, 170, 20, 50);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("choque", trex3);
    edges = createEdgeSprites();
    GameOver = createSprite(windowWidth / 2, windowHeight / 2);
    Restart = createSprite(windowWidth / 2, windowHeight / 2 + 40);
    GameOver.addImage(gameover);
    Restart.addImage(restart);
    GameOver.visible = false;
    Restart.visible = false;
    GameOver.scale = 0.8;
    Restart.scale = 0.6;
    //agregar tamaño y posición al Trex
    trex.scale = 0.5;
    piso = createSprite(displayWidth / 2, displayHeight - 200, displayWidth, 5);
    piso.addImage(groundImage);
    //sprite invisible
    pisoinvisible = createSprite(displayWidth / 2, displayHeight - 190, displayWidth, 5);
    pisoinvisible.visible = false;
    grupodenubes = new Group();
    grupodecactus = new Group();
    // trex.debug = true;
    trex.setCollider("circle", 0, 0, 40);
    console.log(windowHeight);


}


function draw() {
    //establecer color de fondo.
    background("white");
    console.log(mensaje);

    text("Puntaje " + puntaje, 100, 20);
    if (estadodejuego == PLAY) {
        piso.velocityX = -(5 + puntaje / 100);
        puntaje += Math.round(getFrameRate() / 60);
        if (puntaje % 100 == 0 && puntaje > 0) {
            sonido3.play();
        }


        if ((touches.lengh > 0 || keyDown("space")) && trex.y > windowHeight - 100) //Solo va a saltar con valores mayores a 160
        {
            trex.velocityY = -10;
            sonidojump.play();
            touches = [];
        }

        trex.velocityY = trex.velocityY + 0.5;
        if (piso.x < 0) {
            piso.x = 300;
        }
        nubes();
        cactusenmovimiento();
        if (grupodecactus.isTouching(trex)) {
            estadodejuego = END;
            sonidodie.play();
        }

    } else if (estadodejuego == END) {
        piso.velocityX = 0;
        grupodenubes.setVelocityXEach(0);
        grupodenubes.setLifetimeEach(-1);
        grupodecactus.setVelocityXEach(0);
        grupodecactus.setLifetimeEach(-1);
        trex.changeAnimation("choque", trex3);
        trex.velocityY = 0;
        GameOver.visible = true;
        Restart.visible = true;
        if (mousePressedOver(Restart)) {
            Reinicio();

        }

    }


    trex.collide(pisoinvisible)
    drawSprites();
}

function nubes() {
    if (frameCount % 60 == 0) {
        nube = createSprite(550, 90, 50, 30);
        nube.velocityX = -5;
        nube.y = Math.round(random(30, 500));
        nube.addImage(nubeimage);
        nube.depth = trex.depth;
        trex.depth += 1;
        nube.lifetime = 120;
        grupodenubes.add(nube);
    }


}

function cactusenmovimiento() {
    if (frameCount % 90 == 0) {
        cactus = createSprite(displayWidth / 2, displayHeight - 210, displayWidth, 5);
        cactus.velocityX = -(3 + puntaje / 100);
        cactus.lifetime = 250;
        grupodecactus.add(cactus);
        cactus.scale = 0.45;
        var cambio = Math.round(random(1, 6));
        switch (cambio) {
            case 1:
                cactus.addImage(cactus1);
                break;

            case 2:
                cactus.addImage(cactus2);
                break;

            case 3:
                cactus.addImage(cactus3);
                break;

            case 4:
                cactus.addImage(cactus4);
                break;

            case 5:
                cactus.addImage(cactus5);
                break;

            case 6:
                cactus.addImage(cactus6);
                break;

            default:
                break;

        }

    }



}

function Reinicio() {
    estadodejuego = PLAY;
    grupodecactus.destroyEach();
    grupodenubes.destroyEach();
    GameOver.visible = false;
    Restart.visible = false;
    puntaje = 0;
    trex.changeAnimation("running", trex_running);
}