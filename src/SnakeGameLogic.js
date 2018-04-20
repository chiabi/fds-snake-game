import {ROWS, COLS} from './config';

function SnakeGameLogic() {
  // 각 마디의 좌표를 저장하는 배열
  this.joints = [
    {x: 2, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 0},
  ];

  // 먹이의 좌표
  this.fruit = {x: 2, y: 3};

  this.direction = 'right';
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
  // 한 번 움직여야 할 타이밍마다 실행되는 함수
  // 게임이 아직 끝나지 않았으면 `true`를 반환
  // 게임이 끝났으면 `false`를 반환
  console.log(`nextState`);

  // 새로 추가할 머리 생성
  let newHead;
  if (this.direction === 'right') {
    newHead = {
      x: this.joints[0].x + 1,
      y: this.joints[0].y,
    };
  } else if (this.direction === 'left') {
    newHead = {
      x: this.joints[0].x - 1,
      y: this.joints[0].y,
    };
  } else if (this.direction === 'up') {
    newHead = {
      x: this.joints[0].x,
      y: this.joints[0].y - 1,
    };
  } else if (this.direction === 'down') {
    newHead = {
      x: this.joints[0].x,
      y: this.joints[0].y + 1,
    };
  }

  // 새로 추가할 머리가 종료 조건을 만족하면 false 반환
  if (
    newHead.x < 0 ||
    newHead.x >= COLS ||
    newHead.y < 0 ||
    newHead.y >= ROWS ||
    this.joints.some(j => j.x === newHead.x && j.y === newHead.y)
  ) {
    return false;
  }

  // 먹이를 만났다면 새 먹이를 생성하고, 먹이를 만나지 않았다면 꼬리 떼기
  if (newHead.x === this.fruit.x && newHead.y === this.fruit.y) {
    const fruitCandidates = [];
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        if (
          (x === newHead.x && y === newHead.y) ||
          this.joints.some(j => j.x === x && j.y === y)
        ) {
          continue;
        } else {
          fruitCandidates.push({x, y});
        }
      }
    }
    const picked = fruitCandidates[Math.floor(Math.random() * fruitCandidates.length)];
    this.fruit = picked;
  } else {
    this.joints.pop();
  }

  // 새 머리 넣고 true 반환
  this.joints.unshift(newHead);
  return true;
}

export default SnakeGameLogic;