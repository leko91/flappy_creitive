// console.log('Hello, Birdie!');

// var animate = function (callback, frameSpeed) {
//   window.setTimeout(callback, 1000 / frameSpeed);
// };

// var worldHeight = 400;
// var worldWidth = 600;
// var pipesArray = [];

// var update = function () {
//   birdie.move();
//   pipes.update();
// };

// var step = function () {
//   update();
//   animate(step, 60);
// };

// var Pipes = function (x, y, width, height, moveSpeed) {
//   // Find the world div.
//   this.theWorld = $('.theWorld');

//   // Find the initial pipe div.
//   this.thePipe = $('.thePipe');

//   // Set the initial pipe propeties.
//   this.thePipe.children().css('width', width);
//   this.thePipe.children().css('height', height);
//   this.thePipe.css('right', x);
//   this.thePipe.css('top', y);

//   this.x = x;
//   this.y = y;
//   this.width = width;
//   this.height = height;
//   this.moveSpeed = moveSpeed;
// };

// Pipes.prototype.update = function () {
//   this.x += this.moveSpeed;

//   pipes.move();
//   pipes.duplicate();
//   pipes.newPipe();
// };

// Pipes.prototype.move = function () {
//   this.thePipe.css('right', this.x);
// };

// Pipes.prototype.duplicate = function () {
//   if (this.x % 100 === 0) {
//     pipesArray.push(this.thePipe.clone());
//   }
// };

// Pipes.prototype.newPipe = function () {
//   for (var $i = 0; $i < pipesArray.length; $i++) {
//     this.theWorld.append(pipesArray[$i]);

//     if (this.x > worldWidth) {
//       console.log('asda');
//       pipesArray.shift();
//     }
//   }
// };

// $(window).on('keypress', function (event) {
//   var key = event.which || event.keyCode || 0;

//   if (key === 32) {
//     birdie.jump(48);
//   }
// });

// var Bird = function (x, y, width, height, fallSpeed) {
//   // Find the bird div.
//   this.theBird = $('.theBird');

//   // Set the bird properties.
//   this.theBird.css('width', width);
//   this.theBird.css('height', height);
//   this.theBird.css('top', x);
//   this.theBird.css('left', y);

//   this.x = x;
//   this.y = y;
//   this.width = width;
//   this.height = height;
//   this.fallSpeed = fallSpeed;
// };

// Bird.prototype.move = function () {
//   this.y += this.fallSpeed;

//   this.fall();
//   this.hitTop();
//   this.hitBottom();
// };

// Bird.prototype.fall = function () {
//   this.theBird.css('top', this.y);
// };

// Bird.prototype.jump = function (jumpAmmount) {
//   this.y -= jumpAmmount;

//   if (this.y < this.height) {
//     this.y = -2;
//   }
// };

// Bird.prototype.hitTop = function () {
//   if (this.y < 0) {
//     this.y = 0;
//   }
// };

// Bird.prototype.hitBottom = function () {
//   if (this.y > worldHeight - this.height) {
//     this.y = 0;
//   }
// };

// var birdie = new Bird(10, 10, 30, 30, 2);
// var pipes = new Pipes(0, 0, 30, 150, 2);

// //step();
