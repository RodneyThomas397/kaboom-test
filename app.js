// Initializing context
kaboom({
    background: [255, 255, 255]
})

// Losing Scene
scene("lose", () => {
    add([
        text("GAME OVER!"),
        pos(center()),
        origin("center"),
    ])
})

// Loading Sprites
loadSprite("player", "./player1.png");

// Adding Sprites to screen - Defines Player as the player
const player = add ([
    sprite("player"),
    pos(80, 40),
    area(),
    body(),
    scale(0.5),
])

// Jump when "space" key is pressed
onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump();
    }
})

// Adding Floor
add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(0),
    area(),
    solid(),
    color(0, 0, 0),
])


// Adding Obstacles
function spawnObstacle() { add([
    rect(48, 64),
    area(),
    outline(0),
    pos(width(), height() - 48),
    origin("botleft"),
    color(0, 0, 0),
    move(LEFT, 240),
    "obstacle", // Adding tag
]);}

// Looping game
loop(1, () => {
    wait(rand(1, 1.5), () => {
        spawnObstacle();
    });
});

// Set score to 0
let score = 0;
const scoreLabel = add([
    text(score),
    pos(24, 24)
])

// Increase score on each frame
onUpdate(() => {
    score++;
    scoreLabel.text = score;
})

// Collision with PLAYER to OBSTACLE
player.onCollide("obstacle", () => {
    addKaboom(player.pos);
    shake();
    go("lose"); // Go to "lose" scene
})
