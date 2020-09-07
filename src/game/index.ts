export type Move = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type SnakeBodyPart = [number, number];
export type BoardView = Array<Array<number>>
export type Apple = [number, number]
export type Snake = {
  currentMove: Move,
  limit: [number, number],
  body: Array<SnakeBodyPart>
}

export type Board = {
  apple: Apple,
  snake: Snake,
  size: [number, number],
}

export type KeyDown = {
  keyCode: number
}

const MOVES = {
  UP: "UP",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  DOWN: "DOWN",
}

export const keys: Record<number, Move> = {
  38: "UP",
  40: "DOWN",
  37: "LEFT",
  39: "RIGHT"
};

const getNextHead = (head: [number, number], move: Move, limit: [number, number]): [number, number] => {
  const [x, y] = head;
  if (x > limit[0] || y > limit[1] || x === -1 || y === -1)
    throw new Error("Game over");

  switch (move) {
    case MOVES.UP:
      return [x - 1, y]
    case MOVES.DOWN:
      return [x + 1, y]
    case MOVES.LEFT:
      return [x, y - 1]
    case MOVES.RIGHT:
      return [x, y + 1]
  }
  return head;
}

export const isValidMove = (currentMove: Move, newMove: Move): boolean => {
  if (currentMove === newMove) return false;

  switch (newMove) {
    case MOVES.UP:
      return currentMove !== MOVES.DOWN
    case MOVES.DOWN:
      return currentMove !== MOVES.UP
    case MOVES.LEFT:
      return currentMove !== MOVES.RIGHT
    case MOVES.RIGHT:
      return currentMove !== MOVES.LEFT
  }
  return false;
}

export const getRandomApple = ([width, height]: [number, number]): Apple => {
  return [Math.trunc(Math.random() * width), Math.trunc(Math.random() * height)]
}

export const eatApple = (apple: Apple, snake: Snake): [Apple, Snake, boolean] => {
  if (snake.body.find(e => e[0] === apple[0] && e[1] === apple[1])) {
    const head = getNextHead(snake.body[0], snake.currentMove, snake.limit);
    snake.body = [head].concat(snake.body);
    return [getRandomApple(snake.limit), snake, true]
  }
  return [apple, snake, false];
}

export const createBoard = (width: number, height: number): Board => {
  const half = Math.trunc(Math.min(width, height) / 2);
  return {
    snake: {
      currentMove: "RIGHT",
      limit: [width, height],
      body: [[half, half], [half, half - 1], [half, half - 2]],
    },
    apple: getRandomApple([width, height]),
    size: [width, height]
  }
}

export const nextMove = (snake: Snake): Array<SnakeBodyPart> => {
  const [head] = snake.body;
  const body = [getNextHead(head, snake.currentMove, snake.limit), ...snake.body];
  body.pop();
  return body;
}

export const getBoardToView = (board: Board): BoardView => {
  const snakeMap: Record<string, number> = board.snake.body.reduce((acc, v, i) => ({ ...acc, [v.join("-")]: i }), {});
  const view: BoardView = [];

  for (var i = 0; i < board.size[0]; i++) {
    view[i] = [];
    for (var j = 0; j < board.size[1]; j++) {
      const match = snakeMap[`${i}-${j}`];

      if (board.apple[0] === i && board.apple[1] === j) {
        view[i][j] = 1;
        continue;
      }

      if (match >= 0) {
        view[i][j] = match === 0 ? -2 : -1;
        continue;
      }

      view[i][j] = 0;
    }
  }

  return view;
}