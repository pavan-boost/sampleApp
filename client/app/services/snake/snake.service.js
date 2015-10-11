'use strict';
/* globals fabric:false */

angular.module('sampleAppApp')
  .service('snake', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var snake = [];

    this.createSnake = function() {
      snake.push(new fabric.Rect({
        left: 0,
        top: 0,
        width: 20,
        height: 20,
        fill: 'red',
        selectable: false,
        hasBorders: false,
        hasControls: false
      }));
      return snake;
    };

    this.addSnakePart = function() {
      var previousPart = snake[snake.length - 1];
      var tail = new fabric.Rect({
        left: previousPart.left,
        top: previousPart.top,
        width: 20,
        height: 20,
        fill: 'red',
        selectable: false,
        hasBorders: false,
        hasControls: false,
      });
      snake.push(tail);
      return tail;
    };

    this.clear = function() {
      snake = [];
    };

    var checkForCollisionWithWalls = function(canvas, snakeHead) {
    
      if(snakeHead.getLeft() < 0 || snakeHead.getLeft() > canvas.getWidth() || 
         snakeHead.getTop() < 0 || snakeHead.getTop() > canvas.getHeight()) {
        return true;
      }
      return false;
    };

    this.collided = function(canvas) {
      var snakeHead = snake[0], isCollided = false;
      if (checkForCollisionWithWalls(canvas, snakeHead)) {
        return true;
      }
      for(var i = 1, len = snake.length; i < len; i++) {
        if (snakeHead.getLeft() === snake[i].getLeft() && snakeHead.getTop() === snake[i].getTop()) {
          isCollided = true;
          break;
        }
      }
      return isCollided;
    };


    /** Creates prey and return the fabric object with
     *  arbitray left and top position
     */
    this.createPrey = function() {
      var left = new Date().getTime() % 800;
      left = left - left % 20;
      var top = new Date().getTime() % 400;
      top = top - top % 20;
      return new fabric.Rect({
        left: left,
        top: top,
        width: 20,
        height: 20,
        fill: 'red',
        stroke: 'green',
        opacity: 0.5,
        selectable: false,
        hasBorders: false,
        hasControls: false,
        strokeWidth: 2
      });
    };

      
  });
