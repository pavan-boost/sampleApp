'use strict';
/* globals fabric:false */

angular.module('sampleAppApp')
  .directive('snakeGame', function (snake, $document, SweetAlert) {

    var canvas;
    // var stopAnimation = false;
    var animating = false;
    var currentDirection;
    var snakeHead, snakeChain, prey;
    var endGame = false;

    var arrowKeyCodes = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };

    var opposite = {
      'left': 'right',
      'up': 'down',
      'right': 'left',
      'down': 'up'
    };


    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function (scope, element, attr) {
        element.text('this is the snakeGame directive');
        canvas = new fabric.Canvas(attr.id);

        var initCanvas = function() {
          canvas.clear();
          snake.clear();

          //create the snake chain - an array containing the snake parts - fabric rectangles.
          snakeChain = snake.createSnake();
          prey = snake.createPrey();
          canvas.add(snakeChain[0]);
          canvas.add(prey);
        };
        initCanvas();

        scope.start = function() {
          endGame = false;
          initCanvas();
          listenForKeyEvents();
        };

        var removeAll = function() {
          // SweetAlert.swal('Game Over', 'Play Agian', 'error');
          SweetAlert.swal({
            title: 'Game Over',
            text: 'Play again',
            timer: 1000,
            showConfirmButton: false
          });
          animating = false;
          scope.animating = false;
          canvas.clear();
          // $document.off('keydown');
        };

        var moveSnake = function(direction, bodyPart) {

          if (bodyPart >= snakeChain.length || endGame) {
            return;
          }
          direction = !bodyPart ? direction : snakeChain[bodyPart - 1].direction;

          var updateType = distanceUpdateType(direction);
          var propertyToAnimate= directionSetting(direction);
          var moveVal;

          if (propertyToAnimate === 'left') {
            moveVal = updateType === 'dec' ? '-=20' : '+=20';
          } else if ( propertyToAnimate === 'top') {
            moveVal = updateType === 'dec' ? '-=20': '+=20';
          }

          var snakePartNum = bodyPart || 0;
          var snakePart = snakeChain[snakePartNum];
          snakePart.animate(propertyToAnimate, moveVal, {
            duration: 200,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: function() {
              if(snake.collided(canvas)) {
                endGame= true;
                removeAll();
              }
              snakePart.direction = direction;
              moveSnake(snakePart.direction, snakePartNum + 1); // This is for moving the body.
              if (!endGame) {
                snapSnake(moveVal, snakePart);
                if (checkIfSnakeAtePrey()) {
                  removeAndAddNew();
                }
                wrapSnakeIfRequired(direction, snakePart);
                if (!bodyPart) { // if it is head
                  if (snakeChain.length > 1) {
                    if (opposite[direction] !== currentDirection) {
                      moveSnake(currentDirection);
                    } else {
                      moveSnake(direction);
                      console.log('you cannot move like that');
                    }
                  } else {
                    moveSnake(currentDirection); 
                  }
                }
              }
            },
            abort: function() {
              return endGame;
            }
          });

        };

        var listenForKeyEvents = function() {

          $document.bind('keydown', function(e) {
            var keyPressed = arrowKeyCodes[e.keyCode];
            if (!animating && keyPressed) {
              currentDirection = keyPressed;
              animating = true;
              scope.animating = true;
              scope.$apply();
              moveSnake(keyPressed);
            } else if (animating && keyPressed) {
              currentDirection = keyPressed;
            }
          });
        
        };

        // Create the Snake Object
        snakeHead = snakeChain[0];

        var directionSetting = function(dir) {
          var property;
          if (dir === 'left' || dir === 'right') {
            property = 'left';
          } else {
            property = 'top';
          }
          return property;
        };


        var distanceUpdateType = function(dir) {
          var distanceType;
          if (dir === 'left' || dir === 'up') {
            distanceType = 'dec';
          } else {
            distanceType = 'inc';
          }
          return distanceType;
        };

        var extremeLeftPos, extremeTopPos;
        var wrapSnakeIfRequired = function(dir, snakePart) {
          extremeLeftPos = [0, canvas.getWidth()];
          extremeTopPos = [0, canvas.getHeight()];

          if (dir === currentDirection || !dir) {
            var leftPos = snakePart.getLeft();
            var topPos = snakePart.getTop();
            if ((leftPos < 0 || leftPos > canvas.getWidth()) && (currentDirection === 'left' || currentDirection === 'right')) {
              if (leftPos < 0) {
                snakePart.setLeft(canvas.getWidth());
              } else {
                snakePart.setLeft(0 - snakePart.getWidth());
              }
            } else if ((topPos < 0 || topPos > canvas.getHeight()) && (currentDirection === 'up' || currentDirection === 'down')) {
              if (topPos < 0) {
                snakePart.setTop(canvas.getHeight());
              } else {
                snakePart.setTop(0 - snakePart.getHeight());
              }
            }
          }
        };

        /** After a snake eats its prey, increase the size of the
         *  snake and add a new prey/food in the canvas.
         */
        var removeAndAddNew = function() {
          canvas.remove(prey);
          prey = snake.createPrey();
          canvas.add(prey);
          var tail = snake.addSnakePart();
          canvas.add(tail);
          // snakeObj.setWidth(snakeObj.getWidth() + 20);
          canvas.renderAll();

        };

        var checkIfSnakeAtePrey = function() {
          var snakeHead = snakeChain[0];
          if (snakeHead.getLeft() === prey.getLeft() && snakeHead.getTop() === prey.getTop()) {
            return true;
          }
          return false;
        };

        /** To make sure that snake always move atleast a block whose width is a multiple of 20.
         */
        var snapSnake = function(mType, snakePart) {
          var left = snakePart.getLeft();
          var top = snakePart.getTop();
          if (left % 20 !== 0 || top % 20 !== 0) {
            if (mType.includes('-')) {
              left = Math.floor(left/20) * 20;
              top = Math.floor(top/20) * 20;
            } else {
              left = Math.ceil(left/20) * 20;
              top = Math.ceil(top/20) * 20;
            }
            snakePart.setLeft(left);
            snakePart.setTop(top);
          }
        };

      }
    };
  });
