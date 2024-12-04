import { puzzleData } from "./puzzleData.ts";

function search2D(grid: string[][], row: number, col: number): boolean {
  let count = 0;

  // find the middle `A`
  if (grid[row][col] !== "A") {
    return false;
  }

  const directions = [
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: 1 },
  ];

  // Now walk all diagonal positions from that position (a) and the one on the opposite side (b):
  directions.map((direction) => {
    const aX = row + direction.x;
    const aY = col + direction.y;
    const bX = row - direction.x;
    const bY = col - direction.y;

    if (!grid[aX]) return;
    if (!grid[aX][aY]) return;
    if (!grid[bX]) return;
    if (!grid[bX][bY]) return;

    if (
      grid[aX][aY] === "M" &&
      grid[bX][bY] === "S"
    ) {
      count++;
    }
  });

  // There should be two M & S combinations on this spot
  return count === 2;
}

export function puzzle2(): number {
  const lines = puzzleData();
  let totalOccurances = 0;

  lines.forEach((line, row) =>
    line.forEach((_item, col) => {
      totalOccurances += search2D(lines, row, col) ? 1 : 0;
    })
  );

  return totalOccurances;
}
