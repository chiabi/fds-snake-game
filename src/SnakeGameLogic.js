import {ROWS, COLS} from './config';

function SnakeGameLogic() {
  // 각 마디의 좌표를 저장하는 배열
  this.joints = [
    {x: 2, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 0},
  ];

  // 먹이의 좌표
  this.fruit = {x: 3, y: 5};
  this.direction = 'right';

  // Object.defineProperty(this, 'length', {
  //   'get': () => this.joints.length,
  // });
}

SnakeGameLogic.prototype.up = function() {
  // 위쪽 화살표 키를 누르면 실행되는 함수
  console.log('up');
  this.direction = 'up';
}

SnakeGameLogic.prototype.down = function() {
  // 아래쪽 화살표 키를 누르면 실행되는 함수
  console.log('down');
  this.direction = 'down';
}

SnakeGameLogic.prototype.left = function() {
  // 왼쪽 화살표 키를 누르면 실행되는 함수
  console.log('left');
  this.direction = 'left';
}

SnakeGameLogic.prototype.right = function() {
  // 오른쪽 화살표 키를 누르면 실행되는 함수
  console.log('right');
  this.direction = 'right';
}

SnakeGameLogic.prototype.nextState = function() {
  // console.log(`length: ${this.length}`);
  // 한 번 움직여야 할 타이밍마다 실행되는 함수
  // 게임이 아직 끝나지 않았으면 `true`를 반환
  // 게임이 끝났으면 `false`를 반환
  console.log(`nextState`);

  // 뱀 머리 좌표~
  let newJoint = {x: this.joints[0].x, y: this.joints[0].y}

  // 뱀 머리 방향에 따른 좌표 계산
  switch(this.direction) {
    case 'up' :
      newJoint.y--;
      break;
    case 'down':
      newJoint.y++;
      break;
    case 'left' : 
      newJoint.x--;
      break;
    default: 
      newJoint.x++;
  }
  
  if (this.joints.some(item => item.x === newJoint.x && item.y === newJoint.y)) {
    // 뱀이 자기 몸통에 부딪치면
    return false;
  } else if ((newJoint.x < 0 || newJoint.x > COLS - 1) || (newJoint.y < 0 || newJoint.y > ROWS - 1)) {
    // 뱀이 게임영역 벗어나면(벽에 부딪치면)
    return false;
  } else if ((newJoint.x === this.fruit.x && newJoint.y === this.fruit.y)) {
    // 뱀이 사과를 먹을때
    this.joints.unshift(newJoint);
    // ※ 뱀이 너무 길어져서 사과가 뱀 몸통에 생성되지 않게 하기
    let fruitJointX = this.fruit.x;
    let fruitJointY = this.fruit.y;
    do {
      fruitJointX = Math.floor(Math.random() * COLS);
      fruitJointY = Math.floor(Math.random() * ROWS);
    } while(this.joints.some(item => item.x === fruitJointX && item.y === fruitJointY));
    this.fruit = {x: fruitJointX, y: fruitJointY};
  }
  else {
    // 그냥 뱀 이동
    this.joints.unshift(newJoint);
    this.joints.pop();
  }
  return true; // nextState에서 false면 게임 오버임
}

export default SnakeGameLogic;
