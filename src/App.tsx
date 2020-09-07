import React from 'react';
import { createBoard, eatApple, getBoardToView, nextMove, keys, isValidMove } from "./game"
import { Move, Board, KeyDown } from "./game";
import { Block, GameBoard, BoardMessage, Header, Container } from "./components/index"

type AppState = {
  board: Board,
  lastUpdate: number,
  time: number,
  points: number,
  gameOver: boolean,
  inGame: boolean,
}

class App extends React.Component<{}, AppState> {
  width: number;
  height: number;

  constructor(props: Object) {
    super(props);

    this.width = parseInt(`${(document.body.offsetWidth - 60) / 2 / 15}`);
    this.height = parseInt(`${(document.body.offsetHeight - 60) / 2 / 15}`);
    const board: Board = createBoard(this.height, this.width);

    this.state = {
      board,
      lastUpdate: Date.now(),
      time: 80,
      points: 0,
      gameOver: false,
      inGame: false
    };

    this.start = this.start.bind(this);
    this.loop = this.loop.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  update(move?: Move) {
    const { board, points } = this.state;

    try {
      const [apple, snake, eat] = eatApple(board.apple, board.snake);
      board.snake.body = nextMove(snake);
      board.snake.currentMove = move || board.snake.currentMove;
      board.apple = apple;
      const newPoints = eat ? points + 10 : points;

      this.setState({
        board,
        lastUpdate: Date.now(),
        points: newPoints,
        time: Math.max(50, 80 - (newPoints / 5))
      });
    } catch (e) {
      this.setState({ gameOver: true, lastUpdate: Date.now(), points: 0, time: 80 });
    }
  }

  loop() {
    const { lastUpdate, time, gameOver } = this.state;
    if (Date.now() - lastUpdate >= time) {
      this.update();
    }

    if (gameOver) return;

    window.requestAnimationFrame(this.loop);
  }

  handleKeyDown(e: KeyDown) {
    const { board } = this.state;
    const move = keys[e.keyCode];
    if (isValidMove(board.snake.currentMove, move)) {
      this.update(move)
    }
  }

  start() {
    const board: Board = createBoard(this.height, this.width);
    this.setState({ board, gameOver: false, inGame: true }, () => {
      this.loop();
    })
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown)
  }

  render() {
    const { board, points, time, gameOver, inGame } = this.state;
    return (
      <Container>
        <Header width={this.width}>
          <p>Pontos: <b>{points}</b></p>
          <p>Time: <b>{time}</b></p>
        </Header>

        <GameBoard>
          {!inGame && (
            <BoardMessage title={"SNAKE GAME"} btnText={"Start"} onClick={this.start} />
          )}

          {gameOver && (
            <BoardMessage title={"GAME OVER"} btnText={"New Game"} onClick={this.start} />
          )}

          {getBoardToView(board).map((row, id) => {
            return (
              <div key={`row-${id}`} style={{ display: "flex" }}>
                {row.map((e, colId) => <Block
                  key={`col-${id}-${colId}`}
                  snake={e < 0}
                  head={e < -1}
                  dash={id % 2 === 0 ? colId % 2 === 0 : colId % 2 !== 0}
                  apple={e === 1} />)}
              </div>
            )
          })}
        </GameBoard>
      </Container>
    )
  }
}

export default App;
