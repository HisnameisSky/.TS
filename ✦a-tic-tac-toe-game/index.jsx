const { useState } = React;

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (currentSquares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縦
      [0, 4, 8], [2, 4, 6]             // 斜め
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        currentSquares[a] &&
        currentSquares[a] === currentSquares[b] &&
        currentSquares[a] === currentSquares[c]
      ) {
        return currentSquares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);

  const handleClick = (index) => {
    if (winner || squares[index]) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };


  let status = "";
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Draw!"; // 引き分けメッセージ
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="game">
      {/* 勝者またはステータスメッセージ */}
      <div className="status">{status}</div>

      {/* 3x3 のグリッド配置 */}
      <div
        className="board-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "5px",
          margin: "10px 0"
        }}
      >
        {squares.map((value, index) => (
          <button
            key={index}
            className="square"
            onClick={() => handleClick(index)}
            style={{
              width: "100px",
              height: "100px",
              fontSize: "24px",
              fontWeight: "bold"
            }}
          >
            {value}
          </button>
        ))}
      </div>

      {/* リセットボタン */}
      <button id="reset" onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
}