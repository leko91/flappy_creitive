console.log('Hello, World!');

var animate =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

var worldHeight = 400;
var worldWidth = 600;
var birdie;

var update = function () {
  birdie.move();
};

var step = function () {
  update();
  animate(step);
};

// var world = function () {
//   return this;
// };

// world.prototype.update = function () {
// };

var Player = function () {
};

Player.prototype.jump = function () {
  $(window).on('keypress', function (event) {
    var key = event.which || event.keyCode || 0;

    if (key === 32) {
      birdie.jump(48);
    }
  });
};

var Bird = function (x, y, width, height) {
  // Find the bird div.
  this.theBird = $('.theBird');

  // Set the bird properties.
  this.theBird.css('width', width);
  this.theBird.css('height', height);
  this.theBird.css('top', x);
  this.theBird.css('left', y);

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.fallSpeed = 2;
};

Bird.prototype.move = function () {
  this.y += this.fallSpeed;

  this.fall();
  this.hitTop();
  this.hitBottom();
};

Bird.prototype.fall = function () {
  this.theBird.css('top', this.y);
};

Bird.prototype.jump = function (jumpAmmount) {
  this.y -= jumpAmmount;

  if (this.y < this.height) {
    this.y = -2;
  }
};

Bird.prototype.hitTop = function () {
  if (this.y < 0) {
    this.y = 0;
  }
};

Bird.prototype.hitBottom = function () {
  if (this.y > worldHeight - this.height) {
    this.y = 0;
  }
};

var birdie = new Bird(10, 10, 30, 30);
var player = new Player();

player.jump();
animate(step);
