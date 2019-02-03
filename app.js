// Declare globally used variables

var t_width = 100;
var t_height = 90;
var numOfColumns = 14;
var playerWidth = 55;
var playerHeight = 52;
var canvasHeight = 958;
var canvasWidth = 1300;

var maxY = (t_height * 10) + (t_height / 2);

var Player = function() {

    this.sprite = 'images/char-boy.png';

    // Place player in the middle of the seventh tile from left horizontally
    this.x = (t_width * 6) + (t_width / 2) - (playerWidth / 2);

    // Place player in the middle of the eleventh tile from top vertically
    this.y = (t_height * 10) + (t_height / 2) - (playerHeight / 2);

    // moveY and moveX for move direction, initially set to zero
    this.moveY = 0;
    this.moveX = 0;

    this.height = 30;
    this.width = playerWidth;
};

Player.prototype.update = function(dt) {

    // Calculate the next X position based on direction
    var nextX = this.x + (this.moveX * t_width);

    // Update position only if within canvas bounds
    if (nextX <= numOfColumns * t_width && nextX >= 0) {
        this.x = nextX;
    }

    // Calculate the next Y position based on direction
    var nextY = this.y + (this.moveY * t_height);

    // Update position only if within canvas bounds
    if (nextY <= maxY && nextY >= 0) {
        this.y = nextY;
    }

    // After updating position, reset direction to zero
    this.moveY = 0;
    this.moveX = 0;

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input) {

    switch (input) {
        case "left":
            this.moveY = 0;
            this.moveX = -1;
            break;
        case "up":
            this.moveY = -1;
            this.moveX = 0;
            break;
        case "right":
            this.moveY = 0;
            this.moveX = 1;
            break;
        case "down":
            this.moveY = 1;
            this.moveX = 0;
            break;
    }

};


var quiz= function(this.point){
  var q1;
  q1=prompt("enter the capital of india");
  if q1===("new delhi")
    this.points++;
};

// Collectibles for scoring more points

var Collectible = function(collectibleType) {


    this.x = (Math.floor((Math.random() * 8)) * t_width) + (t_width * 1.5);
    this.y = (Math.floor((Math.random() * 8)) * t_height) + (t_height * 1.5);


    quiz();
    this.point = (collectibleType + 1) * 50;
    this.sprite = collectibleSprite[collectibleType];
    this.width = 50;
    this.height = 55;
};

Collectible.prototype.update = function(dt) {

    // Change collectible position with 0.1% probability
    if (Math.random() < 0.001) {
        this.x = (Math.floor((Math.random() * 8)) * t_width) + (t_width * 1.5);
        this.y = (Math.floor((Math.random() * 8)) * t_height) + (t_height * 1.5);
    }
};

Collectible.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.

// Place the player object in a variable called player

var player = new Player();




// Number of collectibles, anywhere between 5 to 9
var collectiblesNumber = Math.max(Math.floor(Math.random() * 10), 5);
var entireCollectibles = [];
for (var i = 0; i < collectiblesNumber; i++) {

    // Generate collectible type randomly
    var collectibleType = Math.floor((Math.random() * 3));
    entireCollectibles.push(new Collectible(collectibleType));
}


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
